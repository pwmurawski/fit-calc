import { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

const useMealId = (isMealId?: string) => {
  const { state, dispatch } = useContext(GlobalContext);

  const setMealId = (mealId: string) => {
    dispatch({ type: "setMealId", mealId });
  };

  useEffect(() => {
    if (isMealId !== undefined) setMealId(isMealId);
  }, [isMealId]);

  return {
    mealId: state.mealId,
    setMealId,
  };
};

export default useMealId;
