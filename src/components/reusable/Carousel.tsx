import Slider from "react-slick";
import { Card, CardContent, Box, Typography } from "@mui/material";

type CarouselProps = {
  data: {
    net_change: string;
    current_status: string;
    current_value: string;
    title: string;
    desc: string;
    image?: string;
    company_name: string;
    percent_change: string;
  }[];
};
const CarouselComponent = ({ data }: CarouselProps) => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ width: "100%", mx: "auto" }}>
      <Slider {...settings}>
        {data.map((item, i) => (
          <Box key={i} px={2}>
            <Card
              sx={{
                borderRadius: 3,
                backgroundColor: "#06402B",
                color: "white",
                boxShadow: "0 4px 3px rgba(0,0,0,0.25)",
              }}
            >
              <CardContent sx={{ lineHeight: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.title}
                </Typography>

                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="body2">
                    ₹{" " + item?.current_value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        item.current_status === "gain" ? "lightgreen" : "red",
                    }}
                  >
                    {item.current_status === "gain"
                      ? `+${item?.net_change} (${item?.percent_change}%)`
                      : `${item?.net_change} (${item?.percent_change}%)`}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselComponent;
