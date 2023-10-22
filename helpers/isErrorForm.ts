import { ValuesType } from '../types/FormTypes';

const isErrorForm = (formVal: { [s: string]: ValuesType }) => {
    return Object.values(formVal).some(
        ({ error, rules, value }) => error || (rules.toString().includes('required') && value.length === 0),
    );
};

export default isErrorForm;
