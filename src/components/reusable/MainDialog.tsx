import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Chip,
} from "@mui/material";
interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: ({
    amount,
    type,
    mode,
  }: {
    amount: number;
    type: string;
    mode: string;
  }) => void;
  data: {
    type: string;
    currentAmount: number;
    role: string;
    fields: { key: string; label: string }[];
    modes?: string[];
  };
}

export default function OrderDialog({
  open,
  onClose,
  onConfirm,
  data,
}: OrderDialogProps) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string>("");
  const [mode, setMode] = useState("");

  const handleConfirm = () => {
    if (!Number(amount) || Number(amount) <= 0) {
      setError("Please enter a valid quantity greater than 0");
      return;
    }
    if (Number(amount) >= 100000) {
      setError("Cannot add more than 100000");
      return;
    }

    setError("");
    onConfirm({ amount: Number(amount), type: data.type, mode });
    onClose();
    setAmount("");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: "linear-gradient(145deg, #ffffff, #f5f8f6)",
          boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
          p: 1,
        },
      }}
    >
      {/* Title */}
      <DialogTitle
        sx={{
          fontWeight: 600,
          color: "#06402B",
          textAlign: "center",
          fontSize: "1.25rem",
        }}
      >
        {data.type}
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ mt: 1 }}>
        <Box display="flex" flexDirection="column" gap={2} mt={1} mb={2}>
          {data.fields
            ? data.fields.map((field) => (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary", fontWeight: 500 }}
                  >
                    {field.label}
                  </Typography>

                  <TextField
                    label={field.label}
                    type="number"
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    error={!!error}
                    helperText={error}
                    inputProps={{
                      min: 1,
                      style: {
                        fontSize: "0.95rem",
                        MozAppearance: "textfield",
                      },
                    }}
                    sx={{
                      "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "white",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#16a34a",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#666",
                        transform: "translate(14px, 14px) scale(1)", // Proper default placement
                      },
                      "& .MuiInputLabel-shrink": {
                        color: "#16a34a",
                        transform: "translate(14px, -9px) scale(0.8)", // Prevent half-cut issue
                      },
                    }}
                  />
                </>
              ))
            : null}
          {data.type === "BUY" || data.type === "SELL" ? (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Total:
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#16a34a",
                  fontWeight: 600,
                }}
              >
                {(Number(amount) * data.currentAmount).toFixed(2)}
              </Typography>
            </Box>
          ) : null}
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          gap={1.5}
          flexWrap="wrap"
          mt={1}
          mb={1}
        >
          {data.modes && data.type === "Add Balance"
            ? data.modes.map((option) => (
                <Chip
                  key={option}
                  label={option}
                  onClick={() => setMode(option)}
                  variant={mode === option ? "filled" : "outlined"}
                  sx={{
                    px: 1,
                    fontWeight: 500,
                    color: mode === option ? "white" : "#06402B",
                    backgroundColor:
                      mode === option ? "#16a34a" : "rgba(22,163,74,0.08)",
                    borderColor: mode === option ? "#16a34a" : "#cfd8dc",
                    "&:hover": {
                      backgroundColor:
                        mode === option ? "#138f48" : "rgba(22,163,74,0.15)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                />
              ))
            : null}
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "#ccc",
            color: "#333",
            "&:hover": {
              borderColor: "#aaa",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={!amount || Number(amount) <= 0}
          onClick={handleConfirm}
          sx={{
            textTransform: "none",
            backgroundColor: "#06402B",
            "&:hover": {
              backgroundColor: "#075c3d",
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
