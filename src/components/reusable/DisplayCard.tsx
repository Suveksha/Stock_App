import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
    <Box sx={{ width: "100%", mx: "auto", mt:4 }}>
      {title && (
        <Typography variant="h4" fontWeight="semibold" mb={2} color="#222021">
          {title}
        </Typography>
      )}

      <Box sx={{ display: "flex" }}>
        {data.slice(0, 3).map((item, i) => (
          <Box key={i} px={2}>
            {i < 5 ? (
              <Card
                onClick={() => navigate("/stock/" + item?.symbol)}
                sx={{
                  borderRadius: 3,
                  backgroundColor: type === "gain" ? "#F0FFF0" : "white",
                  border:
                    type === "gain"
                      ? "1.5px solid #06402B"
                      : "1.5px solid #BF0A30",
                  height: "200px",
                  width: "400px",
                  cursor: "pointer",
                  boxShadow: "0 4px 5px rgba(0,0,0,0.25)",
                }}
              >
                <CardContent>
                  <Typography variant="h6" color="#222021">
                    {item.company_name}
                  </Typography>
                  <div>
                    <img
                      src={item?.image}
                      alt="company"
                      className="w-[50px] h-[50px]"
                    />
                  </div>
                  <div className="flex justify-between m-5">
                    <Typography fontWeight={"bold"} variant="subtitle1" color="#222021">
                      ₹{item.current_price}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      
                      sx={{
                        color: type === "gain" ? "green" : "red",
                      }}
                    >
                      {type === "gain"
                        ? `+${item?.net_change} (${item?.percent_change}%)`
                        : `${item?.net_change} (${item?.percent_change}%)`}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card
                sx={{
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  height: "200px",
                  width: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                onClick={() => console.log("View more clicked")}
              >
                <ArrowForwardIcon
                  sx={{
                    fontSize: 50,
                    color: type === "gain" ? "green" : "red",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                    color: type === "gain" ? "green" : "red",
                  }}
                >
                  More
                </Typography>
              </Card>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
