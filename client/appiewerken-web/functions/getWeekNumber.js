export default function getWeeknumber() {
  Date.prototype.getWeekNumber = function () {
    var d = new Date(
      Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
    );
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  const weeknummer = new Date().getWeekNumber();
  return weeknummer;
}
