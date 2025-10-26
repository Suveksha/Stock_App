import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  title?: string;
}

export default function MainTable({
  tableHeaders,
  tableData,
  type,
  filterKeys = [],
  title
}: MainTableProps) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>(tableHeaders[0]?.id || "");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  // 🔹 Handle sorting
  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // 🔹 Handle filter change
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // 🔹 Compute filtered data
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

  // 🔹 Compute sorted data
  const sortedData = useMemo(() => {
    const data = [...filteredData];
    return data.sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      if (aValue == null || bValue == null) return 0;

      // Handle dates
      if (!isNaN(Date.parse(aValue)) && !isNaN(Date.parse(bValue))) {
        const aDate = new Date(aValue).getTime();
        const bDate = new Date(bValue).getTime();
        return order === "asc" ? aDate - bDate : bDate - aDate;
      }

      // Handle numbers
      if (!isNaN(aValue) && !isNaN(bValue)) {
        return order === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      // Handle strings
      return order === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredData, order, orderBy]);

  // 🔹 Pagination
  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  // 🔹 Filter options (unique values for each filter key)
  const filterOptions = useMemo(() => {
    const opts: Record<string, string[]> = {};
    filterKeys.forEach((key) => {
      opts[key] = Array.from(new Set(tableData.map((d) => String(d[key]))));
    });
    return opts;
  }, [filterKeys, tableData]);

  // 🔹 Helper: Capitalize label text
  const formatLabel = (text: string) =>
    text.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Paper
      sx={{
        padding: 3,
        borderRadius: 3,
        boxShadow: "0 4px 5px rgba(0,0,0,0.25)",
      }}
    >
      <Typography variant="h3" gutterBottom align="center">{title}</Typography>
      {/* Dynamic Filters */}
      {filterKeys.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
          {filterKeys.map((key) => (
            <FormControl
              key={key}
              sx={{
                minWidth: 250,
                "& .MuiInputLabel-root": {
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#6b7280", // gray by default
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: "0.875rem",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#16a34a", // green on focus
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#16a34a", // green when focused
                },
              }}
              size="small"
            >
              <InputLabel>{formatLabel(key)}</InputLabel>
              <Select
                value={filters[key] || ""}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                label={formatLabel(key)}
                sx={{
                  "& .MuiSelect-select": {
                    fontSize: "0.875rem",
                    color: "#06402B", // selected text color
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

          {/* Price range filters */}
          {"current_price" in (tableData[0] || {}) && (
            <>
              <TextField
                label="Min Price"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                size="small"
                sx={{
                  width: 120,
                  "& .MuiInputLabel-root": {
                    color: "#6b7280", // gray by default
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#16a34a", // green on focus
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    "& fieldset": {
                      borderColor: "#d1d5db", // gray outline
                    },
                    "&:hover fieldset": {
                      borderColor: "#16a34a", // green on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#16a34a", // green on focus
                    },
                  },
                  "& input": {
                    fontSize: "0.875rem",
                    color: "#06402B",
                    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                    "&[type=number]": {
                      MozAppearance: "textfield",
                    },
                  },
                }}
              />

              <TextField
                label="Max Price"
                type="number"
                value={maxPrice}
                size="small"
                onChange={(e) => setMaxPrice(e.target.value)}
                sx={{
                  width: 120,
                  "& .MuiInputLabel-root": {
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#16a34a",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                    "& fieldset": {
                      borderColor: "#d1d5db",
                    },
                    "&:hover fieldset": {
                      borderColor: "#16a34a",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#16a34a",
                    },
                  },
                  "& input": {
                    fontSize: "0.875rem",
                    color: "#06402B",
                    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button":
                      {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                    "&[type=number]": {
                      MozAppearance: "textfield",
                    },
                  },
                }}
              />
            </>
          )}
        </Box>
      )}

      {/* Table */}
      {sortedData.length === 0 ? (
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          sx={{ padding: 4 }}
        >
          No data found
        </Typography>
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 450, borderRadius: 2 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#06402B" }}>
                  {tableHeaders.map((col) => (
                    <TableCell
                      key={col.id}
                      sx={{
                        color: "white !important",
                        fontWeight: 600,
                        backgroundColor: "#06402B",
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
                    }}
                    onClick={() =>
                      type === "STOCK" && navigate(`/stock/${row.symbol}`)
                    }
                  >
                    {tableHeaders.map((col) => (
                      <TableCell key={col.id}>
                        {col.id.toLowerCase().includes("date")
                          ? new Date(row[col.id]).toLocaleString()
                          : String(row[col.id] ?? "-")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
          />
        </>
      )}
    </Paper>
  );
}
