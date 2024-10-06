// edgeCaseSuicideMove.js
export const edgeCaseSuicideMove = (key, pos, setPlayerState, opponentCheck, validMoves) => {
    var currTeam = key[0]
    var searchObj = (currTeam === 'r') ? setPlayerState.playersTeamTwo : setPlayerState.playersTeamOne
    var retVal = false

    opponentCheck[key].forEach((opponentPos) => {
        const oppkey = Object.keys(searchObj).find(key => searchObj[key] === opponentPos);
        if (validMoves[oppkey].length === 1 && validMoves[oppkey][0] === pos - 1) {
            retVal = true
        }
    })

    return retVal
}
