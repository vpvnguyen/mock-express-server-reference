const express = require("express");
const cors = require("cors");
const { standardResponses } = require("./mockServerResponses");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/query", (req, res) => {
  res
    .status(standardResponses[req.path].status || 200)
    .send(standardResponses[req.path].data || {});
});

app.post("/post", (req, res) => {
  res
    .status(standardResponses[req.path].status || 200)
    .send(standardResponses[req.path].data || {});
});

app.post("/params/:params", (req, res) => {
  res
    .status(standardResponses[req.path].status || 200)
    .send(standardResponses[req.path].data || {});
});

app.get("/", (req, res) => {
  res
    .status(standardResponses[req.path].status || 200)
    .send(standardResponses[req.path].data || {});
});

app.listen(8080, () => console.info("Server running on port 8080"));
