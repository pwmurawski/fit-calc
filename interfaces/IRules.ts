type AvailableRulesFieldNamesString = "required" | "email";
type AvailableRulesFieldNamesObject = "min";

export type Rules =
  | (AvailableRulesFieldNamesString & AvailableRulesFieldNamesObject)[]
  | (
      | AvailableRulesFieldNamesString
      | {
          rule: AvailableRulesFieldNamesObject;
          length: number;
        }
    )[]
  | (
      | AvailableRulesFieldNamesString
      | {
          rule: AvailableRulesFieldNamesObject;
          length: number;
        }
    )[];

export interface IRule {
  rule: AvailableRulesFieldNamesObject;
  length: number;
}
