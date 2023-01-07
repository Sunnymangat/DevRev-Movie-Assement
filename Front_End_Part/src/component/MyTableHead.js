import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from '@mui/material/TableSortLabel';
import { blue } from "@mui/material/colors";
import { visuallyHidden } from '@mui/utils';
import { headCells } from '../computations/headCells';

const MyTableHead = (props) => {

  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (

    <TableHead sx={{ backgroundColor: "#283E4C" }}>
      <TableRow>

        <TableCell padding="checkbox">

          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all sl_no",
            }}
            sx={{
              visibility:(props.userData!==null&&props.userData.user_type==="admin")?"visible":"hidden",
              color: "white",
              "&.Mui-checked": {
                color: blue[400],
              },
            }}
          />

        </TableCell>

        {
        headCells.map((headCell) => (
          
          <TableCell key={headCell.id} sx={{ color: "white" }} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{color:'white'}}
            >
            
            {headCell.label}
            
            {
              orderBy === headCell.id 
              ? 
              (
                <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) 
              :
              null
            }
            </TableSortLabel>

          </TableCell>

        ))}

      </TableRow>
    </TableHead>
  );
}

MyTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default MyTableHead;