import request from "supertest";
import app from "./app";

describe("app", () => {
  it("responds with a not found message", (done) => {
    request(app)
      .get("/what-is-this-even")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done);
  });

  it("get route responds with view message", (done) => {
    request(app)
      .get("/")
      .set("Accept", "text/html")
      .expect("Render view here for documentation", done);
  });
});
