import OpenAI from "openai";
import * as fs from "fs";
import saveData from "./saveData";

import config from "../config.json";

const loadData = (): {
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  lastTimestamp: number;
} => {
  const data = fs.readFileSync("./data.json", "utf-8");
  const parsedData = JSON.parse(data);

  if (!parsedData.messages[0]) {
    saveData({
      messages: [{ role: "system", content: config.prompt }],
      lastTimestamp: null,
    });

    return {
      messages: [{ role: "system", content: config.prompt }],
      lastTimestamp: null,
    };
  }

  return parsedData;
};

export default loadData;
