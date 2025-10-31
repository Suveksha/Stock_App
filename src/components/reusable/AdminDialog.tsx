import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";

interface AdminDialogProps {
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  data: {
    company_name: string;
    price_at_order: number;
    order_type: string;
    quantity: number;
    total_cost: number;
    status: string;
  };
  title: string;
}

export default function AdminDialog({
  open,
  onClose,
  onApprove,
  onReject,
  data,
  title,
}: AdminDialogProps) {
  const totalAmount = data.quantity * data.price_at_order;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      {/* Title */}
      <DialogTitle
        sx={{ fontWeight: 600, textAlign: "center", color: "#06402B" }}
      >
        {title}
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ mt: 1 }}>
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={500} color="text.secondary">
              Company Name
            </Typography>
            <Typography fontWeight={600}>{data.company_name}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={500} color="text.secondary">
              Order Type:
            </Typography>
            <Typography fontWeight={600}>{data.order_type}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={500} color="text.secondary">
              Order Price:
            </Typography>
            <Typography fontWeight={600}>₹ {data.price_at_order}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={500} color="text.secondary">
              Quantity:
            </Typography>
            <Typography fontWeight={600}>{data.quantity}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography fontWeight={600} color="text.secondary">
              Total Amount:
            </Typography>
            <Typography fontWeight={700} color="#16a34a">
              ₹ {totalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      {/* Actions */}
      {data.status === "PENDING" && (
        <DialogActions sx={{ justifyContent: "center", pb: 2, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={onReject}
            sx={{
              textTransform: "none",
              borderColor: "#d32f2f",
              color: "#d32f2f",
              "&:hover": {
                borderColor: "#b71c1c",
                backgroundColor: "#ffebee",
              },
            }}
          >
            Reject
          </Button>

          <Button
            variant="contained"
            onClick={onApprove}
            sx={{
              textTransform: "none",
              backgroundColor: "#06402B",
              "&:hover": { backgroundColor: "#075c3d" },
            }}
          >
            Approve
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
