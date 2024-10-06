import React from 'react'
import { Modal, Box } from '@mui/material'

import {
    cholaWins,
    pandyaWins
} from '../../assets'

function Winner({
    winner,
    handleCloseWinnerModal,
    winnerModalOpenState
}) {

    return (
        <Modal
            open={winnerModalOpenState}
            onClose={handleCloseWinnerModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                textAlign: "center",
            }}>
                {   (winner === 'Cholas' &&
                    <img src={cholaWins} style={{ maxWidth: '100%', border: 'none' }} alt="BigCo Inc. logo" />) ||
                    (winner === 'Pandyas' &&
                        <img src={pandyaWins} style={{ maxWidth: '100%', border: 'none' }} alt="BigCo Inc. logo" />)
                }
            </Box>
        </Modal>
    )
}

export default Winner