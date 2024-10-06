// updateOpponentCheckers.js
import { getCurrPos } from '../../modules/GetCurrentPos.js';

export const updateOpponentCheckers = (opponentCheck, setPlayerState, ptsnear, pointStore, changeOpponentCheck) => {
    var tempObj = opponentCheck;
    Object.keys(tempObj).forEach((key) => {
        let currPos = getCurrPos(key, setPlayerState);
        let nearPtArr = ptsnear[currPos];
        let opponentTeamArray = key[0] === 'r' ? Object.values(setPlayerState.playersTeamTwo) : Object.values(setPlayerState.playersTeamOne);
        let retarr = nearPtArr.filter(x => (pointStore.includes(x) && opponentTeamArray.includes(x)));
        tempObj[key] = retarr;
    });
    changeOpponentCheck(tempObj);
}
