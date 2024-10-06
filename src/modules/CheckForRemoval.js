// checkForRemoval.js
import { doRemoval } from './doRemoval.js';

export const checkForRemoval = (validMoves, opponentCheck, latestMove, setPlayerState, pointStore, changeValidMoves, changeOpponentCheck, coinStatusState, changecoinStatus, changeStatus, callBackPlayerState) => {
    Object.keys(validMoves).forEach((key) => {
        if (validMoves[key].length === 0 && opponentCheck[key].length !== 0 && key[0] !== latestMove[0]) {
            doRemoval(key, validMoves, changeValidMoves, opponentCheck, changeOpponentCheck, setPlayerState, pointStore, changePointStore, coinStatusState, changecoinStatus, changeStatus, callBackPlayerState);
        }
    });
}
