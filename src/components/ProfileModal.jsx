import React from 'react';
import { Dialog, DialogContent, IconButton, Typography } from '@mui/material';
import { AccountCircle, Edit, Visibility } from '@mui/icons-material';

const ProfileModal = ({ open, onClose, employee }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent sx={{ padding: '2rem', maxWidth: '360px' }}>
                <div className="banner">
                    <IconButton sx={{ backgroundColor: '#fff', width: '8rem', height: '8rem', boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.3)', borderRadius: '50%', transform: 'translateY(50%)', transition: 'transform 200ms cubic-bezier(0.18, 0.89, 0.32, 1.28)' }}>
                        <AccountCircle sx={{ width: '100%', height: '100%', color: '#404040' }} />
                    </IconButton>
                </div>
                <Typography variant="h5" sx={{ textAlign: 'center', marginTop: '1rem', marginBottom: '0.5rem' }}>{employee.name}</Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: '#a0a0a0', marginBottom: '1.2rem' }}>{employee.title}</Typography>
                <div className="actions">
                    <div className="follow-info">
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <Typography variant="h6"><span>12</span><small>Followers</small></Typography>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <Typography variant="h6"><span>1000</span><small>Following</small></Typography>
                        </div>
                    </div>
                    <div className="follow-btn" style={{ marginTop: '1rem' }}>
                        <button>Follow</button>
                    </div>
                </div>
                <Typography variant="body1" sx={{ textAlign: 'justify', marginTop: '1.5rem' }}>{employee.description}</Typography>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileModal;
