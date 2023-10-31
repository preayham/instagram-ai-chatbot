import "dotenv/config";
import * as fs from "fs";

import { login, filterThreads, getAndSend } from "./api/instagram";

import config from "./config.json";

import { clientHandle, intervalChecks, getSeconds, sleep } from "./util";

const client = clientHandle(() => login({ client }));

const main = async () => {
  intervalChecks({ prompt: config.prompt });

  const isLogin = fs.readFileSync("./login.json", "utf-8");

  if (!isLogin) {
    await login({ client }).catch(() => {});
  }

  if (isLogin) {
    await client.state.deserialize(JSON.parse(isLogin));
  }

  const foundThreads = await filterThreads({
    client: client,
    threads: config.threads,
  });

  for (const thread of config.threads) {
    let index = 0;

    do {
      const sent = await getAndSend({
        client,
        focusedThread: foundThreads[config.threads.indexOf(thread)],
        thread,
      }).catch(() => {});

      if (sent) index = 0;
      if (!sent) ++index;

      const seconds = getSeconds({ index });

      console.log(`waiting ${seconds} seconds...`);
      await sleep({ seconds: seconds });
    } while (true);
  }
};

main();
