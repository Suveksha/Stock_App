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
  onConfirm: ({amount, mode}:{amount:number, mode:string}) => void;
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
    onConfirm({amount:Number(amount), mode});
    onClose();
    setAmount("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        {" "}
        <span>{data.type == "add" ? "Add" : "Withdraw"}</span> Balance
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1} mb={1}>
          <Typography variant="body2" color="textSecondary">
            Amount
          </Typography>
          <TextField
            label="Amount (₹)"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            error={!!error}
            helperText={error}
            inputProps={{ min: 1 }}
          />
        </Box>
        <Chip
          label="UPI"
          sx={{
            "&:focus": {
              backgroundColor: "#c7ea46",
              fontColor: "white",
            },
          }}
          onClick={() => setMode("UPI")}
        />
        <Chip label="Net Banking" sx={{
            "&:focus": {
              backgroundColor: "#c7ea46",
              fontColor: "white",
            },
          }}
          onClick={()=>setMode("Net Banking")}/>
        <Chip label="Card" 
        sx={{
            "&:focus": {
              backgroundColor: "#c7ea46",
              fontColor: "white",
            },
          }}
          onClick={()=>setMode("Card")}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          disabled={!amount || Number(amount) <= 0}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
