export const getRandomImage = (
  width = 200,
  height = 300,
  seed = Math.random()
) => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};
