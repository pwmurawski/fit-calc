/* eslint-disable import/prefer-default-export */
export const checkDayCurrentDate = (day: number, mounth: number) => {
  const currentDate = new Date();
  if (day === currentDate.getDate() && mounth === currentDate.getMonth())
    return true;

  return false;
};
