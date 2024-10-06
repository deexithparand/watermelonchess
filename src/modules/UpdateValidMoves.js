// updateValidMoves.js
import { getCurrPos } from '../../modules/GetCurrentPos.js';

export const updateValidMoves = (validMovesObj, setPlayerState, ptsnear, pointStore, changeValidMoves) => {
    var tempobj = validMovesObj;
    Object.keys(tempobj).forEach(coin => {
        let currPos = getCurrPos(coin, setPlayerState);
        let validarr = ptsnear[currPos];
        let retarr = validarr.filter(x => !pointStore.includes(x));
        tempobj[coin] = retarr;
    });
    changeValidMoves(tempobj);
}
