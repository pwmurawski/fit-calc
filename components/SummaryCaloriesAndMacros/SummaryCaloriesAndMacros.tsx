import { toPercent } from "../../helpers/toPercent";
import { DailyGoalsType } from "../../types/DailyGoalsTypes";
import { ISummaryCalorieMacroData } from "../../types/ISummaryCalorieMacroData";
import {
  Container,
  Macro,
  CurrentValue,
  LimitValue,
  Unit,
  ValueSlider,
  Name,
} from "./styles/styles";

interface ISummaryCaloriesAndMacrosProps {
  summaryCalorieMacroData: ISummaryCalorieMacroData | undefined;
  limitMacro: DailyGoalsType | undefined;
}

export default function SummaryCaloriesAndMacros({
  summaryCalorieMacroData,
  limitMacro,
}: ISummaryCaloriesAndMacrosProps) {
  if (!summaryCalorieMacroData || !limitMacro) return null;
  return (
    <Container href="dailyGoals">
      <Macro>
        <ValueSlider
          value={toPercent(summaryCalorieMacroData.kcal, limitMacro.kcal)}
        />
        <CurrentValue>
          <Name>Kcal</Name> {Number(summaryCalorieMacroData.kcal.toFixed(1))}
        </CurrentValue>
        <LimitValue>
          /{limitMacro.kcal} <Unit>kcal</Unit>
        </LimitValue>
      </Macro>
      <Macro>
        <ValueSlider
          value={toPercent(summaryCalorieMacroData.protein, limitMacro.protein)}
        />
        <CurrentValue>
          <Name>Białko</Name>{" "}
          {Number(summaryCalorieMacroData.protein.toFixed(1))}
        </CurrentValue>
        <LimitValue>
          /{limitMacro.protein} <Unit>g</Unit>
        </LimitValue>
      </Macro>
      <Macro>
        <ValueSlider
          value={toPercent(summaryCalorieMacroData.fat, limitMacro.fat)}
        />
        <CurrentValue>
          <Name>Tłuszcz</Name> {Number(summaryCalorieMacroData.fat.toFixed(1))}
        </CurrentValue>
        <LimitValue>
          /{limitMacro.fat} <Unit>g</Unit>
        </LimitValue>
      </Macro>
      <Macro>
        <ValueSlider
          value={toPercent(summaryCalorieMacroData.carbs, limitMacro.carbs)}
        />
        <CurrentValue>
          <Name>Węgl.</Name> {Number(summaryCalorieMacroData.carbs.toFixed(1))}
        </CurrentValue>
        <LimitValue>
          /{limitMacro.carbs} <Unit>g</Unit>
        </LimitValue>
      </Macro>
    </Container>
  );
}
