import request from "supertest";

import app from "../../app";

describe("POST /api/score", () => {
  it("responds with an error if data is missing / wrong type", async () =>
    request(app)
      .post("/api/score")
      .set("Accept", "application/json")
      .send({
        age: 17,
        dependents: 2,
        house: null,
        income: 0,
        marital_status: "single",
        risk_questions: [false, true, false],
        vehicle: { year: 2018 },
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toStrictEqual({
          issues: [
            {
              code: "too_small",
              exact: false,
              inclusive: true,
              message: "Number must be greater than or equal to 18",
              minimum: 18,
              path: ["body", "age"],
              type: "number",
            },
          ],
          name: "ZodError",
        });
      }));

  it("RiskProfile object example from readme", async () =>
    request(app)
      .post("/api/score")
      .set("Accept", "application/json")
      .send({
        age: 35,
        dependents: 2,
        house: { ownership_status: "owned" },
        income: 0,
        marital_status: "married",
        risk_questions: [false, true, false],
        vehicle: { year: 2018 },
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("auto");
        expect(response.body).toHaveProperty("disability");
        expect(response.body).toHaveProperty("home");
        expect(response.body).toHaveProperty("life");
        expect(response.body).toStrictEqual({
          auto: "regular",
          disability: "ineligible",
          home: "economic",
          life: "regular",
        });
      }));

  it("RiskProfile with 200k income", async () =>
    request(app)
      .post("/api/score")
      .set("Accept", "application/json")
      .send({
        age: 35,
        dependents: 2,
        house: { ownership_status: "owned" },
        income: 200000,
        marital_status: "married",
        risk_questions: [true, true, true],
        vehicle: { year: 2018 },
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("auto");
        expect(response.body).toHaveProperty("disability");
        expect(response.body).toHaveProperty("home");
        expect(response.body).toHaveProperty("life");
        expect(response.body).toStrictEqual({
          auto: "responsible",
          disability: "regular",
          home: "regular",
          life: "responsible",
        });
      }));

  it("RiskProfile object age < 30", async () =>
    request(app)
      .post("/api/score")
      .set("Accept", "application/json")
      .send({
        age: 25,
        dependents: 2,
        house: { ownership_status: "owned" },
        income: 200000,
        marital_status: "married",
        risk_questions: [true, true, true],
        vehicle: { year: 2018 },
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("auto");
        expect(response.body).toHaveProperty("disability");
        expect(response.body).toHaveProperty("home");
        expect(response.body).toHaveProperty("life");
        expect(response.body).toStrictEqual({
          auto: "regular",
          disability: "regular",
          home: "regular",
          life: "responsible",
        });
      }));

  it("RiskProfile object house mortgaged", async () =>
    request(app)
      .post("/api/score")
      .set("Accept", "application/json")
      .send({
        age: 45,
        dependents: 2,
        house: { ownership_status: "mortgaged" },
        income: 300000,
        marital_status: "married",
        risk_questions: [true, true, true],
        vehicle: { year: 2018 },
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("auto");
        expect(response.body).toHaveProperty("disability");
        expect(response.body).toHaveProperty("home");
        expect(response.body).toHaveProperty("life");
        expect(response.body).toStrictEqual({
          auto: "responsible",
          disability: "responsible",
          home: "responsible",
          life: "responsible",
        });
      }));

  it("RiskProfile object - null vehicle and house", async () =>
    request(app)
      .post("/api/score")
      .set("Accept", "application/json")
      .send({
        age: 45,
        dependents: 2,
        house: null,
        income: 50000,
        marital_status: "single",
        risk_questions: [true, true, true],
        vehicle: null,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("auto");
        expect(response.body).toHaveProperty("disability");
        expect(response.body).toHaveProperty("home");
        expect(response.body).toHaveProperty("life");
        expect(response.body).toStrictEqual({
          auto: "ineligible",
          disability: "responsible",
          home: "ineligible",
          life: "responsible",
        });
      }));
});
