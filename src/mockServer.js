const express = require("express");
const cors = require("cors");
const { standardResponses } = require("./mockServerResponses");

const mockServer = express();

mockServer.use(cors());
mockServer.use(express.json());

let seedData = standardResponses;

mockServer.post("/seed", (req, res) => {
  seedData = {
    ...standardResponses,
    ...req.body,
  };
  res.status(200).send({ ...seedData });
});

mockServer.post("/seed/reset", (req, res) => {
  seedData = standardResponses;
  res.status(200).send({ ...seedData });
});

const header = (req, res, next) => {
  if (seedData[req.path].headers) {
    // seedData[req.path].headers.forEach(({ key, value }) => {
    //   res.header(key, [...value]);
    // });
    res.append("Link", ["<http://localhost/>", "<http://localhost:3000/>"]);
    res.append("Set-Cookie", "foo=bar; Path=/; HttpOnly");
    res.append("Warning", "199 Miscellaneous warning");
  }
  next();
};
mockServer.all("*", header, (req, res) => {
  res
    .status(seedData[req.path].status || 200)
    .send({ ...seedData[req.path].data, _meta: { ...standardResponses } });
});

mockServer.listen(9001, () => console.info("Mock server running on port 9001"));
