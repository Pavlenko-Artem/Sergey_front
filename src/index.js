import React, { createContext } from "react";
// import ReactDOM from "react-dom";
import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

import { createRoot } from "react-dom/client";

export const Context = createContext(null);
console.log("localhost", process.env.REACT_APP_API_URL);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
    }}
  >
    {" "}
    <App />{" "}
  </Context.Provider>
);
// ReactDOM.render(
//   <Context.Provider
//     value={{
//       user: new UserStore(),
//       device: new DeviceStore(),
//     }}
//   >
//     {" "}
//     <App />{" "}
//   </Context.Provider>,
//   document.getElementById("root")
// );
