import fitCalcApi from "./fitCalcApi";

const getLogout = async () => {
  const data = await fitCalcApi<null>("/logout", {
    credentials: "include",
  });

  return data;
};

export default getLogout;
