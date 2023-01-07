import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import MyTableHead from './MyTableHead';
import { blue } from "@mui/material/colors";
import { formatDate } from "../computations/formatdate";
import { getComparator,stableSort } from '../computations/sorting';
import IllusionTable from "./IllusionTable";


const MyTableBody=({userData,setSelectedData,setRefresh })=> {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);

  const [selected, setSelected] = React.useState([]);
  const [pageData, setPageData] = React.useState([]);

  const [rowsCount, setRowsCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('movieName');


  useEffect(() => {
    
    const totalRows = async () => {
      await fetch("http://localhost:8080/MovieTicket/userid", {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => setRowsCount(res));
    };

    const firstTime = async () => {
      await fetch("http://localhost:8080/MovieTicket/userid", {
        method: "get",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          rowsPerPage: rowsPerPage,
          page: -1,
        },
      })
        .then((res) => res.json())
        .then((res) => setRows([...res]));
    };

    totalRows();
    firstTime();

    //eslint-disable-next-line
  }, [rowsPerPage]);


  const pageChangeToNext = async () => {
    
    await fetch("http://localhost:8080/MovieTicket/userid", {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        rowsPerPage: rowsPerPage,
        page: page,
      },
    }).then((res) => res.json()).then((res) => setRows([...rows, ...res]));

  };

  const handleSelectAllClick = (event) => {
    
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.movieName);
      setSelected(newSelecteds);
      setSelectedData(newSelecteds);
      return;
    }

    setSelected([]);
    setSelectedData([]);

  };

  const handleClick = (event, movieName) => {
    
    const selectedIndex = selected.indexOf(movieName);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, movieName);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    setSelectedData(newSelected);

  };

  const handleChangePage = (event, newPage) => {
    
    if (newPage > page) {
      
      const val = pageData.find((element) => element === newPage);
      
      if (val === undefined) {
        setPageData((pageData) => [...pageData, newPage]);
        pageChangeToNext();
      }
    }

    setPage(newPage);

  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    setPageData([]);
    setRows([]);
  };
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (movieName) => selected.indexOf(movieName) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
    <Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <MyTableHead
            userData={userData}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
            {
               stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.movieName);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.movieName)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.movieName}
                      selected={isItemSelected}
                      sx={{ backgroundColor: "#2C4250",height:'80px !important'}}
                    >

                      <TableCell padding="checkbox">
                        <Checkbox
                          sx={{
                            color: "white",
                            visibility:(userData!==null&&userData.user_type==="admin")?"visible":"hidden",
                            "&.Mui-checked": {
                              color: blue[400],
                            },
                          }}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ color: "white" }}>{row.movieName}</TableCell>
                      <TableCell sx={{ color: "white" }}>{formatDate(row.releaseDate)}</TableCell>
                      <TableCell sx={{ color: "white" }}>{row.movieType}</TableCell>
                      <TableCell sx={{ color: "white" }}>{row.movieDescription}</TableCell>
                      <TableCell sx={{ color: "white" }}>{row.theatreName}</TableCell>
                      <TableCell sx={{ color: "white" }}>{row.showTimings}</TableCell>
                      <TableCell sx={{ color: "white" }}>Booked</TableCell>
                    </TableRow>
                  );
                })}
              {
              emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={19} />
                </TableRow>
              )
              }
            </TableBody>
          </Table>
        </TableContainer>
       
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ background: "#283E4C", color: "white" }}
        />

      </Paper>
    </Box>
    </>
  );
}


const UserBookedTicketsTable = ({userData, setSelectedData, refresh, setRefresh }) => {
    useEffect(() => {
  
        if (refresh === true){
          const timer = setTimeout(() => {
            setRefresh(false);
            setSelectedData([]);
          }, 100);
    
          return () => clearTimeout(timer);
    
        }
    
        //eslint-disable-next-line
      }, [refresh]);
      
      return (
        <>
          {
            refresh === false ? 
              <MyTableBody userData={userData} setSelectedData={setSelectedData} setRefresh={setRefresh}/>
              : 
              <IllusionTable/>
          }
        </>
      );
}

export default UserBookedTicketsTable;