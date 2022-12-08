/* eslint-disable import/prefer-default-export */
import { IRule, Rules } from "../types/RulesTypes";

function validateEmail(text: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(text);
}

const availableRules = {
  required(value: string) {
    return value ? undefined : "Pole wymagane";
  },
  min(value: string, rule: IRule) {
    return value.length >= rule.length
      ? undefined
      : `Min. znaków: ${rule.length}`;
  },
  email(value: string) {
    return validateEmail(value) ? undefined : "Niepoprawny email";
  },
};

export function validate(rules: Rules, value: string) {
  for (const rule of rules) {
    let errorMessage: string | undefined;
    if (rule instanceof Object) {
      errorMessage = availableRules[rule.rule](value, rule);
    } else {
      errorMessage = availableRules[rule](value);
    }
    if (errorMessage) {
      return errorMessage;
    }
  }
  return undefined;
}
