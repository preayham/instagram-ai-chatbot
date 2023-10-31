import { IgApiClientRealtime } from "instagram_mqtt";
import { getResponse } from "../openai";

import { loadData, saveData } from "../../util";
import sendMessage from "./sendMessage";

interface GetAndSendProps {
  client: IgApiClientRealtime;
  thread: string;
  allMessages: string[];
}

const getAndSend = async ({ client, thread, allMessages }: GetAndSendProps) => {
  let messagesCombined = "";
  allMessages.forEach((message) => {
    let last = false;
    if (allMessages.indexOf(message) == message.length - 1) last = true;

    messagesCombined += message + (!last ? ", " : "");
  });

  console.log(`\nGenerating response for compiled messages: \n${allMessages}`);

  const { messages } = loadData();

  messages.push({
    role: "user",
    content: messagesCombined,
  });

  const response = await getResponse({ messages: messages });

  messages.push({
    role: "assistant",
    content: response,
  });

  console.log(`\nSending response: \n${response}.`);

  saveData({ messages: messages, lastTimestamp: new Date().getTime() });

  await sendMessage({
    client: client,
    thread: thread,
    message: response,
  });

  return true;
};

export default getAndSend;
