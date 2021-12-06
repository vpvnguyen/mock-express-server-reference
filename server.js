const express = require("express");

const app = express();

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
    message: "Mock server up",
    "req.query": req.query,
  });
});

app.post("/post", (req, res) => {
  res.status(200).send({
    message: "post",
    "req.body": req.body,
  });
});

app.post("/param/:param", (req, res) => {
  res.status(200).send({
    message: "post",
    "req.body": req.body,
    "req.param": req.params,
  });
});

app.listen(9001, () => console.info("Mock server running on port 9001"));
