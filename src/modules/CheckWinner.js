// checkWinner.js
import { playAudio } from '../../modules/PlayAudio.js';
import { matchWon } from '../../assets/index.js';

export const checkWinner = (teamOneSize, teamTwoSize, handleOpenWinnerModal, changeWinner) => {
    if (teamOneSize === 3 || teamTwoSize === 3) {
        playAudio(matchWon);
        handleOpenWinnerModal();

        if (teamOneSize === 3) {
            changeWinner('Pandyas');
        } else {
            changeWinner('Cholas');
        }
    }
}
