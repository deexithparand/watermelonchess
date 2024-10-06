// doRemoval.js
import { playAudio } from '../../modules/PlayAudio.js';
import { killMove } from '../../assets/index.js';

export const doRemoval = (key, validMoves, changeValidMoves, opponentCheck, changeOpponentCheck, setPlayerState, changePlayerState, pointStore, changePointStore, coinStatusState, changecoinStatus, changeStatus, updateValidMoves, callBackPlayerState) => {
    var tempValidMoves = validMoves;
    var tempOpponentCheck = opponentCheck;
    var tempPlayerState = setPlayerState;
    var tempPointStore = pointStore;
    var holdpos;

    delete tempValidMoves[key];
    changeValidMoves(tempValidMoves);

    delete tempOpponentCheck[key];
    changeOpponentCheck(tempOpponentCheck);

    if (tempPlayerState.playersTeamOne[key] !== undefined) {
        holdpos = tempPlayerState.playersTeamOne[key];
        delete tempPlayerState.playersTeamOne[key];
        changePlayerState(tempPlayerState);
    } else {
        holdpos = tempPlayerState.playersTeamTwo[key];
        delete tempPlayerState.playersTeamTwo[key];
        changePlayerState(tempPlayerState);
    }

    tempPointStore.splice(tempPointStore.indexOf(holdpos), 1);
    changePointStore(tempPointStore);

    var tempcoinStatusState = coinStatusState;
    tempcoinStatusState[holdpos].isPlaced = "empty";
    changecoinStatus(tempcoinStatusState);
    changeStatus(tempcoinStatusState);

    updateValidMoves(validMoves, setPlayerState, pointStore, changeValidMoves);
    callBackPlayerState(setPlayerState);
    playAudio(killMove);
}
