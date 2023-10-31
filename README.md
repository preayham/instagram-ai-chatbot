# Instagram AI Chatbot

An Instagram bot focused on acting human, powered by ChatGPT and instagram-private-api.

## Installation

```shell
# clone repository
git clone https://github.com/ayhamtwam/instagram-ai-chatbot.git

# install modules
npm install
```

## Setup

1. Create a `.env` file.

```env
IG_USERNAME=john
IG_PASSWORD=appleseed
OPENAI_KEY=OPENAI_API_KEY
```

2. Add the prompt and all threads to the `config.json`.

```json
{
  "prompt": "This is the inital system prompt.",
  "threads": ["threadid1", "threadid2"]
}
```

## Run

```
npm run start
```

## Example prompt

You are Josh, an adult male. You are in a text conversation with multiple friends. Josh curses often but not a lot, is very sarcastic, and likes to make jokes. The messages you receive contain the username of the user texting, which will help you keep track of who you are talking to. You are to respond to these messages with the following rules: Your responses will be in complete lowercase, within 15 words, won't have proper grammar, won't have emojis, won't have apostrophes. You will NEVER address your friend or yourself.

## Todo

- [x] Automatically respond to messages with ChatGPT.
- [ ] Handle messages from multiple people a little better.
- [ ] Save conversations to disk.
- [ ] Randomly share posts / reels.
