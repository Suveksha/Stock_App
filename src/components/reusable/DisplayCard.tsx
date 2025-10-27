import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";

type DisplayProps = {
  title: string;
  type: string;
  data: {
    net_change: string;
    price: string;
    percentChange: string;
    status: string;
    current_price: string;
    change: string;
    title: string;
    desc: string;
    image?: string;
    company_name: string;
    percent_change: string;
    symbol: string;
  }[];
};

export default function DisplayCard({ title, type, data }: DisplayProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 5, px: { xs: 2, sm: 3, md: 5 } }}>
      {title && (
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          color="#06402B"
          textAlign={{ xs: "center", sm: "left" }}
        >
          {title}
        </Typography>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {data.slice(0, 3).map((item, i) =>
          i < 5 ? (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onClick={() => navigate("/stock/" + item?.symbol)}
              style={{ cursor: "pointer" }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  backgroundColor: type === "gain" ? "#F6FFF8" : "#FFF5F5",
                  border:
                    type === "gain"
                      ? "1.5px solid #0cba7a"
                      : "1.5px solid #BF0A30",
                  height: "100%",
                  width: "100%",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="#06402B"
                    >
                      {item.company_name}
                    </Typography>

                    {item?.image && (
                      <img
                        src={item.image}
                        alt="company"
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={3}
                  >
                    <Typography variant="h6" fontWeight="bold" color="#222021">
                      ₹{item.current_price}
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{
                        color: type === "gain" ? "#0cba7a" : "#BF0A30",
                      }}
                    >
                      {type === "gain"
                        ? `+${item?.net_change} (${item?.percent_change}%)`
                        : `${item?.net_change} (${item?.percent_change}%)`}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              style={{ display: "flex", justifyContent: "center" }}
              onClick={() => console.log("View more clicked")}
            >
              <Card
                sx={{
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 200,
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <ArrowForwardIcon
                  sx={{
                    fontSize: 50,
                    color: type === "gain" ? "#0cba7a" : "#BF0A30",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                    color: type === "gain" ? "#0cba7a" : "#BF0A30",
                  }}
                >
                  More
                </Typography>
              </Card>
            </motion.div>
          )
        )}
      </Box>
    </Box>
  );
}
