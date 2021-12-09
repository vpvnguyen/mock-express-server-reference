const isMock = true;
const HOME_URL = "/";
const QUERY_URL = "/query";
const PARAMS_URL = "/params/params";
const POST_URL = "/post";
const AUTH_URL = "/auth";

const standardResponses = {
  [HOME_URL]: {
    status: 200,
    data: {
      message: "HOME_URL STANDARD RESPONSE",
    },
  },
  [QUERY_URL]: {
    status: 200,
    data: {
      message: "QUERY_URL STANDARD RESPONSE",
    },
  },
  [PARAMS_URL]: {
    status: 200,
    data: {
      message: "PARAMS_URL STANDARD RESPONSE",
    },
  },
  [POST_URL]: {
    status: 200,
    data: {
      message: "POST_URL STANDARD RESPONSE",
    },
  },
  [AUTH_URL]: {
    status: 202,
    headers: [{ key: "Bearer Token", value: ["AUTH_TOKEN"] }],
    data: {
      message: "AUTH_URL STANDARD RESPONSE",
    },
  },
};

module.exports = { isMock, standardResponses };
