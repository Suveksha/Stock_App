import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { Card, CardContent, Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const sliderRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimeout(() => {
      sliderRef.current?.innerSlider?.onWindowResized?.();
    }, 300);
  }, []);

  const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 960, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }, // ✅ one slide for tablets/smaller
      { breakpoint: 480, settings: { slidesToShow: 1 } }, // ✅ one slide for phones
    ],
  };

  if (!isClient) return null;

  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        py: 3,
        px: { xs: 1.5, sm: 2, md: 4 },
        overflow: "hidden",
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {data.map((item, i) => (
          <Box key={i} px={{ xs: 0.5, sm: 1 }}>
            <Card
              sx={{
                borderRadius: 3,
                background:
                  item.current_status === "gain"
                    ? "linear-gradient(135deg, #06402B, #0cba7a)"
                    : "linear-gradient(135deg, #3b0a0a, #BF0A30)",
                color: "white",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                height: "100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.3)",
                },
              }}
            >
              <CardContent sx={{ lineHeight: 1.8, p: { xs: 2, sm: 3 } }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    mb: 1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </Typography>

                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      opacity: 0.9,
                    }}
                  >
                    ₹ {item.current_value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      color:
                        item.current_status === "gain" ? "#B7E4C7" : "#FFB3B3",
                    }}
                  >
                    {item.current_status === "gain"
                      ? `+${item.net_change} (${item.percent_change}%)`
                      : `${item.net_change} (${item.percent_change}%)`}
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
