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
interface WalletDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: ({ amount, mode }: { amount: number; mode: string }) => void;
  data: {
    type: string;
    currentBalance: number;
  };
}

export default function WalletDialog({
  open,
  onClose,
  onConfirm,
  data,
}: WalletDialogProps) {
  const [amount, setAmount] = useState<number | "">("");
  const [error, setError] = useState<string>("");
  const [mode, setMode] = useState("");

  const handleConfirm = () => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }
    setError("");
    onConfirm({ amount: Number(amount), mode });
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
        {data.type === "add" ? "Add" : "Withdraw"} Balance
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ mt: 1 }}>
        {/* Amount Input */}
        <Box display="flex" flexDirection="column" gap={1.5} mb={3}>
          <Typography
            variant="subtitle2"
            sx={{ color: "text.secondary", fontWeight: 500 }}
          >
            Enter Amount
          </Typography>
          <TextField
            label="Amount (₹)"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            error={!!error}
            helperText={error}
            inputProps={{
              min: 1,
              style: { fontSize: "0.95rem", MozAppearance: "textfield" },
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
        </Box>

        {/* Mode Selection */}
        <Box
          display="flex"
          justifyContent="center"
          gap={1.5}
          flexWrap="wrap"
          mt={1}
        >
          {["UPI", "Net Banking", "Card"].map((option) => (
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
          ))}
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
