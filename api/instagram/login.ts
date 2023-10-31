import { IgApiClient } from "instagram-private-api";

interface LoginProps {
  client: IgApiClient;
}

const data = {
  username: process.env.IG_USERNAME,
  password: process.env.IG_PASSWORD,
};

const login = async ({ client }: LoginProps) => {
  console.log("Logging into user:", data.username);
  client.state.generateDevice(data.username);

  await client.account.login(data.username, data.password);
};

export default login;
