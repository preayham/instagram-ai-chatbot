import { IgApiClient } from "instagram-private-api";

interface FilterThreadsProps {
  client: IgApiClient;
  threads: string[];
}

const filterThreads = async ({ client, threads }: FilterThreadsProps) => {
  const foundThreads = threads.map((thread) => {
    const threadFeed = client.feed.directThread({
      thread_id: thread,
      oldest_cursor: null,
    });

    return threadFeed;
  });

  return foundThreads;
};

export default filterThreads;
