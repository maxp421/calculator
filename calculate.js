"use strict";
import { validateParentheses, validateExpression } from "./validateInput.js";

export function calculate(str) {
  const expressionValid = validateExpression(str);
  if (expressionValid !== true) return "Invalid input: " + expressionValid;
  const parenthesesValid = validateParentheses(str);
  if (parenthesesValid !== true) return "Invalid input: " + parenthesesValid;

  while (str.match(/\(/)) {
    const innermostParentheses = getInnermostParentheses(str);
    const result = evaluateTokens(tokenizeString(innermostParentheses));
    const splitStr = str.split("(" + innermostParentheses + ")");
    str = splitStr[0] + result + splitStr[1];
  }
  str = evaluateTokens(tokenizeString(str));
  return str;
}

function tokenizeString(str) {
  const tokens = str.match(/(-?\d+\.?\d*|[-+*/^√%])/g);
  return tokens;
}

function getInnermostParentheses(str) {
  const innermostParentheses = str.match(/(?<=\()[^)(]+(?=\))/);
  return innermostParentheses[0]; // string
}

function evaluateTokens(tokens) {
  //operators get evaluated in the array order, operators[0] gets evaluated first
  const operators = ["^", "√", "/", "*", "%", "+", "-"];

  function getResult([token1, operator, token2]) {
    token1 = +token1;
    token2 = +token2;
    if (operator === "^") return Math.pow(token1, token2);
    if (operator === "√") return Math.pow(token2, 1 / token1); //imprecise, replace with
    //custom function like https://cwestblog.com/2011/05/06/cube-root-an-beyond/
    if (operator === "*") return token1 * token2;
    if (operator === "/") {
      if (token2 === 0) return "can't divide by 0.";
      return token1 / token2;
    }
    if (operator === "%") return token1 % token2;
    if (operator === "+") return token1 + token2;
    if (operator === "-") return token1 - token2;
  }

  let onlyNumbersLeft = false;
  while (tokens.length !== 1) {
    for (let i = 0; i <= operators.length - 1; i++) {
      if (onlyNumbersLeft === true) break;

      const operatorIdx = tokens.indexOf(operators[i]);

      if (operatorIdx === -1) {
        if (operators[i] === "-") onlyNumbersLeft = true;
        operators.shift();
        i--;
        continue;
      }

      //only time we end up with a negative operator token is if the
      //minus comes before a parenthesis, otherwise minuses get turned into tokens.
      //this means it's sole purpose will be to negate the number infront of it
      //instead of subtracting two numbers
      if (operators[i] === "-") {
        const negatedNumber = -tokens[operatorIdx + 1];
        tokens.splice(operatorIdx, operatorIdx + 2, negatedNumber);
        continue;
      }

      const operationTokens = tokens.slice(operatorIdx - 1, operatorIdx + 2);

      const result = getResult(operationTokens);
      if (typeof result === "string") return "Invalid input: can't divide by 0";

      tokens.splice(operatorIdx - 1, operatorIdx + 2, result);
      break;
    }

    if (onlyNumbersLeft === true) {
      tokens.splice(0, 2, getResult([tokens[0], "+", tokens[1]]));
    }
  }
  return tokens.toString();
}
