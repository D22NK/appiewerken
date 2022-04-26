export class ShiftCache {
  filteredGroups: any;
  singleShifts: any;
  constructor() {
    this.filteredGroups = [];
    this.singleShifts = [];
  }
  newFilteredGroup(
    dag: String,
    tijdslot: String,
    winkel: String,
    status: String,
    shifts: any
  ) {
    const group = {
      id: `${dag}-${tijdslot}-${winkel}-${status}`,
      shifts,
      cachedTime: Date.now(),
    };

    this.filteredGroups.push(group);
  }

  hasGroupCache(dag: String, tijdslot: String, winkel: String, status: String) {
    const checkId = `${dag}-${tijdslot}-${winkel}-${status}`;
    if (
      this.filteredGroups.some(
        (g: any) => g.id === checkId && g.cachedTime > Date.now() - 60 * 1000
      )
    ) {
      return { checkId, status: true };
    } else if (
      this.filteredGroups.some(
        (g: any) => g.id === checkId && g.cachedTime < Date.now() - 60 * 1000
      )
    ) {
      this.removeGroup(checkId);
      return { checkId, status: false };
    } else {
      return { checkId, status: false };
    }
  }

  getGroupCache(id: any) {
    return this.filteredGroups[
      this.filteredGroups.findIndex((g: any) => g.id === id)
    ];
  }

  removeGroup(id: any) {
    this.filteredGroups.splice(
      this.filteredGroups.findIndex((g: any) => g.id === id),
      1
    );
    console.log("removed: ", id);
  }

  removeAllGroups() {
    this.filteredGroups = [];
  }

  //   newSingleShift(shift: any) {
  //     this.singleShifts.push(shift);
  //   }

  //   hasSingleShift(id:any){
  //       if
  //   }
}
