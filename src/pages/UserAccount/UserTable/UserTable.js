import * as React from "react";
import PropTypes from "prop-types";
import { ERROR_CODE } from "../../../constants/errorCode";
// import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { convertUnixToTime } from "../../../utils/util";
import { PATH } from "../../../constants/path";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constants/const";
import { GetUserList } from "../../../apis/user";
import LockIcon from "@mui/icons-material/Lock";
import { BanUserById } from "../../../apis/user";
import SimpleSnackbar from "../../../components/SnackBar/SnackBar";
import { Fragment } from "react";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#e1e1e1",
    },
  },
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "username",
    numeric: false,
    disablePadding: true,
    label: "Username",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Full Name",
  },
  {
    id: "code",
    numeric: false,
    disablePadding: false,
    label: "Code",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created At",
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    // rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        User Accounts
      </Typography>
    </Toolbar>
  );
};

export default function UserTable({ data }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState(data);
  const path = PATH.USER_DETAIL.split(":id")[0];
  const [searchVal, setSearchValue] = React.useState("");
  const navigate = useNavigate();
  const [openSnackBar,setOpenSnackBar]=React.useState(false);
  const [message,setMessage]=React.useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const requestSearch = (e) => {
    const searchedVal = e.target.value;
    setSearchValue(searchedVal);
    // const filteredRows = data.filter((row) => {
    //   return (
    //     row.name.toLowerCase().includes(searchedVal.toLowerCase()) ||
    //     row.email.toLowerCase().includes(searchedVal.toLowerCase())
    //   );
    // });
    // setRows(filteredRows);
  };
  const handleRequestSearch = () => {
    GetUserList(searchVal).then((res) => {
      if (res.status === 1) {
        if (res.data.length !== 0) {
          setRows(res.data);
        }
      }
    });
    // const filteredRows = data.filter((row) => {
    //   return (
    //     row.name.toLowerCase().includes(searchVal.toLowerCase()) ||
    //     row.email.toLowerCase().includes(searchVal.toLowerCase())
    //   );
    // });
    // setRows(filteredRows);
  };
  const searchKey = (e) => {
    if (e.keyCode === 13) {
      handleRequestSearch();
      e.preventDefault();
    }
    // const filteredRows = data.filter((row) => {
    //   return (
    //     row.name.toLowerCase().includes(searchVal.toLowerCase()) ||
    //     row.email.toLowerCase().includes(searchVal.toLowerCase())
    //   );
    // });
    // setRows(filteredRows);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const setRowsById=(id)=>{
     console.log(id);
      rows.forEach(element => {
        if(element.id===id){
          element.enabled=false;
        }
        
      });
      setRows(rows);
    }
  return (
    <Fragment>
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "97%", p: 2, backgroundColor: "secondary.main" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              onChange={(e) => requestSearch(e)}
              onKeyDown={(e) => searchKey(e)}
            />
            <IconButton
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleRequestSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "96%", mb: 2, mt: 2, px: 3 }}>
            <EnhancedTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            <Link
                              to={path + row.id}
                              style={{ textDecoration: "none" }}
                            >
                              <Box sx={{ display: "flex" }}>
                                <Avatar alt={row.username} src={row.avatar} />
                                <Typography sx={{ py: 1, ml: 2 }}>
                                  {row.username}
                                </Typography>
                              </Box>
                            </Link>
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.code}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">
                            {convertUnixToTime(row.createdAt)}
                          </TableCell>
                          <TableCell align="left" sx={{ display: "flex" }}>
                            <IconButton
                              key={row.id}
                              aria-label="see"
                              onClick={() => {
                                navigate(path + row.id);
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                            {row.enabled ===false? (
                              <IconButton
                              aria-label="lock"
                              disabled
                            >
                              <LockIcon />
                            </IconButton>
                            ) : (
                              <IconButton
                                aria-label="lock"
                                onClick={() => {
                                  BanUserById(row.id).then((res)=>{
                                    console.log(res)
                                    if(res.status===1){
                                      setRowsById(res.data.id);
                                      setMessage("Banned successfully")
                                      setOpenSnackBar(true);
                                    }
                                    else{
                                      setMessage(ERROR_CODE[res.code]);
                                      setOpenSnackBar(true);
                                    }
                                  }).catch(()=>{
                                    setMessage("Banned failed");
                                    setOpenSnackBar(true);}
                                  );
                                }}
                              >
                                <LockIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 33 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
    {openSnackBar?<SimpleSnackbar message={message} onClose={()=>setOpenSnackBar(false)}/>:""}
    </Fragment>

  );
}
