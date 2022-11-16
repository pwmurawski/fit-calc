/* eslint-disable import/prefer-default-export */
import {
  subDays,
  eachWeekOfInterval,
  addDays,
  eachDayOfInterval,
} from "date-fns";

export const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 14),
    end: addDays(new Date(), 14),
  },
  {
    weekStartsOn: 1,
  }
).reduce((acc: Date[][], cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6),
  });

  acc.push(allDays);

  return acc;
}, []);
