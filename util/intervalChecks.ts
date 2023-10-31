import loadData from "./loadData";
import saveData from "./saveData";

interface IntervalChecksProps {
  prompt: string;
}

const intervalChecks = ({ prompt }: IntervalChecksProps) => {
  let { messages, lastTimestamp } = loadData();
  const currentTime = new Date().getTime();

  setInterval(() => {
    if (messages.length == 1) return;
    if (!lastTimestamp) return;

    if ((currentTime - lastTimestamp) / 1000 / 60 < 5) return;

    console.log("Clearing all messages.");

    messages = [{ role: "system", content: prompt }];

    saveData({ messages, lastTimestamp });
  }, 300_000);
};

export default intervalChecks;
