import app from "./app";

// || process.env.PORT
const port = 4000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
