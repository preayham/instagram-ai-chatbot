import { DirectThreadFeed, IgApiClient } from "instagram-private-api";
import { getResponse } from "../openai";
import { loadData, saveData } from "../../util";

import sendMessage from "./sendMessage";
import getLatestMessage from "./getLatestMessage";

interface GetAndSendProps {
  client: IgApiClient;
  focusedThread: DirectThreadFeed;
  thread: string;
}

let lastTimestamp: number;
const getAndSend = async ({
  client,
  focusedThread,
  thread,
}: GetAndSendProps) => {
  process.stdout.write("Checking for messages, ");

  const { combinedMessages: latestMessage, latestTimestamp } =
    await getLatestMessage({
      client: client,
      thread: focusedThread,
      username: process.env.IG_USERNAME,
    });

  if (!latestMessage) {
    return false;
  }

  if (!lastTimestamp) {
    lastTimestamp = latestTimestamp;

    return false;
  }

  if (latestTimestamp == lastTimestamp) return;
  lastTimestamp = latestTimestamp;

  process.stdout.write(`read message: ${latestMessage}, `);

  const { messages } = loadData();

  messages.push({
    role: "user",
    content: latestMessage,
  });

  const response = await getResponse({ messages: messages });

  messages.push({
    role: "assistant",
    content: response,
  });

  process.stdout.write(`sending message: ${response}, `);

  saveData({ messages: messages, lastTimestamp: new Date().getTime() });

  await sendMessage({
    client: client,
    thread: thread,
    message: response,
  });

  return true;
};

export default getAndSend;
