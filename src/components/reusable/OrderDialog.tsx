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
} from "@mui/material";
interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: ({quantity, type}:{quantity:number, type:string}) => void;
  data: {
    type: string;
    currentPrice: number;
  };
}

export default function OrderDialog({
  open,
  onClose,
  onConfirm,
  data,
}: OrderDialogProps) {

  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState<string>("");
  
   const handleConfirm = () => {
    if (!quantity) {
      setError("Please enter a valid quantity greater than 0");
      return;
    }
    setError("");
    onConfirm({quantity:Number(quantity), type:data.type});
    onClose();
    setQuantity("");
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
          color:  "#06402B" ,
          textAlign: "center",
          fontSize: "1.25rem",
        }}
      >
        {data.type === "BUY"? "Buy" : "Sell"} Stocks
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ mt: 1 }}>
        <Box display="flex" flexDirection="column" gap={2} mt={1} mb={2}>
          {/* Quantity Input */}
          <Typography
            variant="subtitle2"
            sx={{ color: "text.secondary", fontWeight: 500 }}
          >
            Enter Quantity
          </Typography>
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={!!error}
            helperText={error}
            inputProps={{
              min: 1,
              style: { fontSize: "0.95rem", MozAppearance: "textfield" },
            }}
            sx={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "white",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                     "#16a34a",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                transform: "translate(14px, 14px) scale(1)",
              },
              "& .MuiInputLabel-shrink": {
                color:  "#16a34a",
                transform: "translate(14px, -9px) scale(0.8)",
              },
            }}
          />

          {/* Total Amount */}
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
                color:  "#16a34a" ,
                fontWeight: 600,
              }}
            >
              ₹ {(Number(quantity) * data.currentPrice || 0).toFixed(2)}
            </Typography>
          </Box>
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
          disabled={!quantity || Number(quantity) <= 0}
          onClick={handleConfirm}
          sx={{
            textTransform: "none",
            backgroundColor:  "#06402B" ,
            "&:hover": {
              backgroundColor:
                 "#075c3d" ,
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
