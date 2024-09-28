import express from "express";
import https from "https";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const port = 5173;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log("server starting on port : " + port);
});
