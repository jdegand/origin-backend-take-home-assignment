import { Applicant } from "../../interfaces/Applicant";
import { ReturnObject } from "../../interfaces/ReturnObject";

export function getBaseScore(array: boolean[]) {
  return array.filter(Boolean).length;
}

export function evaluateTotal(total: number) {
  if (total >= 3) {
    return "responsible";
  } else if (total > 0 && total <= 2) {
    return "regular";
  } else if (total <= 0) {
    return "economic";
  }
}

export function getScore(object: Applicant) {
  const BASE_SCORE = getBaseScore(object.risk_questions);

  const RETURN_OBJECT: ReturnObject = {
    auto: BASE_SCORE,
    disability: BASE_SCORE,
    home: BASE_SCORE,
    life: BASE_SCORE,
  };

  const YEAR = new Date().getFullYear() - 5;

  if (object.age < 30) {
    RETURN_OBJECT.auto -= 2;
    RETURN_OBJECT.disability -= 2;
    RETURN_OBJECT.home -= 2;
    RETURN_OBJECT.life -= 2;
  }
  if (object.age > 30 && object.age < 40) {
    RETURN_OBJECT.auto -= 1;
    RETURN_OBJECT.disability -= 1;
    RETURN_OBJECT.home -= 1;
    RETURN_OBJECT.life -= 1;
  }
  if (object.income > 200000) {
    RETURN_OBJECT.auto -= 1;
    RETURN_OBJECT.disability -= 1;
    RETURN_OBJECT.home -= 1;
    RETURN_OBJECT.life -= 1;
  }
  if (object.house?.ownership_status === "mortgaged") {
    RETURN_OBJECT.disability += 1;
    RETURN_OBJECT.home += 1;
  }
  if (object.dependents > 0) {
    RETURN_OBJECT.disability += 1;
    RETURN_OBJECT.life += 1;
  }
  if (object.marital_status === "married") {
    RETURN_OBJECT.life += 1;
    RETURN_OBJECT.disability -= 1;
  }
  if (object.vehicle && object.vehicle.year >= YEAR) {
    RETURN_OBJECT.auto += 1;
  }

  return {
    auto:
      object.vehicle === null
        ? "ineligible"
        : evaluateTotal(RETURN_OBJECT.auto),
    disability:
      object.income === 0
        ? "ineligible"
        : evaluateTotal(RETURN_OBJECT.disability),
    home:
      object.house === null ? "ineligible" : evaluateTotal(RETURN_OBJECT.home),
    life: evaluateTotal(RETURN_OBJECT.life),
  };
}
