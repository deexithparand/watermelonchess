export const getCurrPos = (coin, setPlayerState) => {
    var temp = setPlayerState;
    if (temp.playersTeamOne[coin] !== undefined) {
        return temp.playersTeamOne[coin];
    }
    else if (temp.playersTeamTwo[coin] !== undefined) {
        return temp.playersTeamTwo[coin];
    }
    else return -1;
}