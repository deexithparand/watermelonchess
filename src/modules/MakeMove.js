// makemove.js
import { playAudio } from '../../modules/PlayAudio.js';
import { getCurrPos } from '../../modules/GetCurrentPos.js';
import { invalidMove, coinMove } from '../../assets/index.js';
import { edgeCaseSuicideMove } from './edgeCaseSuicideMove.js';

export const makemove = (coin, pos, setPlayerState, changePlayerState, pointStore, validMoves, opponentCheck, changeValidMoves, updateLatestMoves, changeLatest, latestMoves, openSnackBar, setSnackBarAlert, closeSnackBar) => {
    var temp = setPlayerState;
    changeLatest(coin)

    var suicideFlag = false

    Object.keys(validMoves).forEach((key) => {
        if (!ptsnear[getCurrPos(key, setPlayerState)].includes(getCurrPos(coin, setPlayerState)) && key[0] === coin[0] && key !== coin && validMoves[coin].includes(validMoves[key][0]) && validMoves[key].length === 1 && validMoves[key][0] === pos - 1 && opponentCheck[key].length !== 0) {
            if (!edgeCaseSuicideMove(key, pos, setPlayerState, opponentCheck, validMoves)) {
                suicideFlag = true;
            }
        }
    })

    if (suicideFlag) {
        playAudio(invalidMove)
        setSnackBarAlert('Suicide Move')
        openSnackBar()
    } else if (pointStore.includes(pos - 1)) {
        playAudio(invalidMove)
        setSnackBarAlert('Invalid Input')
        openSnackBar()
    } else if (!validMoves[coin].includes(pos - 1)) {
        playAudio(invalidMove)
        setSnackBarAlert("Can Move only one step")
        openSnackBar()
    } else {
        if (latestMoves.length >= 1 && latestMoves[0].coin[0] === coin[0]) {
            playAudio(invalidMove)
            setSnackBarAlert("It's not your turn now")
            openSnackBar()
        } else {
            playAudio(coinMove)
            var lmList = latestMoves
            lmList.unshift({ 'coin': coin, 'position': pos })
            if (lmList.length === 4) lmList.pop()
            updateLatestMoves(lmList)

            if (temp.playersTeamOne[coin] !== undefined) {
                temp.playersTeamOne[coin] = parseInt(pos - 1);
            } else if (temp.playersTeamTwo[coin] !== undefined) {
                temp.playersTeamTwo[coin] = parseInt(pos - 1);
            } else {
                console.log('undefined')
            }
            var playersTeamOne = temp.playersTeamOne
            var playersTeamTwo = temp.playersTeamTwo

            changePlayerState({ playersTeamOne, playersTeamTwo })
        }
    }
}
