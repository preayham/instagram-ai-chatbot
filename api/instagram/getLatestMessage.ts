import { DirectThreadFeed, IgApiClient } from "instagram-private-api";

interface GetLatestMessageProps {
  client: IgApiClient;
  thread: DirectThreadFeed;
  username: string;
}

const getLatestMessage = async ({
  client,
  thread,
  username,
}: GetLatestMessageProps) => {
  thread.cursor = null;

  const allMessages = await thread.items();
  const latestMessage = allMessages.find(
    (message) => message.item_type === "text" && message.text.length >= 2
  );

  let latestMessages = allMessages.filter(
    (message) =>
      message.item_type === "text" &&
      message.text.length >= 2 &&
      message.user_id == latestMessage.user_id
  );

  let latestTimestamp: number;
  let lastTimestamp: number;

  if (latestMessages.length > 1) {
    latestMessages = latestMessages.slice(0, 2);

    lastTimestamp =
      parseInt(latestMessages[latestMessages.length - 1].timestamp) / 1000;
    latestTimestamp = parseInt(latestMessages[0].timestamp) / 1000;
  }

  if ((latestTimestamp - lastTimestamp) / 1000 >= 300) {
    latestMessages = [latestMessages[0]];
  }

  const { username: fromuser } = await client.user.info(latestMessage.user_id);

  let combinedMessages = `From ${fromuser}: `;
  latestMessages.reverse().forEach((message) => {
    combinedMessages += message.text + ", ";
  });

  const userid = await client.user.getIdByUsername(username);

  if (latestMessage.user_id === userid) {
    return { combinedMessages: null, latestTimestamp: null };
  }

  return { combinedMessages, latestTimestamp };
};

export default getLatestMessage;
