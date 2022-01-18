export default function getYear(date) {
  if (date) {
    return new Date(date).getFullYear();
  } else {
    return new Date().getFullYear();
  }
}
