const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let mockData;

app.use((req, res, next) => {
  if (req.body.mockData) {
    res.locals.mockData = req.body.mockData;
    console.log({ "res.locals.mockData": res.locals.mockData });

    mockData = req.body.mockData;
    console.log({ mockData });
  }

  next();
});

app.use((req, res, next) => {
  console.log("req.url", req.url);
  console.log(
    `
  `,
    {
      req: {
        path: req.path,
        method: req.method,
        url: req.url,
        headers: {
          host: req.headers.host,
        },
        body: req.body,
        query: req.query,
        params: req.params,
      },
      res: {
        locals: {
          mockData: res.locals.mockData,
        },
      },
      mockData,
    },
    `
  `
  );

  next();
});

app.get("/", (req, res) => {
  let response = {
    message: "Mock server up",
  };

  res.status(200).send(response);
});

app.get("/query", (req, res) => {
  console.log("path", req.path);

  let response = {
    message: "query success",
    "req.query": req.query,
  };

  res.status(200).send(response);
});

app.post("/post", (req, res) => {
  console.log("path", req.path);
  console.log("locals", res.locals);

  let response = {
    message: "post success",
    "req.body": req.body,
  };

  res.status(200).send(response);
});

app.post("/params/:params", (req, res) => {
  console.log("path", req.path);

  let response = {
    message: "params success",
    "req.body": req.body,
    "req.param": req.params,
  };

  res.status(200).send(response);
});

console.log(app._router.stack);

app.listen(9001, () => console.info("Mock server running on port 9001"));

module.exports = {
  reset: () => {
    mockData = undefined;
  },
};
