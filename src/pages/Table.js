import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
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
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import { visuallyHidden } from "@mui/utils";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DoneOutlineSharpIcon from "@mui/icons-material/DoneOutline";
import ErrorOutlineSharp from "@mui/icons-material/ErrorOutlineSharp";

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
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "S.no",
  },
  {
    id: "Client Id",
    numeric: true,
    disablePadding: false,
    label: "Client Id",
  },

  {
    id: "Name",
    numeric: true,
    disablePadding: false,
    label: "Client Name",
  },
  {
    id: "Email Id",
    numeric: true,
    disablePadding: false,
    label: "Email Id",
    align: "left",
  },
  {
    id: "Phone Number",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "Brand Name",
    numeric: true,
    disablePadding: false,
    label: "Brand",
  },
  {
    id: "Status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "Validation",
    numeric: true,
    disablePadding: false,
    label: "Verify",
  },
  {
    id: "Store Info",
    numeric: true,
    disablePadding: false,
    label: "More",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontWeight: "bold", fontSize: "20px" }}
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
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Clients Selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          style={{ fontWeight: "bold", fontSize: "23px" }}
        >
          Client Management
        </Typography>
      )}
      <div style={{ marginTop: "-23px" }}>
        <TextField
          label="Search"
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DownloadForOfflineSharpIcon
              fontSize="large"
              style={{ color: "#ec9454" }}
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Download File">
          <IconButton>
            <DownloadForOfflineSharpIcon
              fontSize="large"
              style={{ color: "#ec9454" }}
            />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://617bb8b2d842cf001711c00a.mockapi.io/admin`)
      .then((response) => {
        console.log(response.data);
        setAPIData(response.data);
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = APIData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
// eslint-disable-next-line
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - APIData.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={APIData.length}
            />
            <TableBody>
              {stableSort(APIData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell
                        onClick={(event) => handleClick(event, row.name)}
                        padding="checkbox"
                        style={{ borderColor: "#ec9454" }}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                        style={{ borderColor: "#ec9454", fontSize: "18px" }}
                      >
                        {row.serialNumber}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ borderColor: "#ec9454", fontSize: "18px" }}
                      >
                        {row.clientId}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ borderColor: "#ec9454", fontSize: "18px" }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderColor: "#ec9454", fontSize: "16px" }}
                      >
                        {row.emailId}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderColor: "#ec9454", fontSize: "18px" }}
                      >
                        {row.phoneNumber}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ borderColor: "#ec9454", fontSize: "18px" }}
                      >
                        {row.brand}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ borderColor: "#ec9454", fontSize: "18px" }}
                      >
                        {row.status}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ borderColor: "#ec9454" }}
                      >
                        <IconButton
                          aria-label="delete"
                          fontSize="large"
                          color="success"
                        >
                          <DoneOutlineSharpIcon />
                        </IconButton>

                        <IconButton
                          aria-label="delete"
                          fontSize="large"
                          color="error"
                        >
                          <ErrorOutlineSharp />
                        </IconButton>
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ borderColor: "#ec9454" }}
                      >
                        <IconButton aria-label="delete">
                          <EditIcon
                            aria-label="delete"
                            fontSize="medium"
                            color="warning"
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={APIData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} style={{color: "#ec9454"}}/>}
        label="Shrink Table"
        
      /> */}
    </Box>
  );
}
