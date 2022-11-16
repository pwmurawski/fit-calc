/* eslint-disable import/prefer-default-export */
/* eslint-disable default-param-last */
import { IRule, Rules } from "../interfaces/IRules";

function validateEmail(text: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(text);
}

const availableRules = {
  required(value: string) {
    return value ? "" : "Pole wymagane";
  },
  min(value: string, rule: IRule) {
    return value.length >= rule.length ? "" : `Min. znaków: ${rule.length}`;
  },
  email(value: string) {
    return validateEmail(value) ? "" : "Niepoprawny email";
  },
};

export function validate(rules: Rules = [], value: string) {
  let error = "";

  rules.forEach((rule) => {
    if (rule instanceof Object) {
      const errorMessage = availableRules[rule.rule](value, rule);
      if (errorMessage) {
        error = errorMessage;
      }
    } else {
      const errorMessage = availableRules[rule](value);
      if (errorMessage) {
        error = errorMessage;
      }
    }
  });

  return error;
}
