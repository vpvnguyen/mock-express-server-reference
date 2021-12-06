import React from "react";
import axios from "axios";

function App() {
  const [state, setState] = React.useState("");
  const [getResponse, setGetResponse] = React.useState("");
  const [postResponse, setPostResponse] = React.useState("");
  const [paramsResponse, setParamsResponse] = React.useState("");
  const [queryResponse, setQueryResponse] = React.useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h1>App</h1>
      <div>
        <h1>Get</h1>
        <button
          id="submit-get"
          onClick={async () => {
            try {
              const { data } = await axios.get("http://localhost:9001");

              setGetResponse(data.message);
            } catch (error) {
              setGetResponse("error");
            }
          }}
        >
          Submit Post
        </button>
        <p id="get-response">{getResponse}</p>
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
          id="submit-post"
          onClick={async () => {
            try {
              const { data } = await axios.post("http://localhost:9001/post", {
                state,
              });

              setPostResponse(data.message);
            } catch (error) {
              setPostResponse("error");
            }
          }}
        >
          Submit Post
        </button>
        <p className="post-response">{postResponse}</p>
      </div>

      <div>
        <h1>Params</h1>
        <button
          onClick={async () => {
            try {
              const { data } = await axios.post(
                "http://localhost:9001/params/params",
                {
                  state,
                }
              );

              setParamsResponse(data.message);
            } catch (error) {
              setParamsResponse("error");
            }
          }}
        >
          Submit Params
        </button>
        <p>{paramsResponse}</p>
      </div>

      <div>
        <h1>Query</h1>
        <button
          onClick={async () => {
            try {
              const { data } = await axios.get(
                "http://localhost:9001/query?query=query",
                {
                  state,
                }
              );

              setQueryResponse(data.message);
            } catch (error) {
              setQueryResponse("error");
            }
          }}
        >
          Submit Query
        </button>
        <p>{queryResponse}</p>
      </div>
    </div>
  );
}

export default App;
