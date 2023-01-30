import express, { Application } from "express";
import helmet from "helmet";
import * as middlewares from "./middlewares";
import api from "./api";

const app: Application = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Render view here for documentation");
});

app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
