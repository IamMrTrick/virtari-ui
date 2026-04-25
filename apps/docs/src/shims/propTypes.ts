type Validator = ((...args: unknown[]) => null) & {
  isRequired: (...args: unknown[]) => null;
};

function makeValidator(): Validator {
  const validator = ((..._args: unknown[]) => null) as Validator;
  validator.isRequired = (..._args: unknown[]) => null;
  return validator;
}

function wrapFactory(_inner?: unknown): Validator {
  return makeValidator();
}

const PropTypes = {
  any: makeValidator(),
  array: makeValidator(),
  bigint: makeValidator(),
  bool: makeValidator(),
  element: makeValidator(),
  elementType: makeValidator(),
  exact: wrapFactory,
  func: makeValidator(),
  instanceOf: wrapFactory,
  node: makeValidator(),
  number: makeValidator(),
  object: makeValidator(),
  arrayOf: wrapFactory,
  objectOf: wrapFactory,
  oneOf: wrapFactory,
  oneOfType: wrapFactory,
  shape: wrapFactory,
  string: makeValidator(),
  symbol: makeValidator(),
};

export const {
  any,
  array,
  arrayOf,
  bigint,
  bool,
  element,
  elementType,
  exact,
  func,
  instanceOf,
  node,
  number,
  object,
  objectOf,
  oneOf,
  oneOfType,
  shape,
  string,
  symbol,
} = PropTypes;

export default PropTypes;
