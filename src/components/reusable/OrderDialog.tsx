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
     <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {" "}
        <span>{data.type == "BUY" ? "Buy" : "Sell"}</span> Stocks
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1} mb={1}>
          <Typography variant="body2" color="textSecondary">
            Quantity
          </Typography>
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={!!error}
            helperText={error}
            inputProps={{ min: 1 }}
          />
           <Typography variant="body2" color="textSecondary">
            Total : { (Number(quantity) * data.currentPrice).toFixed(2)}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          disabled={!quantity || Number(quantity) <= 0}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
