import OpenAI from "openai";
import * as fs from "fs";

interface SaveDataProps {
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
  lastTimestamp: number;
}

const saveData = ({ messages, lastTimestamp }: SaveDataProps) => {
  fs.writeFileSync(
    "./data.json",
    JSON.stringify({
      messages: messages,
      lastTimestamp: lastTimestamp,
    })
  );
};

export default saveData;
