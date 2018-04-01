export function checkArgsForNumber(...args): boolean {
    return args.every(value => isFinite(parseInt(value)));
}

export function checkInstance(constructor, ...args): boolean {
    const[values] = [...args];
    return Array.isArray(values) ? values.every(value => value instanceof constructor) :
    args.every(newInstance => newInstance instanceof constructor)
}

export function checkExistingIndex(squad, ...ind) {
    return ind.every(value => value >= 0 && value < squad.length);
}

export function getFightingInterval() {
    return Math.round(Math.random() *1000);
}

export function forTest () {
    return 2;
}