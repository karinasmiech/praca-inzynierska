const isFiniteNumber = number => typeof number === 'number' && isFinite(number);
const isObject = obj => obj !== null && typeof obj === 'object';

export default {
    isFiniteNumber,
    isObject
};
