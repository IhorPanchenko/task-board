export const formatDeadline = (deadline) => {
  if (!deadline) return "No deadline";

  const hours = Math.floor(deadline / 60);
  const minutes = deadline % 60;

  if (hours === 0) {
    return `${minutes} mins`;
  }

  return minutes === 0 ? `${hours} hour` : `${hours} hour ${minutes} mins`;
};
