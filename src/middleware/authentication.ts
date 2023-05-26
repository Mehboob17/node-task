import { verify } from "jsonwebtoken";
import { root, accessToken } from "../app/config";
// import getMessages from "../app/messages";
// const { INVALID_RESOURCE } = getMessages("access token");
const { env } = root;
const { secretKey } = accessToken;

const whitelists = ["/users/register", "/users/login"];
const devEnvs = ["DEVELOPMENT", "development", "dev"];

export default function authentication(req, _res, next) {
  // pass if in development environment
  if (!devEnvs.includes(env)) {
    // pass if in url is whitelisted
    const { _parsedUrl } = req;
    const pathname: string =
      _parsedUrl.pathname.slice(-1) === "/"
        ? _parsedUrl.pathname.substring(0, _parsedUrl.pathname.length - 1)
        : _parsedUrl.pathname;
    if (!whitelists.includes(pathname)) {
      // const { headers } = req;
      // if (!headers.authorization) throw new Error("not found");
      let token = req.headers.authorization;
      if (!token) throw new Error("token not provided");
      token = token.split(" ").pop();

      // Now verifying and extracting token data
      verify(token, secretKey, (err, result) => {
        if (err) {
          throw new Error("Invalid token");
        } else {
          req.user = result;
        }
      });
    }
  }
  next();
}
