export const findOptions = (value, options) => options?.find((option) => option.value === value);

export const getDistance = (rect1, rect2) => {
  const halfHeight = rect1.height / 2;
  const y1 = rect1.top + halfHeight;
  const y2 = rect2.top + halfHeight;

  return Math.abs(y1 - y2) - rect1.height * 0.3;
};
