import { Box, Button, Divider, Modal, Typography } from '@mui/material'
import React from 'react'
import Lottie from 'lottie-react';
import Document from "../../../assets/lottie/document.json"
import { useTheme } from '@emotion/react';
import { tokens } from 'theme';

const RecruitDescriptionModal = ({descriptionOpen , handleDescriptionClose , selectedDescription}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Modal open={descriptionOpen} onClose={handleDescriptionClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 900,
                    background: colors.grey[900],
                    color: colors.grey[100],
                    border: `1px solid ${colors.greenAccent[400]}`,
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    borderRadius: '10px'
                }}
            >
                <Typography variant="h6" sx={{
                    textTransform: "uppercase",
                    fontWeight: 'bold',
                }} component="h2">

                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                        <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                        Request Description
                    </Box>
                </Typography>
                <Divider />
                <Typography
                    sx={{
                        padding: '10px',
                        borderRadius: '10px'
                    }}
                >{selectedDescription}</Typography>
                <Divider />
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleDescriptionClose}
                >
                    Close
                </Button>
            </Box>
        </Modal>
    )
}

export default RecruitDescriptionModal