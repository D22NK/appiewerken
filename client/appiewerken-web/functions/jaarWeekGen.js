import getWeeknumber from "./getWeekNumber";
import getYear from "./getYear";

export default function jaarWeekGen(offset) {
  Date.prototype.getJaarWeek = function (date) {
    let d;
    if (date) {
      d = new Date(Date.UTC(date) + 604800000 * offset);
    } else {
      d = new Date(
        Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()) +
          604800000 * offset
      );
    }

    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return {
      week: Math.ceil(((d - yearStart) / 86400000 + 1) / 7),
      jaar: d.getFullYear(),
    };
  };

  const jaarweek = new Date().getJaarWeek();

  return jaarweek;
}

// export default function jaarWeekGen(offset: any) {
//   let jaar = getYear();
//   let week = getWeeknumber();
//   if (week + offset > 53) {
//     console.log(Math.abs(week + offset) / 52);
//     week = week + (offset + (53 * week + offset) / 52);
//     jaar = jaar + Math.abs(week + offset) / 52;

//     return Math.trunc(jaar) + "-" + Math.trunc(Math.abs(week));
//   }
// }
// const abs = Math.abs(week + offset) / 53;
// console.log(abs);
// if (abs < 1 && abs >= 0) {
//   jaar = jaar - 1;
//   week = 53 + offset;
//   return jaar + "-" + week;
// } else if (abs >= 1) {
//   jaar = jaar - Math.trunc(abs) - 1;
//   return jaar + "-" + Math.abs(53 + (Math.trunc(offset / 52) + week));
// }

// if (offset === 0) {
//     return getYear() + "-" + getWeeknumber();
//   } else if (offset < 0) {
//     if (week === 1 && offset > -54) {
//       return jaar - 1 + "-" + (54 + offset);
//     } else {

//     }
//   }
