export const nameValidator = factory =>
  factory.name ? null : 'Factory name required';

export const rangeMinValidator = factory => {
  if (factory.rangeMin !== 0 && !factory.rangeMin) {
    // Required
    return 'Minimum value required';
  } else if (
    // <= rangeMax
    (factory.rangeMax === 0 || factory.rangeMax) &&
    factory.rangeMin > factory.rangeMax
  ) {
    return 'Must be less than or equal to maximum value';
  } else {
    // Valid
    return null;
  }
};

export const rangeMaxValidator = factory => {
  if (factory.rangeMax !== 0 && !factory.rangeMax) {
    // Required
    return 'Maximum value required';
  } else if (
    // >= rangeMin
    (factory.rangeMin === 0 || factory.rangeMin) &&
    factory.rangeMin > factory.rangeMax
  ) {
    return 'Must be greater than or equal to minimum value';
  } else {
    // Valid
    return null;
  }
};

export const numChildrenValidator = factory => {
  if (!factory.numChildren && factory.numChildren !== 0) {
    return 'Number of child nodes required';
  } else {
    return null;
  }
};

export const omniValidator = factory =>
  nameValidator(factory) ||
  rangeMinValidator(factory) ||
  rangeMaxValidator(factory) ||
  numChildrenValidator(factory);
