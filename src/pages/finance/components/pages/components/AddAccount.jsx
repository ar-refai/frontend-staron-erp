import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    CircularProgress
} from '@mui/material';
import Lottie from 'lottie-react';
import Document from '../../../../../assets/lottie/document.json';
import { showAccount, AddAccount } from 'apis/FainanceApi/FinanceRequests';

const AddAccountModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        parent_id: ''
    });
    const [accountData, setAccountData] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [nestedData, setNestedData] = useState([]);
    const [newChild, setNewChild] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOnClose = () => {
        setFormData({ name: '', parent_id: '' });
        setAccountData([]);
        setSelectedAccount(null);
        setNestedData([]);
        setNewChild('');
        onClose();
    }

    const handleAccountChange = async (e) => {
        const selectedId = e.target.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            name: selectedId
        }));

        setLoading(true);
        try {
            const response = await showAccount(selectedId);
            if (response && response.data && response.data.children_recursive) {
                setAccountData(response.data.children_recursive);
                setSelectedAccount(response.data);
                setNestedData([]);
            } else {
                setAccountData([]);
                setSelectedAccount(null);
                setNestedData([]);
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNestedChange = async (e, level) => {
        const selectedId = e.target.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [`level_${level}`]: selectedId
        }));

        setLoading(true);
        try {
            const response = await showAccount(selectedId);
            const updatedNestedData = [...nestedData];
            updatedNestedData[level] = response.data.children_recursive || [];
            setNestedData(updatedNestedData.slice(0, level + 1));
        } catch (error) {
            console.error('Error fetching nested accounts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNewChild = async () => {
        setLoading(true);
        try {
            const updatedNestedData = [...nestedData];
            const lastLevel = nestedData.length - 1;
            const newChildData = { id: `new-${Date.now()}`, name: newChild, children_recursive: [] };
            updatedNestedData[lastLevel] = [
                ...updatedNestedData[lastLevel],
                newChildData
            ];
            setNestedData(updatedNestedData);

            await AddAccount({ parentId: formData[`level_${lastLevel}`], name: newChild });

            setNewChild('');
        } catch (error) {
            console.error('Error adding new child:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderAccountOptions = (accounts) => {
        return accounts.map((account) => (
            <MenuItem key={account.id} value={account.id}>
                {account.name}
            </MenuItem>
        ));
    };

    return (
        <Dialog maxWidth="lg" open={isOpen} onClose={handleOnClose}>
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
                    Add Account
                </Box>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ width: '700px' }}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>1st Degree</InputLabel>
                    <Select
                        name="name"
                        value={formData.name}
                        onChange={handleAccountChange}
                        disabled={loading}
                    >
                        <MenuItem value="30">Assets</MenuItem>
                        <MenuItem value="31">Expenses</MenuItem>
                        <MenuItem value="32">Liabilities</MenuItem>
                        <MenuItem value="33">Equity</MenuItem>
                        <MenuItem value="34">Revenue</MenuItem>
                    </Select>
                </FormControl>

                {selectedAccount && accountData.length > 0 && (
                    <>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>2nd Degree</InputLabel>
                            <Select
                                name="parent_id"
                                defaultValue={formData.parent_id}
                                onChange={(e) => handleNestedChange(e, 0)}
                                disabled={loading}
                            >
                                {renderAccountOptions(accountData)}
                            </Select>
                        </FormControl>

                        {nestedData.map((nestedAccounts, index) => (
                            nestedAccounts.length > 0 && (
                                <FormControl key={index} fullWidth margin="normal">
                                    <InputLabel>{`${index + 3}rd Degree`}</InputLabel>
                                    <Select
                                        defaultValue={formData[`level_${index}`] || ''}
                                        onChange={(e) => handleNestedChange(e, index + 1)}
                                        disabled={loading}
                                    >
                                        {renderAccountOptions(nestedAccounts)}
                                    </Select>
                                </FormControl>
                            )
                        ))}

                        {nestedData.length >= 2 && (
                            <Box display="flex" alignItems="center" gap="10px" mt={2}>
                                <TextField
                                    label="New Child Name"
                                    value={newChild}
                                    onChange={(e) => setNewChild(e.target.value)}
                                    disabled={loading}
                                />
                                <Button
                                    variant="outlined"
                                    color='secondary'
                                    onClick={handleAddNewChild}
                                    disabled={loading || !newChild.trim()}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Add Child'}
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={handleOnClose} color="secondary" variant="outlined">
                    Close
                </Button>
               
            </DialogActions>
        </Dialog>
    );
};

export default AddAccountModal;
