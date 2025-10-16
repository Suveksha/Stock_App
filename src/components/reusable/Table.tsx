import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Paper,
  TablePagination,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useMemo, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";


function descendingComparator(a: { [x: string]: number; }, b: { [x: string]: number; }, orderBy: string) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}
function getComparator(order: string, orderBy: string) {
  return order === "desc"
    ? (a: { [x: string]: number; }, b: { [x: string]: number; }) => descendingComparator(a, b, orderBy)
    : (a: { [x: string]: number; }, b: { [x: string]: number; }) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any[], comparator: { (a: { [x: string]: number; }, b: { [x: string]: number; }): number; (arg0: any, arg1: any): any; }) {
  const stabilized = array.map((el, idx) => [el, idx]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}


const MainTable = ({ data }) => {
  const navigate = useNavigate();
  
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("company_name");
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [filterCompany, setFilterCompany] = useState("");
  const [filterPriceMin, setFilterPriceMin] = useState("");
  const [filterPriceMax, setFilterPriceMax] = useState("");
  const [filterPctMin, setFilterPctMin] = useState("");
  const [filterPctMax, setFilterPctMax] = useState("");

  // Handler for sort
  const handleRequestSort = (event: MouseEvent<HTMLAnchorElement, MouseEvent>, property: SetStateAction<string>) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handler for pagination
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const filteredSorted = useMemo(() => {
    let filtered = data;


    if (filterCompany) {
      const lower = filterCompany.toLowerCase();
      filtered = filtered.filter((s: { company_name: string; }) =>
        s.company_name.toLowerCase().includes(lower)
      );
    }
    
    if (filterPriceMin !== "") {
      filtered = filtered.filter((s: { current_price: number; }) => s.current_price >= +filterPriceMin);
    }
    if (filterPriceMax !== "") {
      filtered = filtered.filter((s: { current_price: number; }) => s.current_price <= +filterPriceMax);
    }

    if (filterPctMin !== "") {
      filtered = filtered.filter((s: { percent_change: number; }) => s.percent_change >= +filterPctMin);
    }
    if (filterPctMax !== "") {
      filtered = filtered.filter((s: { percent_change: number; }) => s.percent_change <= +filterPctMax);
    }

  
    const comparator = getComparator(order, orderBy);
    const sorted = stableSort(filtered, comparator);

    return sorted;
  }, [
    data,
    filterCompany,
    filterPriceMin,
    filterPriceMax,
    filterPctMin,
    filterPctMax,
    order,
    orderBy,
  ]);


  const paginated = useMemo(
    () =>
      filteredSorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredSorted, page, rowsPerPage]
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 3 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Stock Data
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <TextField
            label="Filter Company"
            size="small"
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
          />
          <TextField
            label="Min Price"
            size="small"
            type="number"
            value={filterPriceMin}
            onChange={(e) => setFilterPriceMin(e.target.value)}
          />
          <TextField
            label="Max Price"
            size="small"
            type="number"
            value={filterPriceMax}
            onChange={(e) => setFilterPriceMax(e.target.value)}
          />
          <TextField
            label="Min % Change"
            size="small"
            type="number"
            value={filterPctMin}
            onChange={(e) => setFilterPctMin(e.target.value)}
          />
          <TextField
            label="Max % Change"
            size="small"
            type="number"
            value={filterPctMax}
            onChange={(e) => setFilterPctMax(e.target.value)}
          />
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="stock table">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === "company_name" ? order : false}>
                <TableSortLabel
                  active={orderBy === "company_name"}
                  direction={orderBy === "company_name" ? order : "asc"}
                  onClick={(e) => handleRequestSort(e, "company_name")}
                >
                  Company Name
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "current_price" ? order : false} align="right">
                <TableSortLabel
                  active={orderBy === "current_price"}
                  direction={orderBy === "current_price" ? order : "asc"}
                  onClick={(e) => handleRequestSort(e, "current_price")}
                >
                  Current Price
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "percent_change" ? order : false} align="right">
                <TableSortLabel
                  active={orderBy === "percent_change"}
                  direction={orderBy === "percent_change" ? order : "asc"}
                  onClick={(e) => handleRequestSort(e, "percent_change")}
                >
                  % Change
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((row, idx) => (
              <TableRow key={idx} hover>
                <TableCell component="th" scope="row" onClick={()=>navigate(`/stock/${row.symbol}`)}>
                  {row.company_name}
                </TableCell>
                <TableCell align="right">
                  ₹{row.current_price.toFixed(2)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color:
                      row.percent_change > 0
                        ? "success.main"
                        : row.percent_change < 0
                        ? "error.main"
                        : "text.primary",
                    fontWeight: 500,
                  }}
                >
                  {row.percent_change > 0 ? "+" : ""}
                  {row.percent_change}%
                </TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredSorted.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default MainTable;
