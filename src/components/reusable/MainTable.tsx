import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TableSortLabel,
  TablePagination,
  Typography,
  Box,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminDialog from "./AdminDialog";
import api from "../../api/api";

type Order = "asc" | "desc";

interface TableHeader {
  id: string;
  label: string;
}

interface TableData {
  [key: string]: any;
}

interface MainTableProps {
  tableHeaders: TableHeader[];
  tableData: TableData[];
  filterKeys?: string[];
  type?: string;
  title: string;
  role: string;
  admin_id?: string;
}

export default function MainTable({
  tableHeaders,
  tableData,
  type,
  filterKeys = [],
  title,
  role,
  admin_id,
}: MainTableProps) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>(tableHeaders[0]?.id || "");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [row, setRowData] = useState<any>({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleApprove = () => {
    console.log("APPROVE", admin_id);
    api
      .post("/order/accept", {
        order_id: row._id,
        user_id: row.user_id,
        admin_id,
      })
      .then((res: any) => {
        console.log("Response", res.data);
        setOpen(false);
      });
  };

  const handleReject = () => {
    console.log("REJECT");
    api
      .post("/order/reject", {
        order_id: row._id,
        user_id: row.user_id,
        admin_id,
      })
      .then((res: any) => {
        console.log("Response", res.data);
        setOpen(false);
      });
  };

  // Sorting
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filtered data
  const filteredData = useMemo(() => {
    return tableData.filter((row) => {
      const matchFilters = Object.entries(filters).every(([key, val]) =>
        !val ? true : String(row[key]) === val
      );
      const matchPrice =
        (!minPrice || row.current_price >= parseFloat(minPrice)) &&
        (!maxPrice || row.current_price <= parseFloat(maxPrice));
      return matchFilters && matchPrice;
    });
  }, [filters, minPrice, maxPrice, tableData]);

  // Sorted data
  const sortedData = useMemo(() => {
    const data = [...filteredData];
    return data.sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      if (aValue == null || bValue == null) return 0;

      // Dates
      if (!isNaN(Date.parse(aValue)) && !isNaN(Date.parse(bValue))) {
        const aDate = new Date(aValue).getTime();
        const bDate = new Date(bValue).getTime();
        return order === "asc" ? aDate - bDate : bDate - aDate;
      }

      // Numbers
      if (!isNaN(aValue) && !isNaN(bValue)) {
        return order === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      // Strings
      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredData, order, orderBy]);

  // Pagination
  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  // Filter options
  const filterOptions = useMemo(() => {
    const opts: Record<string, string[]> = {};
    filterKeys.forEach((key) => {
      opts[key] = Array.from(new Set(tableData.map((d) => String(d[key]))));
    });
    return opts;
  }, [filterKeys, tableData]);

  const formatLabel = (text: string) =>
    text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const changePage = (row: TableData) => {
    if (role == "user" && type === "STOCK") navigate(`/stock/${row.symbol}`);
    else if (role == "admin") {
      if (type === "ORDER") {
        setOpen(true);
        setRowData(row);
      }
    }
  };

  return (
    <>
      <Paper
        sx={{
          padding: { xs: 1.5, sm: 3 },
          borderRadius: 3,
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          width: "100%",
          overflowX: "auto",
        }}
      >
        {/* Title */}
        {title && (
          <Typography
            variant={isMobile ? "h6" : "h4"}
            gutterBottom
            align="center"
            sx={{ fontWeight: 600, mb: 2 }}
          >
            {title}
          </Typography>
        )}

        {/* Filters */}
        {/* Dynamic Filters */}
        {filterKeys.length > 0 && (
          <Box
            display="flex"
            flexWrap="wrap"
            gap={isMobile ? 1.5 : 2}
            mb={isMobile ? 1.5 : 3}
            alignItems="center"
            justifyContent={isMobile ? "center" : "flex-start"}
            sx={{
              width: "100%",
              px: { xs: 1, sm: 2 },
              overflowX: isMobile ? "auto" : "visible",
            }}
          >
            {filterKeys.map((key) => (
              <FormControl
                key={key}
                size="small"
                sx={{
                  minWidth: isMobile ? "45%" : 180,
                  flex: isMobile ? "1 1 45%" : "unset",
                  "& .MuiInputLabel-root": {
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: "#6b7280",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    fontSize: "0.8rem",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#16a34a",
                  },
                }}
              >
                <InputLabel>{formatLabel(key)}</InputLabel>
                <Select
                  value={filters[key] || ""}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                  label={formatLabel(key)}
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: "0.8rem",
                      color: "#06402B",
                    },
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  {filterOptions[key].map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}

            {/* Price Filters */}
            {"current_price" in (tableData[0] || {}) && (
              <Box
                display="flex"
                flexDirection={isMobile ? "row" : "row"}
                flexWrap="wrap"
                gap={isMobile ? 1 : 2}
                justifyContent={isMobile ? "center" : "flex-start"}
                width={isMobile ? "100%" : "auto"}
              >
                <TextField
                  label="Min"
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  size="small"
                  sx={{
                    width: isMobile ? "45%" : 100,
                    "& .MuiInputBase-input": {
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#16a34a",
                    },
                  }}
                />
                <TextField
                  label="Max"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  size="small"
                  sx={{
                    width: isMobile ? "45%" : 100,
                    "& .MuiInputBase-input": {
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#16a34a",
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        )}

        {/* Table */}
        <Box
          sx={{
            maxHeight: { xs: 400, sm: 500, md: 600 },
            overflowX: "auto",
            overflowY: "auto",
            borderRadius: 2,
            "&::-webkit-scrollbar": {
              height: 6,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#bdbdbd",
              borderRadius: 3,
            },
          }}
        >
          {sortedData.length === 0 ? (
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ py: 4 }}
            >
              No data found
            </Typography>
          ) : (
            <Table stickyHeader size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow>
                  {tableHeaders.map((col) => (
                    <TableCell
                      key={col.id}
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        backgroundColor: "#06402B",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        whiteSpace: "nowrap",
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === col.id}
                        direction={orderBy === col.id ? order : "asc"}
                        onClick={() => handleSort(col.id)}
                        sx={{
                          color: "white !important",
                          "& .MuiTableSortLabel-icon": {
                            color: "white !important",
                          },
                        }}
                      >
                        {col.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white",
                      "&:hover": { backgroundColor: "#e9f5ef" },
                      cursor: type === "STOCK" ? "pointer" : "default",
                    }}
                    onClick={() => changePage(row)}
                  >
                    {tableHeaders.map((col) => (
                      <TableCell
                        key={col.id}
                        sx={{
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          whiteSpace: "nowrap",
                        }}
                      >
                        {col.id.toLowerCase().includes("date")
                          ? new Date(row[col.id]).toLocaleString()
                          : String(row[col.id] ?? "-")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>

        {/* Pagination */}
        <Box display="flex" justifyContent="center">
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={sortedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            sx={{
              "& .MuiTablePagination-toolbar": {
                flexWrap: isMobile ? "wrap" : "nowrap",
                justifyContent: "center",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              },
            }}
          />
        </Box>
      </Paper>

      <AdminDialog
        open={open}
        onClose={() => setOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
        data={row}
        title={title}
      />
    </>
  );
}
