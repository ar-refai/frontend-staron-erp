import React, { useState } from 'react';
import {
    Box,
    Button,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { TransitionGroup } from 'react-transition-group';
import { SendQC } from '../../../apis/TechnicalApi/TechnicalApi';
import { useNavigate } from 'react-router';

export default function TechnicalRFQ({ id, handleClose }) {
    const [formData, setFormData] = useState({
        qcdata: {},
        qc: [{
            name: '',
            totalcost: 0,
            applecation: [{
                stockid: '',
                price: '',
                quantity: '',
                description: '',
            }],
        }],
    });

    const [formErrorData, setFormErrorData] = useState({});
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            qcdata: file,
        }));
    };

    const handleInputChange = (event, qcaIndex, appIndex) => {
        const { name, value } = event.target;
        const updatedQc = [...formData.qc];

        if (appIndex !== undefined) {
            updatedQc[qcaIndex].applecation[appIndex][name] = value;
            if (name === 'price' || name === 'quantity') {
                const totalCost = updatedQc[qcaIndex].applecation.reduce((total, app) => {
                    const price = parseFloat(app.price || 0);
                    const quantity = parseFloat(app.quantity || 0);
                    return total + (price * quantity);
                }, 0);
                updatedQc[qcaIndex].totalcost = totalCost;
            }
        } else {
            updatedQc[qcaIndex][name] = value;
        }

        setFormData((prevData) => ({
            ...prevData,
            qc: updatedQc,
        }));
    };

    const handleAddQcapplecation = () => {
        setFormData((prevData) => ({
            ...prevData,
            qc: [
                ...prevData.qc,
                {
                    name: '',
                    totalcost: 0,
                    applecation: [{
                        stockid: '',
                        price: '',
                        quantity: '',
                        description: '',
                    }],
                },
            ],
        }));
    };

    const handleRemoveQcapplecation = (qcaIndex) => {
        const updatedQc = [...formData.qc];
        updatedQc.splice(qcaIndex, 1);
        setFormData((prevData) => ({
            ...prevData,
            qc: updatedQc,
        }));
    };

    const handleAddApplecation = (qcaIndex) => {
        const updatedQc = [...formData.qc];
        updatedQc[qcaIndex].applecation.push({
            stockid: '',
            price: '',
            quantity: '',
            description: '',
        });

        setFormData((prevData) => ({
            ...prevData,
            qc: updatedQc,
        }));
    };

    const handleRemoveApplecation = (qcaIndex, appIndex) => {
        const updatedQc = [...formData.qc];
        updatedQc[qcaIndex].applecation.splice(appIndex, 1);
        const totalCost = updatedQc[qcaIndex].applecation.reduce((total, app) => {
            const price = parseFloat(app.price || 0);
            const quantity = parseFloat(app.quantity || 0);
            return total + (price * quantity);
        }, 0);
        updatedQc[qcaIndex].totalcost = totalCost;

        setFormData((prevData) => ({
            ...prevData,
            qc: updatedQc,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = {};
        let hasError = false;

        formData.qc.forEach((qcaItem, qcaIndex) => {
            if (!qcaItem.name.trim()) {
                errors[`name${qcaIndex}`] = 'Name is required';
                hasError = true;
            }

            qcaItem.applecation.forEach((appItem, appIndex) => {
                if (!appItem.stockid.trim()) {
                    errors[`stockid${qcaIndex}-${appIndex}`] = 'Stock ID is required';
                    hasError = true;
                }
                if (!appItem.price.trim()) {
                    errors[`price${qcaIndex}-${appIndex}`] = 'Price is required';
                    hasError = true;
                }
                if (!appItem.quantity.trim()) {
                    errors[`quantity${qcaIndex}-${appIndex}`] = 'Quantity is required';
                    hasError = true;
                }
                if (!appItem.description.trim()) {
                    errors[`description${qcaIndex}-${appIndex}`] = 'Description is required';
                    hasError = true;
                }
            });
        });

        if (!formData.qcdata) {
            errors.qcdata = 'The qcdata is required';
            hasError = true;
        }

        if (hasError) {
            setFormErrorData(errors);
        } else {
            setFormErrorData({});
            SendQC(id, formData).then((res) => {
                if (res.status < 202) {
                    handleClose();
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="outlined" onClick={handleAddQcapplecation}>
                    Add QC Application
                </Button>
            </Box>
            {formData.qc.map((qcaItem, qcaIndex) => (
                <Box key={qcaIndex} mb={4}>
                    <Typography variant="h6">QC Application {qcaIndex + 1}</Typography>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <TextField
                            label="Name"
                            name="name"
                            value={qcaItem.name}
                            onChange={(e) => handleInputChange(e, qcaIndex)}
                            error={!!formErrorData[`name${qcaIndex}`]}
                            helperText={formErrorData[`name${qcaIndex}`]}
                            fullWidth
                            margin="normal"
                        />
                        <Typography variant="h6">Total Cost: {qcaItem.totalcost}</Typography>
                        <IconButton onClick={() => handleRemoveQcapplecation(qcaIndex)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    <List>
                        <TransitionGroup>
                            {qcaItem.applecation.map((appItem, appIndex) => (
                                <Collapse key={appIndex}>
                                    <ListItem>
                                        <Box display="flex" flexDirection="column" flex={1}>
                                            <TextField
                                                label="Stock ID"
                                                name="stockid"
                                                value={appItem.stockid}
                                                onChange={(e) => handleInputChange(e, qcaIndex, appIndex)}
                                                error={!!formErrorData[`stockid${qcaIndex}-${appIndex}`]}
                                                helperText={formErrorData[`stockid${qcaIndex}-${appIndex}`]}
                                                margin="normal"
                                            />
                                            <TextField
                                                label="Unit Rate"
                                                name="price"
                                                type="number"
                                                value={appItem.price}
                                                onChange={(e) => handleInputChange(e, qcaIndex, appIndex)}
                                                error={!!formErrorData[`price${qcaIndex}-${appIndex}`]}
                                                helperText={formErrorData[`price${qcaIndex}-${appIndex}`]}
                                                margin="normal"
                                            />
                                            <TextField
                                                label="Quantity"
                                                name="quantity"
                                                type="number"
                                                value={appItem.quantity}
                                                onChange={(e) => handleInputChange(e, qcaIndex, appIndex)}
                                                error={!!formErrorData[`quantity${qcaIndex}-${appIndex}`]}
                                                helperText={formErrorData[`quantity${qcaIndex}-${appIndex}`]}
                                                margin="normal"
                                            />
                                            <TextField
                                                label="Description"
                                                name="description"
                                                value={appItem.description}
                                                onChange={(e) => handleInputChange(e, qcaIndex, appIndex)}
                                                error={!!formErrorData[`description${qcaIndex}-${appIndex}`]}
                                                helperText={formErrorData[`description${qcaIndex}-${appIndex}`]}
                                                margin="normal"
                                            />
                                        </Box>
                                        <IconButton onClick={() => handleRemoveApplecation(qcaIndex, appIndex)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItem>
                                </Collapse>
                            ))}
                        </TransitionGroup>
                    </List>
                    <Box display="flex" justifyContent="flex-end" mb={2}>
                        <Button variant="outlined" onClick={() => handleAddApplecation(qcaIndex)}>
                            Add Item
                        </Button>
                    </Box>
                </Box>
            ))}
            <Box mb={4}>
                <Typography variant="subtitle1">QS Data (optional)</Typography>
                <input
                    type="file"
                    name="qcdata"
                    onChange={handleFileChange}
                />
                {formErrorData.qcdata && (
                    <Typography color="error">{formErrorData.qcdata}</Typography>
                )}
            </Box>
            <Box display="flex" justifyContent="flex-end">
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </Box>
        </Box>
    );
}
