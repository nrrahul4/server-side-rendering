import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { ServerStyleSheet } from "styled-components";
import fs from "fs";
import path from "path";
import App from "./src/App";

const app = express();

global.window = {};

app.use(express.static("./build", { index: false }));

const name = "Rahul";

app.get("/api/getUsername", (req, res) => {
  res.json(name);
});

app.get("/*", (req, res) => {
  const style = new ServerStyleSheet();
  const ssrApp = renderToString(
    style.collectStyles(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    )
  );

  const templateFile = path.resolve("./build/index.html");
  fs.readFile(templateFile, "utf8", (err, data) => {
    if (err) {
      return res.sendStatus(500).send(err);
    }
    return res.send(
      data
        .replace(
          '<div id="root"></div>',
          `<script>window.preloadedData = ${JSON.stringify(
            name
          )};</script><div id="root">${ssrApp}</div>`
        )
        .replace("{{styles}}", style.getStyleTags())
    );
  });
});

app.listen(8080, () => {
  console.log("app is listening 8000");
});
