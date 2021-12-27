export default function dateformatter(string) {
  return string.replace("T00:00:00.000Z", "").split("-").reverse().join("-");
}
