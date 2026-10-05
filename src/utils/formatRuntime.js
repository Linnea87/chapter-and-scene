// ===== Format runtime =====
// Turns minutes into readable text, e.g. 155 → "2 h 35 min"

const formatRuntime = (minutes) => {
  if (!minutes) return null;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) return `${rest} min`;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
};

export default formatRuntime;
