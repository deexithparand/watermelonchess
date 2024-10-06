// changeStatus.js
export const changeStatus = (newarr, setPlayerState, changecoinStatus) => {
    var temparr = [...newarr]

    temparr.forEach((element) => {
        if (element.isPlaced !== "empty") element.isPlaced = "empty";
    });

    for (const index in setPlayerState.playersTeamOne) {
        if (setPlayerState.playersTeamOne.hasOwnProperty(index)) {
            temparr[setPlayerState.playersTeamOne[index]].isPlaced = String(index);
        }
    }

    for (const index in setPlayerState.playersTeamTwo) {
        if (setPlayerState.playersTeamTwo.hasOwnProperty(index)) {
            temparr[setPlayerState.playersTeamTwo[index]].isPlaced = String(index);
        }
    }

    changecoinStatus(temparr)
}
