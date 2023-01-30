export const snakeToTitleCase = (snakeCase) => {
  return snakeCase
    .split('_')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');
};
