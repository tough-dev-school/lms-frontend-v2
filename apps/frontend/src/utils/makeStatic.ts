// This function is used to make static mocks for visual regression tests
import { merge } from 'lodash-es';

const makeStatic = <Type>(dynamic: Type, edits: Partial<Type>) => {
  return Object.freeze(merge({}, dynamic, edits));
};

export default makeStatic;
