import React from 'react'
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from '@mui/material/TableSortLabel';
import {headCells} from '../computations/headCells';


function MyTableHead() {
 

  return (
    <TableHead sx={{ backgroundColor: "#283E4C" }}>
      <TableRow>

        <TableCell padding="checkbox">
          <Checkbox sx={{visibility:"hidden"}}/>
        </TableCell>
        
        {
        headCells.map((headCell) => (

          <TableCell key={headCell.id} sx={{ color: "white" }}>
            
            <TableSortLabel sx={{color:'white'}}>
              {headCell.label}
            </TableSortLabel>

          </TableCell>
          
        ))
        }

      </TableRow>
    </TableHead>
  );

}

const IllusionTable = () => {
  return (
    <Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle"> 
      <MyTableHead/>
      </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5,10,25]}
          component="div"
          count={0}
          rowsPerPage={5}
          page={0}
          onPageChange={()=>0}
          onRowsPerPageChange={()=>1}
          sx={{ background: "#283E4C", color: "white" }}
        />
      </Paper>
      </Box>
  )
}

export default IllusionTable;