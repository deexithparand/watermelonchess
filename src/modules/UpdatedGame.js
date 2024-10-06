import React, { useState, useEffect } from 'react';
import { makemove } from './makemove.js';
import { changeStatus } from './changeStatus.js';
import { updateValidMoves } from './updateValidMoves.js';
import { updateOpponentCheckers } from './updateOpponentCheckers.js';
import { checkForRemoval } from './checkForRemoval.js';
import { checkWinner } from './checkWinner.js';
import Snackbar from '@material-ui/core/Snackbar';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const Game = () => {
    // State management
    const [setPlayerState, changePlayerState] = useState({
        playersTeamOne: {},
        playersTeamTwo: {}
    });
    const [validMoves, changeValidMoves] = useState({});
    const [opponentCheck, changeOpponentCheck] = useState({});
    const [latestMoves, updateLatestMoves] = useState([]);
    const [pointStore, changePointStore] = useState([]);
    const [coinStatusState, changecoinStatus] = useState([]);
    const [winner, changeWinner] = useState('');

    // Additional state for Snackbar and Winner Modal
    const [snackBarAlert, setSnackBarAlert] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openWinnerModal, setOpenWinnerModal] = useState(false);

    // Open and close Snackbar
    const handleOpenSnackBar = () => setOpenSnackBar(true);
    const handleCloseSnackBar = () => setOpenSnackBar(false);

    // Open and close Winner Modal
    const handleOpenWinnerModal = () => setOpenWinnerModal(true);
    const handleCloseWinnerModal = () => setOpenWinnerModal(false);

    // Helper function to get the current player state
    const callBackPlayerState = (state) => {
        changePlayerState({ ...state });
    };

    // Function to handle player movement
    const handleMove = (coin, pos) => {
        makemove(coin, pos, setPlayerState, changePlayerState, pointStore, validMoves, opponentCheck, changeValidMoves, updateLatestMoves, changeLatestMoves, latestMoves, handleOpenSnackBar, setSnackBarAlert, handleCloseSnackBar);
    };

    // Function to update the status of the game board
    const handleStatusChange = (newarr) => {
        changeStatus(newarr, setPlayerState, changecoinStatus);
    };

    // Function to update valid moves for all players
    const handleUpdateValidMoves = () => {
        updateValidMoves(validMoves, setPlayerState, ptsnear, pointStore, changeValidMoves);
    };

    // Function to update opponent checkers for all players
    const handleUpdateOpponentCheckers = () => {
        updateOpponentCheckers(opponentCheck, setPlayerState, ptsnear, pointStore, changeOpponentCheck);
    };

    // Function to check for player removal
    const handleCheckForRemoval = () => {
        checkForRemoval(validMoves, opponentCheck, latestMoves[0]?.coin || '', setPlayerState, pointStore, changeValidMoves, changeOpponentCheck, coinStatusState, changecoinStatus, handleStatusChange, callBackPlayerState);
    };

    // Function to check for a winner
    const handleCheckWinner = () => {
        const teamOneSize = Object.keys(setPlayerState.playersTeamOne).length;
        const teamTwoSize = Object.keys(setPlayerState.playersTeamTwo).length;
        checkWinner(teamOneSize, teamTwoSize, handleOpenWinnerModal, changeWinner);
    };

    // Initial setup of the game board
    useEffect(() => {
        // Initialize game board and players
        // Set up initial valid moves and opponent checkers
        handleUpdateValidMoves();
        handleUpdateOpponentCheckers();
    }, []);

    // Effect to handle updates in game state
    useEffect(() => {
        handleCheckForRemoval();
        handleCheckWinner();
    }, [setPlayerState]);

    return (
        <div className="game-container">
            {/* Render the game board */}
            <div className="board">
                {/* Replace with actual game board rendering */}
                <h3>Game Board</h3>
                {/* Example: A loop over game points to render coins */}
                {pointStore.map((point, index) => (
                    <div key={index} className="point">
                        {/* Render coin or empty space */}
                        {point.coin ? (
                            <div 
                                className="coin"
                                onClick={() => handleMove(point.coin, index)}
                            >
                                {point.coin.team}
                            </div>
                        ) : (
                            <div className="empty-space" />
                        )}
                    </div>
                ))}
            </div>

            {/* Render Snackbar for move notifications */}
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={openSnackBar}
                onClose={handleCloseSnackBar}
                message={snackBarAlert}
                autoHideDuration={3000}
            />

            {/* Render Modal for winner announcement */}
            <Modal
                open={openWinnerModal}
                onClose={handleCloseWinnerModal}
                aria-labelledby="winner-modal-title"
                aria-describedby="winner-modal-description"
            >
                <div className="modal-content">
                    <h2 id="winner-modal-title">Game Over</h2>
                    <p id="winner-modal-description">
                        {winner ? `${winner} wins!` : 'It\'s a draw!'}
                    </p>
                    <Button onClick={handleCloseWinnerModal}>Close</Button>
                </div>
            </Modal>
        </div>
    );
};

export default Game;
