export const toTitleCase = (text) => {
  return text
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};
