import { subDays, eachWeekOfInterval, addDays, eachDayOfInterval } from 'date-fns';

export const dates = eachWeekOfInterval(
    {
        start: subDays(new Date(), 30),
        end: addDays(new Date(), 30),
    },
    {
        weekStartsOn: 1,
    },
).reduce((acc: Date[][], cur) => {
    const allDays = eachDayOfInterval({
        start: cur,
        end: addDays(cur, 6),
    });

    acc.push(allDays);

    return acc;
}, []);
