import React from "react";
import axios from "axios";
import { isMock } from "./mockServerResponses";

const SERVER_URL = "http://localhost:8080";
const MOCK_SERVER_URL = "http://localhost:9001";

const API_URL = isMock ? MOCK_SERVER_URL : SERVER_URL;

function App() {
  const [state, setState] = React.useState("");
  const [getResponse, setGetResponse] = React.useState("");
  const [postResponse, setPostResponse] = React.useState("");
  const [paramsResponse, setParamsResponse] = React.useState("");
  const [queryResponse, setQueryResponse] = React.useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <h1>App</h1>
      <div>
        <h1>Get</h1>
        <button
          id="getButton"
          onClick={async () => {
            try {
              const { data } = await axios.get(`${API_URL}`);

              setGetResponse(data.message);
            } catch (error) {
              setGetResponse("error");
            }
          }}
        >
          Submit Get API_URL
        </button>
        <p id="getResponse">{getResponse}</p>
      </div>

      <div>
        <h1>Post</h1>
        <input
          id="state"
          type="text"
          placeholder="state"
          value={state}
          onChange={(event) => {
            setState(event.target.value);
          }}
        />

        <button
          id="postButton"
          onClick={async () => {
            try {
              const { data } = await axios.post(`${API_URL}/post`, {
                state,
              });

              setPostResponse(data.message);
            } catch (error) {
              setPostResponse("error");
            }
          }}
        >
          Submit Post API_URL/post
        </button>
        <p id="postResponse">{postResponse}</p>
      </div>

      <div>
        <h1>Params</h1>
        <button
          id="paramsButton"
          onClick={async () => {
            try {
              const { data } = await axios.post(`${API_URL}/params/params`, {
                state,
              });

              setParamsResponse(data.message);
            } catch (error) {
              setParamsResponse("error");
            }
          }}
        >
          Submit Params API_URL/params/:params
        </button>
        <p id="paramsResponse">{paramsResponse}</p>
      </div>

      <div>
        <h1>Query</h1>
        <button
          id="queryButton"
          onClick={async () => {
            try {
              const { data } = await axios.get(`${API_URL}/query`, {
                state,
              });

              setQueryResponse(data.message);
            } catch (error) {
              setQueryResponse("error");
            }
          }}
        >
          Submit Query API_URL/query
        </button>
        <p id="queryResponse">{queryResponse}</p>
      </div>
    </div>
  );
}

export default App;
