import express, { Express, Response, Request } from "express";
import { Client } from "@elastic/elasticsearch";
import bodyParser from "body-parser";
import { ElkData } from "./interface";
import dotenv from "dotenv";

dotenv.config();

// Create an Express app and configure it to parse JSON requests
const app: Express = express();
app.use(bodyParser.json());

// Create an Elasticsearch client with elastic cloud credentials
const client = new Client({
  cloud: {
    id:"",
  },
  auth: {
    apiKey: "",
  },
});

// Define a route to handle POST requests to /webhook

app.post("/webhook", async (req: Request, res: Response) => {
  const elkData: ElkData = req.body;
  console.log("Received data:", elkData);

  try {
    await client.index({
      index: "test-myindex",
      body: elkData,
    });
    res.send("Data indexed in Elasticsearch");
  } catch (error) {
    console.error("Error indexing data:", error);
    res.status(500).send("Error indexing data in Elasticsearch");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
