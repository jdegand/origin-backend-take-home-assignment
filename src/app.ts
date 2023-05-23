import express, { Application } from "express";
import helmet from "helmet";
import * as middlewares from "./middlewares";
import api from "./api";
import cors from "cors";

const app: Application = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Render view here for documentation");
});

app.use(cors());

app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
