export default (prop) => (typeof prop === 'object' && !Array.isArray(prop)) || prop === null;
