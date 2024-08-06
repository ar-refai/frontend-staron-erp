import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  List,
  IconButton,
  Collapse,
} from '@mui/material';
import {ShowRequest} from 'apis/TechnicalApi/QuantitySurvayApi';
import { TransitionGroup } from 'react-transition-group';
import DeleteIcon from '@mui/icons-material/Delete';
import Lottie from 'lottie-react';
// Assuming you have Lottie animation JSON files
import Document from '../../../assets/lottie/document.json';
import Basket from '../../../assets/lottie/busket.json';
import Book from '../../../assets/lottie/book.json';
import { tokens } from 'theme';
import { useTheme } from '@emotion/react';



const QSModal = ({
  accceptedModalOpen,
  setAccceptModalOpen,
  user,
  totalCost,
  totalProjectSellingPrice,
  totalGrossMargin,
  applications,
  handleApplicationTitleChange,
  handleGrossMarginChange,
  handleAddItem,
  handleItemChange,
  handleRemoveItem,
  handleAddApplication,
  handleRemoveApplication,
  quotationObj,
  setQuotationObj,
  handleSubmitQSToComplete,
  selectedRow,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    console.log("**********");
    console.log(quotationObj);
    console.log("**********");
    // setApplicationsData(quotationObj.qc)
  }, [])
  
  // console.log(applications);
  // calculate numbers

  return (
    <Dialog
      maxWidth="lg"
      open={accceptedModalOpen}
      onClose={() => setAccceptModalOpen(false)}
    >
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
          <Lottie style={{ width: '40px', display: 'flex' }} animationData={Basket} />
          Quantity Survey Submit:
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ minWidth: '700px' }}>
        {/* The total cost */}
        {(user?.Supervisor === '1'||user?.Supervior == null)  && (
          <Stack spacing={2}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px'
              }}
            >
              <Typography variant="h6">Total Cost: EGP {totalCost}</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h6">Total Selling Price: EGP {totalProjectSellingPrice}</Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="h6">Total Gross Margin: % {totalGrossMargin}</Typography>
            </Box>
          </Stack>
        )}

        {/* Map through applications */}
        {applications.map((app, appIndex) => (
          <Box
            key={appIndex}
            mb={2}
            mt={2}
            sx={{
              background: colors.grey[800],
              padding: '20px',
              boxShadow: '2px 3px 5px rgba(0,0,0,0.6)',
              borderRadius: '20px'
            }}
          >
            {/* Application */}
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
              <Typography variant="h5" mt={2} sx={{ textTransform: 'uppercase' }}>
                Application {appIndex + 1}:
              </Typography>
            </Box>
            <Box>
              <TextField
                variant="filled"
                label="Application Title"
                defaultValue={app.name}
                onChange={(e) => handleApplicationTitleChange(appIndex, e)}
                fullWidth
                margin="normal"
              />
              {(user?.Supervisor === '1'||user?.Supervior == null)  && (
                <TextField
                  variant="filled"
                  label="Gross Margin (%)"
                  defaultValue={app.grossmargen}
                  fullWidth
                  type="number"
                  onChange={(e) => handleGrossMarginChange(appIndex, e.target.value)}
                  margin="normal"
                />
              )}
            </Box>

            <Button variant="outlined" color="secondary" onClick={() => handleAddItem(appIndex)}>
              Add Item
            </Button>
            <List>
              <TransitionGroup>
                {app.items.map((item, itemIndex) => (
                  <Collapse key={itemIndex}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      mt={2}
                      sx={{
                        background: colors.grey[800],
                        padding: '10px',
                        borderRadius: '10px',
                        boxShadow: '2px 3px 6px rgba(0,0,0,0.6)'
                      }}
                    >
                      <Typography variant="h5" mt={2} sx={{ textTransform: 'uppercase' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '10px',
                            textTransform: 'uppercase'
                          }}
                        >
                          <Lottie style={{ width: '30px', display: 'flex' }} animationData={Book} />
                          Item {itemIndex + 1}:
                        </Box>
                      </Typography>
                      <TextField
                        label="Stock Code"
                        variant="filled"
                        defaultValue={item.stockid}
                        onChange={(e) => handleItemChange(appIndex, itemIndex, 'stockid', e)}
                        fullWidth
                        margin="normal"
                      />

                      {(user?.Supervisor === '1'||user?.Supervior == null) && (
                        <TextField
                          label="Price"
                          variant="filled"
                          type="number"
                          defaultValue={item.price}
                          onChange={(e) => handleItemChange(appIndex, itemIndex, 'price', e)}
                          fullWidth
                          margin="normal"
                        />
                      )}

                      <TextField
                        label="Quantity"
                        variant="filled"
                        type="number"
                        defaultValue={item.quantity}
                        onChange={(e) => handleItemChange(appIndex, itemIndex, 'quantity', e)}
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Description"
                        variant="filled"
                        defaultValue={item.description}
                        onChange={(e) => handleItemChange(appIndex, itemIndex, 'description', e)}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                      />
                      <Box display="flex" justifyContent="flex-end" mt={1}>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          title="Delete Item"
                          onClick={() => handleRemoveItem(appIndex, itemIndex)}
                          sx={{ width: 'auto' }}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
            {applications.length > 1 && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveApplication(appIndex)}
                sx={{ mt: 2 }}
              >
                Remove Application
              </Button>
            )}
          </Box>
        ))}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleAddApplication}
          sx={{ mt: 2 }}
        >
          Add Application
        </Button>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={() => setAccceptModalOpen(false)} color="error" variant="outlined">
          Close
        </Button>
        <Button onClick={handleSubmitQSToComplete} color="secondary" variant="outlined">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QSModal;
