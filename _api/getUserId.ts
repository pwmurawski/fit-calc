import fitCalcApi from "./fitCalcApi";

const getUserId = async () => {
  const data = await fitCalcApi<{ userId: string }>("/userId", {
    credentials: "include",
  });
  return data;
};

export default getUserId;
