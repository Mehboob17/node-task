import { config } from "dotenv";
let {
  PORT,
  DATABASE: database,
  CORSURLS,
  USER_ACCESS_TOKEN_EXPIRY,
  JWT_SECRET: secretKey,
  SYSTEM_USER_ACCESS_TOKEN_EXPIRY,
  ENVIRONMENT: env,
} = config().parsed;

const port = +PORT;
const allowedClients = CORSURLS?.split(",") ?? [];
const systemUserAccessTokenExpiry = +SYSTEM_USER_ACCESS_TOKEN_EXPIRY;
const userAccessTokenExpiry = +USER_ACCESS_TOKEN_EXPIRY;

export const server = { port, database, allowedClients };
export const accessToken = {
  secretKey,
  systemUserAccessTokenExpiry,
  userAccessTokenExpiry,
};
export const root = { env };