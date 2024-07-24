import { Card, useTheme } from '@mui/material';
import React from 'react'
import { tokens } from 'theme';
import {
    Box,
    Button,
    Typography,
    Modal,
    CardContent,
    Collapse,
    Divider,
    Chip,

} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    "& > :not(style) ~ :not(style)": {
        marginTop: theme.spacing(2),
    },
}));

const EmployeeTimesheetInfo = ({ selectedRow, descriptionOpen, handleDescriptionClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Modal open={descriptionOpen} onClose={handleDescriptionClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 900,
                    maxHeight: "100%",
                    overflow: "scroll",
                    bgcolor: colors.primary[700],
                    color: colors.primary[200],
                    border: `3px solid ${colors.greenAccent[300]}`,
                    boxShadow: 24,
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    borderRadius: "10px",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                    }}
                    component="h2"
                >
                    Employee Profile:
                </Typography>
                <Divider />
                <Box>
                    {/* {console.log(selectedRow)}
            {console.log("#".repeat(44))} */}


                    <Card
                        sx={{
                            maxWidth: "100%",
                            p: "10px",
                            backgroundColor: colors.primary[700],
                        }}
                    >
                        <Box
                            sx={{
                                diplay: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                textAlign: "center",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: colors.greenAccent[500],
                                    display: "flex",
                                    justifyContent: "center",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    margin: "auto",
                                    marginBottom: "10px",
                                    width: "50px", height: "50px"
                                }}
                                aria-label="recipe"
                                src={`http://api.staronegypt.com.eg/${selectedRow.user.profileimage}`}
                            >
                                {selectedRow.user.name.slice(0, 1)}
                            </Avatar>
                            <Typography variant="h5">{selectedRow.user.name}</Typography>
                            <Typography
                                sx={{
                                    opacity: "75%",
                                }}
                            >
                                {selectedRow.user.isemploee === 1 ? "Active" : "NOT Active"}
                            </Typography>
                        </Box>

                        <Collapse in={true} timeout="auto" unmountOnExit>
                            <CardContent
                                sx={{
                                    display: "flex",
                                }}
                            >
                                {/* Employee Information */}
                                <Root>
                                    <Divider>
                                        <Chip label="Employee Id:" size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.note ? selectedRow.user.hr_code : "ـــــ"}
                                    </Typography>

                                    <Divider>
                                        <Chip label="Note:" size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.note ? selectedRow.note : "ـــــ"}
                                    </Typography>

                                    <Divider>
                                        <Chip label="Start Work: " size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.user.startwork}
                                    </Typography>

                                    <Divider>
                                        <Chip label="End Work: " size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.user.endwork}
                                    </Typography>

                                    <Divider>
                                        <Chip label="Timestamp: " size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.user.TimeStamp}
                                    </Typography>

                                    <Divider>
                                        <Chip label="Absent: " size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.Absent === true ? "Absent " : "Not Appsent"}
                                    </Typography>

                                    <Divider>
                                        <Chip label="Clock In: " size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.user.clockin}
                                    </Typography>
                                </Root>

                                <Divider orientation="vertical" flexItem />

                                <Root>
                                    <Divider>
                                        <Chip label="Clock Out: " size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.user.clockout}
                                    </Typography>

                                    <Divider>
                                        <Chip label="Clock_IN: " size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.Clock_In}
                                    </Typography>

                                    <Divider>
                                        <Chip label="Clock_Out: " size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.Clock_Out}
                                    </Typography>

                                    <Divider>
                                        <Chip label="Working Duration: " size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.Work_Time}
                                    </Typography>

                                    <Divider>
                                        <Chip label="Addition: " size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.addetion}
                                    </Typography>

                                    <Divider>
                                        <Chip label="Deduction: " size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.deduction}
                                    </Typography>

                                    <Divider>
                                        <Chip label="Is Employee: " size="small" />
                                    </Divider>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        {selectedRow.user.isemploee === 1 ? "Active" : "NOT Active"}
                                    </Typography>
                                </Root>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Box>
                <Divider />
                <Button
                    variant="outlined"
                    onClick={handleDescriptionClose}
                    sx={{
                        color: colors.redAccent[400],
                        border: `1px solid ${colors.redAccent[400]}`,
                        width: '100px',
                        marginInline: 'auto',
                        "&:hover": {
                            color: colors.redAccent[500],
                            border: `1px solid ${colors.redAccent[500]}`,
                        }
                    }}
                >
                    Close
                </Button>
            </Box>
        </Modal>
    )
}

export default EmployeeTimesheetInfo