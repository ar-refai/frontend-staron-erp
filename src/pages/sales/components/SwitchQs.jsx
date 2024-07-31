import { Box, Dialog, DialogContent, DialogTitle, Divider, FormControl, InputLabel, Select , MenuItem, DialogActions, Button, Typography} from '@mui/material'
import Lottie from 'lottie-react'
import Document from '../../../assets/lottie/document.json';

const SwitchQS = ({ isOpen, onClose, deptEmployees, switchEmployee, onSwitchChange, onSubmit }) => {


    return (
        <Dialog maxWidth="lg" open={isOpen} onClose={onClose}>
            <DialogTitle>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", textTransform: "uppercase" }}>
                    <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                    Assign Lead
                </Box>

            </DialogTitle>
            <Divider />
            <DialogContent sx={{ width: "600px" }}>
                 <Typography sx={{
                    color:"#c1c1c1"
                 }}>
                    Assign the lead to another employee:
                </Typography>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Assign To:</InputLabel>
                    <Select
                        value={switchEmployee}
                        onChange={onSwitchChange}
                    >
                        {deptEmployees.map(emp =>
                            <MenuItem value={emp.id}>{emp.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>

            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={onClose} color="secondary" variant="outlined">Close</Button>
                <Button onClick={onSubmit} color="secondary" variant="outlined">Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SwitchQS