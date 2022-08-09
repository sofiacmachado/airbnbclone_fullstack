import React from "react";
import ReactDOM from "react-dom";
import Success from "./success";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById("params");
  const data = JSON.parse(node.getAttribute("data-params"));

  ReactDOM.render(
    <Success booking_id={data.booking_id} />,
    document.body.appendChild(document.createElement("div"))
  );
});