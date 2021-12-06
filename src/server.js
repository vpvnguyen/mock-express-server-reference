const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
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
    },
    `
  `
  );

  next();
});

app.use((req, res, next) => {
  if (req.body.mockData) {
    res.locals.mockData = req.body.mockData;
  }

  next();
});

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Mock server up",
  });
});

app.get("/query", (req, res) => {
  res.status(200).send({
    message: "get success",
    "req.query": req.query,
  });
});

app.post("/post", (req, res) => {
  res.status(200).send({
    message: "post success",
    "req.body": req.body,
  });
});

app.post("/params/:params", (req, res) => {
  res.status(200).send({
    message: "params success",
    "req.body": req.body,
    "req.param": req.params,
  });
});

app.listen(9001, () => console.info("Mock server running on port 9001"));
