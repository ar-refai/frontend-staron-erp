import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    TextField,
    CircularProgress,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';
import { UpdateAccount, showAccount, ShowAllAccounts } from 'apis/FainanceApi/FinanceRequests';
import Lottie from 'lottie-react';
import Document from '../../../../../assets/lottie/document.json';

const UpdateAccountModal = ({ isOpen, onClose, accountId, onUpdated }) => {
    const [formData, setFormData] = useState({
        name: '',
        parent_id: accountId
    });
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await ShowAllAccounts();
                if (response.status === 200) {
                    setAccounts(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch accounts:', error);
            }
        };

        fetchAccounts();

        if (accountId) {
            const fetchAccount = async () => {
                setLoading(true);
                try {
                    const response = await showAccount(accountId);
                    if (response.status === 200) {
                        setFormData({
                            name: response.data.name,
                            parent_id: response.data.parent_id
                        });
                    }
                } catch (error) {
                    console.error('Failed to fetch account data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchAccount();
        }
    }, [accountId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFormSubmit = async () => {
        setLoading(true);
        try {
            // console.log(formData);
            // console.log(formData);

            await UpdateAccount(accountId, formData);
            onUpdated(); // Callback to refresh the account data
            onClose();   // Close the modal
        } catch (error) {
            console.error('Failed to update account:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog maxWidth="lg" open={isOpen} onClose={onClose}>
            <DialogTitle>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px',
                        textTransform: 'uppercase'
                    }}
                >
                    <Lottie style={{ width: '30px', display: 'flex' }} animationData={Document} />
                    Update Account
                </Box>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <TextField
                        name="name"
                        label="Account Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="parent-account-label">Parent Account</InputLabel>
                    <Select
                        labelId="parent-account-label"
                        name="parent_id"
                        value={formData.parent_id || ''}
                        onChange={handleInputChange}
                        disabled={loading}
                    >
                        {accounts.map((account) => (
                            <MenuItem key={account.id} value={account.id}>
                                {account.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={onClose} color="secondary" variant="outlined">
                    Cancel
                </Button>
                <Button onClick={handleFormSubmit} color="secondary" variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Update'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateAccountModal;
