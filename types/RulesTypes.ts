type AvailableRulesFieldNamesString = "required" | "email";
type AvailableRulesFieldNamesObject = "min";

export interface IRule {
  rule: AvailableRulesFieldNamesObject;
  length: number;
}

export type Rules = (AvailableRulesFieldNamesString | IRule)[];
