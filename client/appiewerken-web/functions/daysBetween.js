export default function daysBetween(date) {
  let input = date.replace("T00:00:00.000Z", "");
  const now = new Date();
  const target = new Date(input);
  console.log(target);
  const diffTime = Math.abs(target - now);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
