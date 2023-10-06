import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

async function requestData(url, method, params = null) {
  let apiUrl = process.env.REACT_APP_BASE_URL + "/api/v1/" + url;
  let token = "";
  console.log("url-->"+apiUrl)
  let user = JSON.parse(sessionStorage.getItem("adminData"));
  if (user != null && Object.keys(user).length > 0) {
    token = user.token;
    console.log(JSON.stringify(user));
    console.log("token-->"+token);
  } else {
  }
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Access-Control-Allow-Origin",
    process.env.REACT_APP_BASE_URL
  );
  myHeaders.append("Authorization", token);
  myHeaders.append("usertype", "Admin");

  var options = {
    method: method,
    headers: myHeaders,
    redirect: "follow",
  };
  console.log(options);
  if (method === "DELETE") {
    // options['body'] = none;
  } else if (method !== "GET") {
    options["body"] = JSON.stringify(params);
  }
  return await fetch(apiUrl, options)
    .then((res) => res.json())
    .then(
      (result) => {
        // console.log("result", result);
        return result;
      },
      (error) => {}
    );
}

async function requestFile(url, method, params = null) {
  let apiUrl = process.env.REACT_APP_BASE_URL + "/api/v1/" + url;
  
  var myHeaders = new Headers();
  myHeaders.append(
    "Access-Control-Allow-Origin",
    process.env.REACT_APP_BASE_URL
  );
  myHeaders.append(
    "Authorization",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlYmFzaXNAdGhvdWdodG1lZGlhLmNvbSIsInBhc3N3b3JkIjoiMTIzNDUiLCJmaXJzdG5hbWUiOiJndWVzdCIsImxhc3RuYW1lIjoiVXNlciIsImdlbmRlciI6Ik1hbGUiLCJkb2IiOiIwMS4wNi4xOTk3IiwiemlwY29kZSI6NzEyNTAyLCJldGhuY2l0eSI6IkFmcmljYW4gQW1lcmljYW4iLCJzdGF0ZSI6MTQ1NiwiY2l0eSI6MTExMTQ2LCJjb3VudHJ5IjoiVVNBIiwicGhvbmUiOjU2NDY0NjU0NTYsImlhdCI6MTY3MzA5MDI5MH0.fbAwzPj8v6P1XCheaBU-JlPPeGRbWhXVaCbOYEOh9is"
  );

  var requestOptions = {
    method: method,
    headers: myHeaders,
    body: params,
    redirect: "follow",
  };

  return await fetch(apiUrl, requestOptions)
    .then((res) => res.json())
    .then(
      (result) => {
        // console.log("result", result);
        return result;
      },
      (error) => {}
    );
}

export default {
  requestData,
  requestFile,
};
