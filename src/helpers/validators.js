export const sameAs = (field, getValues) => (value) => {
  // if (getValues(field) !== value) return false;

  /* const compareTo = getValues()[field];
  return compareTo === value; */

  return getValues(field) === value;
};
