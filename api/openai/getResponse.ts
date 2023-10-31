import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

interface getResponseProps {
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[];
}

const getResponse = async ({ messages }: getResponseProps) => {
  const response = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  return response.choices[0].message.content;
};

export default getResponse;
