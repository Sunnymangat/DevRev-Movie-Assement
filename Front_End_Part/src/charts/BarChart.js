import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Bar,Pie} from "react-chartjs-2"
import { useTheme } from '@mui/material/styles';
//eslint-disable-next-line
import {Chart as ChartJs} from "chart.js/auto"

const BarChart = ({open,data1,data2,close,setModal,setUserData}) => {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

  return (
  
  <Box>
    <Dialog fullScreen={fullScreen} open={open} onClose={close} aria-labelledby="responsive-dialog-title">
    <DialogTitle id="responsive-dialog-title" sx={{color:'white'}}>Analytics View</DialogTitle>
  
    <Box>
      <Bar data={data1} options={{
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 18
                    }
                },
            },
            title: {
              display: true,
              text: 'Bar Chart Analytics',
              font: {
                size: 18
            }
          }
        },
        scales: {
          x: {
              ticks: {
                  font: {
                      size: 16,
                  }
              }
          },
          y: {
            ticks: {
                font: {
                    size: 16,
                }
            }
        }
      }
        
        
    }}/>
  
    <Pie data={data2}  options={ {
      plugins: {
        legend: {
            labels: {
                font: {
                    size: 18
                }
            },
        },
        title: {
          display: true,
          text: 'Pie Chart Selected Currencies',
          font: {
            size: 18
        }
      }
    },
        layout: {
            padding: 50
        }
    }}/>

    <Box display="flex" alignItems="center" justifyContent="center" sx={{ml:1}}>
        <DialogActions>
        <Button sx={{color:'white',width:'25ch',mx:1,border:1}} onClick={()=>{setUserData([]);setModal("analyticsview")}}><Box>Back</Box></Button>         
        <Button sx={{color:'white',width:'25ch',mx:1,border:1}} onClick={()=>close()}><Box>Exit</Box></Button>
        </DialogActions>
    </Box>
    </Box>
    </Dialog>
  </Box>
  )
}

export default BarChart;