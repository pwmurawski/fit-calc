import { ValueSlider } from 'components/SummaryCaloriesAndMacros/styles/styles';
import gramsToKcal from 'helpers/gramsToKcal';
import { toPercent } from 'helpers/toPercent';
import { isNaN } from 'lodash';
import { FC, useMemo } from 'react';
import { SummaryResponse } from 'types/Summary';

interface SummaryDataViewProps {
    summary: SummaryResponse | undefined;
}

const getPercent = (obj: { kcal: number; protein: number; fat: number; carbs: number }) => {
    const kcal = obj.kcal;
    const protein = Math.round(toPercent(gramsToKcal(obj.protein, 'protein'), kcal));
    const fat = Math.round(toPercent(gramsToKcal(obj.fat, 'fat'), kcal));
    const carbs = Math.round(toPercent(gramsToKcal(obj.carbs, 'carbs'), kcal));

    return {
        protein: isNaN(protein) ? 0 : protein,
        fat: isNaN(fat) ? 0 : fat,
        carbs: isNaN(carbs) ? 0 : carbs,
    };
};

export const SummaryDataView: FC<SummaryDataViewProps> = ({ summary }) => {
    const summaryData = useMemo(() => {
        if (summary?.summaryData) {
            return getPercent(summary.summaryData);
        }
        return {
            protein: 0,
            fat: 0,
            carbs: 0,
        };
    }, [summary]);

    const dailyGoals = useMemo(() => {
        if (summary?.dailyGoals) {
            return getPercent(summary.dailyGoals);
        }
        return {
            protein: 0,
            fat: 0,
            carbs: 0,
        };
    }, [summary]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                <div>
                    <div>Białka</div>
                    <div>Tłuszcze</div>
                    <div>Węglowodany</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%', textAlign: 'end' }}>
                    <div>
                        <div>Suma</div>
                        <div>{summaryData.protein} %</div>
                        <div>{summaryData.fat} %</div>
                        <div>{summaryData.carbs} %</div>
                    </div>
                    <div>
                        <div>Cel</div>
                        <div>{dailyGoals.protein} %</div>
                        <div>{dailyGoals.fat} %</div>
                        <div>{dailyGoals.carbs} %</div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'whitesmoke',
                    padding: '20px',
                }}
            >
                <div>
                    <div>Kalorie</div>
                    <div>Białka</div>
                    <div>Tłuszcze</div>
                    <div>Węglowodany</div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '40%',
                        textAlign: 'left',
                    }}
                >
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>Suma</div>
                            <div>Cel</div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>{summary?.summaryData.kcal.toFixed(0)} kcal</div>
                                <div>{summary?.dailyGoals?.kcal.toFixed(0)} kcal</div>
                            </div>
                            <ValueSlider
                                value={toPercent(
                                    Number(summary?.summaryData.kcal ?? 0),
                                    Number(summary?.dailyGoals?.kcal ?? 0),
                                )}
                            />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>{summary?.summaryData.protein.toFixed(0)} g</div>
                                <div>{summary?.dailyGoals?.protein.toFixed(0)} g</div>
                            </div>
                            <ValueSlider
                                value={toPercent(
                                    Number(summary?.summaryData.protein ?? 0),
                                    Number(summary?.dailyGoals?.protein ?? 0),
                                )}
                            />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>{summary?.summaryData.fat.toFixed(0)} g</div>
                                <div>{summary?.dailyGoals?.fat.toFixed(0)} g</div>
                            </div>
                            <ValueSlider
                                value={toPercent(
                                    Number(summary?.summaryData.fat ?? 0),
                                    Number(summary?.dailyGoals?.fat ?? 0),
                                )}
                            />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>{summary?.summaryData.carbs.toFixed(0)} g</div>
                                <div>{summary?.dailyGoals?.carbs.toFixed(0)} g</div>
                            </div>
                            <ValueSlider
                                value={toPercent(
                                    Number(summary?.summaryData.carbs ?? 0),
                                    Number(summary?.dailyGoals?.carbs ?? 0),
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
