import { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

const useDate = (isDate?: Date) => {
  const { state, dispatch } = useContext(GlobalContext);

  const setDate = (date: Date) => {
    dispatch({ type: "setDate", date });
  };

  useEffect(() => {
    if (isDate !== undefined) setDate(isDate);
  }, [isDate]);

  return {
    date: state.date,
    setDate,
  };
};

export default useDate;
