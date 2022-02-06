export default function kalenderStyle(
  voltooid: Boolean,
  bcd: Boolean,
  ziek: Boolean
) {
  let res;
  if (bcd) {
    if (!ziek) {
      res = "bg-orange-400 text-orange-900 hover:bg-orange-300";
    } else if (ziek) {
      res = "bg-red-400 text-red-900 hover:bg-red-300";
    }
  } else if (voltooid && !bcd) {
    res = "bg-green-400 text-green-900 hover:bg-green-300";
  } else if (!voltooid) {
    res = "bg-yellow-300 text-yellow-600 hover:bg-yellow-200";
  }
  return res;
}
