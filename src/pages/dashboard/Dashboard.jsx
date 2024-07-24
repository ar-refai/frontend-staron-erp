import React from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import TagIcon from '@mui/icons-material/Tag';
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StateBox";
import ProgressCircle from "../../components/ProgressCircle";
import { mockTransactions } from "../../data/mockData";
import IMAGE from '../../assets/light-logo.png';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const user = JSON.parse(localStorage.getItem('staron_user'));
    // const navigate = useNavigate();
    // If the user is not authenticated or authorized, redirect to the login page
    // if (!(user.department === 'admin')) 
    //     return navigate('/');

    return (

        <>
            <Box
                sx={{
                    backgroundColor: colors.primary[400],
                    padding: '12px 40px',
                    margin: '20px ',
                    borderRadius: '10px',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <TagIcon sx={{ color: colors.redAccent[500], fontSize: '40px' }} />
                    <Typography
                        variant="h2"
                        sx={{
                            color: colors.primary[200],
                            marginLeft: '10px',
                            padding: '10px 12px',
                        }}
                    >
                        Dashboard
                        <Typography variant="h3"
                        sx={{
                            color: colors.primary[200],
                            display: 'inline'
                        }}>: Welcome, {user?.name}</Typography>

                    </Typography>
                </Box>
            </Box>
            <Box m="20px">
    

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"

      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: '10px',
            transition:"all ease .2s",
            "&:hover": {
              transform: 'scale(1.05)'
            }
          }}
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: '10px',
            transition:"all ease .2s",
            "&:hover": {
              transform: 'scale(1.05)'
            }
          }}
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: '10px',
            transition:"all ease .2s",
            "&:hover": {
              transform: 'scale(1.05)'
            }
          }}
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: '10px',
            transition:"all ease .2s",
            "&:hover": {
              transform: 'scale(1.05)'
            }
          }}  
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            borderRadius: '10px',
            transition:"all ease .2s",
            "&:hover": {
              transform: 'scale(1.05)'
            }
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
            
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          sx={{
            borderRadius: '10px',
            transition:"all ease .2s",
            "&:hover": {
              transform: 'scale(1.05)'
            }
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{
            borderRadius: '10px',
            transition:"all ease .2s",
            "&:hover": {
              transform: 'scale(1.05)'
            }
          }}
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{
            borderRadius: '10px',
            transition:"all ease .2s",
            "&:hover": {
              transform: 'scale(1.05)'
            }
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          sx={{
            borderRadius: '10px',
            transition:"all ease .2s",
            display: "flex",
              justifyContent: "center",
            alignItems: "center",
            "&:hover": {
              transform: 'scale(1.05)'
            }
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ 
              marginBottom: "15px",
              
            }}
          >
            <img src={IMAGE} alt="image" />
          </Typography>
          <Box height="200px">
          </Box>
        </Box>
      </Box>
    </Box>
        </>
    )
}

export default Dashboard