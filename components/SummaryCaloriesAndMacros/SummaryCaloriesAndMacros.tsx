import { toPercent } from "../../helpers/toPercent";
import { ISummaryCalorieMacroData } from "../../interfaces/ISummaryCalorieMacroData";
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
}

export default function SummaryCaloriesAndMacros({
  summaryCalorieMacroData,
}: ISummaryCaloriesAndMacrosProps) {
  if (!summaryCalorieMacroData) return null;
  return (
    <Container>
      <Macro>
        <ValueSlider
          value={toPercent(
            summaryCalorieMacroData.kcal,
            summaryCalorieMacroData.limitKcal
          )}
        />
        <CurrentValue>
          <Name>Kcal</Name> {Number(summaryCalorieMacroData.kcal.toFixed(1))}
        </CurrentValue>
        <LimitValue>
          /{summaryCalorieMacroData.limitKcal} <Unit>kcal</Unit>
        </LimitValue>
      </Macro>
      <Macro>
        <ValueSlider
          value={toPercent(
            summaryCalorieMacroData.protein,
            summaryCalorieMacroData.limitProtein
          )}
        />
        <CurrentValue>
          <Name>Białko</Name>{" "}
          {Number(summaryCalorieMacroData.protein.toFixed(1))}
        </CurrentValue>
        <LimitValue>
          /{summaryCalorieMacroData.limitProtein} <Unit>g</Unit>
        </LimitValue>
      </Macro>
      <Macro>
        <ValueSlider
          value={toPercent(
            summaryCalorieMacroData.fat,
            summaryCalorieMacroData.limitFat
          )}
        />
        <CurrentValue>
          <Name>Tłuszcz</Name> {Number(summaryCalorieMacroData.fat.toFixed(1))}
        </CurrentValue>
        <LimitValue>
          /{summaryCalorieMacroData.limitFat} <Unit>g</Unit>
        </LimitValue>
      </Macro>
      <Macro>
        <ValueSlider
          value={toPercent(
            summaryCalorieMacroData.carbs,
            summaryCalorieMacroData.limitCarbs
          )}
        />
        <CurrentValue>
          <Name>Węgl.</Name> {Number(summaryCalorieMacroData.carbs.toFixed(1))}
        </CurrentValue>
        <LimitValue>
          /{summaryCalorieMacroData.limitCarbs} <Unit>g</Unit>
        </LimitValue>
      </Macro>
    </Container>
  );
}
