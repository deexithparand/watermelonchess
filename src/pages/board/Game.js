import { useState, useEffect } from 'react'

import coinStatus from '../../data/CoinStatus.js'
import { playersTeamOne, playersTeamTwo, validMovesArray, opponentCheckArray } from '../../data/Players.js'

import Points from './Points.js'
import NextMoveRed from './NextmoveRed.js'
import NextMoveBlue from './NextmoveBlue.js'
import WinnerModal from '../matchwon/WinnerModal.js'

import { board } from '../../assets/index.js'
import { coinMove, invalidMove, matchWon, killMove } from '../../assets/index.js';

import ptsnear from '../../data/PossibleMoves.js'

import '../../styles/game.css'
import MoveAlert from '../movealert/MoveAlert.js'

import { playAudio } from '../../modules/PlayAudio.js'
import { getCurrPos } from '../../modules/GetCurrentPos.js'

function Game({ callBackPlayerState }) {

  //map points intially with isplaced as empty, and top,left pos
  const [coinStatusState, changecoinStatus] = useState(coinStatus)

  const [setPlayerState, changePlayerState] = useState({ playersTeamOne, playersTeamTwo })
  const [pointStore, changePointStore] = useState([])

  const [validMoves, changeValidMoves] = useState(validMovesArray);
  const [opponentCheck, changeOpponentCheck] = useState(opponentCheckArray)

  const [latestMove, changeLatest] = useState()
  const [latestMoves, updateLatestMoves] = useState([]);

  const [winner, changeWinner] = useState('');

  // winnerModal
  const [winnerModalOpenState, setWinnerModalOpenState] = useState(false);
  const handleCloseWinnerModal = () => setWinnerModalOpenState(false);
  const handleOpenWinnerModal = () => setWinnerModalOpenState(true);

  // snackbar alert
  const [snackBarAlert, setSnackBarAlert] = useState('Invalid Move');
  const [snackBarOpenState, setSnackBarOpenState] = useState(false);
  const closeSnackBar = () => setSnackBarOpenState(false);
  const openSnackBar = () => setSnackBarOpenState(true);

  //update isplaced in coinStatusState 
  const changeStatus = (newarr) => {
    //very important
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

  //called from make move
  const edgeCaseSuicideMove = (key, pos) => {
    var currTeam = key[0]
    var searchObj = (currTeam === 'r') ? setPlayerState.playersTeamTwo : setPlayerState.playersTeamOne
    var retVal = false

    //console.log(opponentCheck[key])
    //console.log(searchObj)
    opponentCheck[key].forEach((opponentPos) => {
      //opponent pos
      const oppkey = Object.keys(searchObj).find(key => searchObj[key] === opponentPos);
      if (validMoves[oppkey].length === 1 && validMoves[oppkey][0] === pos - 1) {
        console.log('hello')
        retVal = true
      }
    })

    return retVal
  }

  //send data as position
  const makemove = (coin, pos) => {
    var temp = setPlayerState;
    changeLatest(coin)

    var suicideFlag = false

    //detect suicide move
    //key is the one which will be deleted by the coins move
    Object.keys(validMoves).forEach((key) => {
      /* 
        edge case 1. 
        key and coin shouldn't be nearby
        from ptsnear, get pos of key
        check if index of coin is present in ptsnear
      */
      /*
        edge case 2
        get the opponent pos using opponentcheck
        check if the validmoves[opppos].length=1 and validmoves[opppos][0]===pos
        then not a suicide move
      */

      if (!ptsnear[getCurrPos(key, setPlayerState)].includes(getCurrPos(coin, setPlayerState)) && key[0] === coin[0] && key !== coin && validMoves[coin].includes(validMoves[key][0]) && validMoves[key].length === 1 && validMoves[key][0] === pos - 1 && opponentCheck[key].length !== 0) {
        //console.log(key,coin,validMoves[key][0]===pos-1,validMoves[key].length===1,validMoves[coin].includes(validMoves[key][0]),validMoves[key][0],opponentCheck[key].length!==0)
        console.log(edgeCaseSuicideMove(key, pos))
        if (!edgeCaseSuicideMove(key, pos)) {
          suicideFlag = true;
        }
      }
    })

    // console.log(coin,suicideFlag)

    //pos-1
    if (suicideFlag) {
      console.log('Be careful its a suicide move')
      playAudio(invalidMove)
      setSnackBarAlert('Suicide Move')
      openSnackBar()
    }
    else if (pointStore.includes(pos - 1)) {
      console.log("invalid input")
      playAudio(invalidMove)
      setSnackBarAlert('Invalid Input')
      openSnackBar()
    }
    else if (!validMoves[coin].includes(pos - 1)) {
      console.log("Can Move only one step")
      playAudio(invalidMove)
      setSnackBarAlert("Can Move only one step")
      openSnackBar()
    }
    else {
      if (latestMoves.length >= 1 && latestMoves[0].coin[0] === coin[0]) {
        console.log("invalid input")
        playAudio(invalidMove)
        setSnackBarAlert("It's not your turn now")
        openSnackBar()
      }
      else {
        playAudio(coinMove)
        var lmList = latestMoves
        lmList.unshift({ 'coin': coin, 'position': pos })
        if (lmList.length === 4) lmList.pop()
        updateLatestMoves(lmList)

        if (temp.playersTeamOne[coin] !== undefined) {
          temp.playersTeamOne[coin] = parseInt(pos - 1);
        }
        else if (temp.playersTeamTwo[coin] !== undefined) {
          temp.playersTeamTwo[coin] = parseInt(pos - 1);
        }
        else {
          console.log('undefined')
        }
        var playersTeamOne = temp.playersTeamOne
        var playersTeamTwo = temp.playersTeamTwo

        changePlayerState({ playersTeamOne, playersTeamTwo })
      }
    }
  }

  const updateValidMoves = (validMovesObj) => {
    var tempobj = validMovesObj
    //get coin value from key
    //get the position
    Object.keys(tempobj).forEach(coin => {
      let currPos = getCurrPos(coin, setPlayerState);
      let validarr = ptsnear[currPos]
      let retarr = validarr.filter(x => !pointStore.includes(x));
      tempobj[coin] = retarr;
    });
    changeValidMoves(tempobj)
  }

  const updateOpponentCheckers = (opponentCheck) => {
    var tempObj = opponentCheck
    //loop through each key of opponentCheck
    Object.keys(tempObj).forEach((key) => {
      if (key[0] === 'r') {
        let currPos = getCurrPos(key, setPlayerState);
        let nearPtArr = ptsnear[currPos]
        let opponentTeamArray = Object.values(setPlayerState.playersTeamTwo)
        let retarr = nearPtArr.filter(x => (pointStore.includes(x) && opponentTeamArray.includes(x)));
        tempObj[key] = retarr;
      }
      else {
        let currPos = getCurrPos(key, setPlayerState);
        let nearPtArr = ptsnear[currPos]
        let opponentTeamArray = Object.values(setPlayerState.playersTeamOne)
        let retarr = nearPtArr.filter(x => (pointStore.includes(x) && opponentTeamArray.includes(x)));
        tempObj[key] = retarr;
      }

      changeOpponentCheck(tempObj)
    })
    //1.get the name & establish the opponent
  }

  const doRemoval = (key) => {
    console.log(pointStore)
    var tempValidMoves = validMoves
    var tempOpponentCheck = opponentCheck
    var tempPlayerState = setPlayerState
    var tempPointStore = pointStore
    var holdpos;
    delete (tempValidMoves[key]);
    changeValidMoves(tempValidMoves)
    delete (tempOpponentCheck[key])
    changeOpponentCheck(tempOpponentCheck)
    if (tempPlayerState.playersTeamOne[key] !== undefined) {
      holdpos = tempPlayerState.playersTeamOne[key]
      delete tempPlayerState.playersTeamOne[key]
      changePlayerState(tempPlayerState)
    }
    else {
      holdpos = tempPlayerState.playersTeamTwo[key]
      delete tempPlayerState.playersTeamTwo[key]
      changePlayerState(tempPlayerState)
    }
    tempPointStore.splice(tempPointStore.indexOf(holdpos), 1);
    changePointStore(tempPointStore)
    console.log(tempPointStore)

    var tempcoinStatusState = coinStatusState
    tempcoinStatusState[holdpos].isPlaced = "empty"
    changecoinStatus(tempcoinStatusState)
    changeStatus(coinStatusState)

    //var tempValidMoves
    updateValidMoves(validMoves)

    callBackPlayerState(setPlayerState)

    playAudio(killMove)

    console.log(tempPlayerState)
  }

  const checkForRemoval = () => {
    //valid moves array must be empty, then for the same key, opponentcheck must have some val
    Object.keys(validMoves).forEach((key) => {
      if (validMoves[key].length === 0 && opponentCheck[key].length !== 0 && key[0] !== latestMove[0]) {
        doRemoval(key);
      }
    })
    //call remove key function and update pointstore
  }

  const checkWinner = (teamOneSize, teamTwoSize) => {

    // either wins
    if (teamOneSize === 3 || teamTwoSize === 3) {

      playAudio(matchWon)
      handleOpenWinnerModal()

      if (teamOneSize === 3) {
        changeWinner('Pandyas')
      } else {
        changeWinner('Cholas')
      }

    }

  }

  //check whether the position is only within neighbours
  useEffect(() => {
    //change the valid moves
    updateValidMoves(validMoves);

    //update opponent checkers
    updateOpponentCheckers(opponentCheck);

    //create one for invalidChecker(opponents blocking)
    //then checking to be done for removal
    //different checking to end game
    checkForRemoval();

    //check winner
    checkWinner(Object.keys(setPlayerState.playersTeamOne).length, Object.keys(setPlayerState.playersTeamTwo).length);

  }, [pointStore])

  useEffect(() => {
    changePointStore(Object.values(setPlayerState.playersTeamOne).concat(Object.values(setPlayerState.playersTeamTwo)))
    /*Handle the input before this*/
    //after makemove, update isplaced using coinStatusState, each time setPlayerState changes 
    changeStatus(coinStatusState)
    checkForRemoval();

  }, [setPlayerState]);

  return (
    <>
      <div className='gamediv'>

        <NextMoveRed validMoves={validMoves} makemove={makemove} setPlayerState={setPlayerState} />
        <div className='boardHandler'>
          <img className="boardImg" src={board} alt="board image" />
          <Points coinStatus={coinStatusState} />
        </div>
        <NextMoveBlue validMoves={validMoves} makemove={makemove} setPlayerState={setPlayerState} />

        {/* Winner Window */}
        <WinnerModal winner={winner} handleCloseWinnerModal={handleCloseWinnerModal} winnerModalOpenState={winnerModalOpenState} />

        {/* Snackbar Alert */}
        <MoveAlert snackBarAlert={snackBarAlert} snackBarOpenState={snackBarOpenState} closeSnackBar={closeSnackBar} />

        {/* Latest Moves UI  */}
        <div className='latestMoves'>
          {latestMoves.length !== undefined && latestMoves.map((obj, index) => (
            obj.coin[0] === 'r' && <h3 key={index} style={{ color: 'red' }}>{obj.coin}&nbsp;&rarr;&nbsp;{obj.position}</h3> ||
            obj.coin[0] === 'b' && <h3 key={index} style={{ color: 'blue' }}>{obj.coin}&nbsp;&rarr;&nbsp;{obj.position}</h3>
          ))}
        </div>

      </div>


    </>
  )
}

export default Game