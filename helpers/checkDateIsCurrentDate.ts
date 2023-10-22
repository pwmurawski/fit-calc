export const checkDateIsCurrentDate = (date: Date) => {
    const currentDate = new Date();
    if (date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth()) return true;

    return false;
};
