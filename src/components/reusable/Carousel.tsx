import Slider from "react-slick";
import { Card, CardContent, Typography, Box } from "@mui/material";


type CarouselProps = {
  title:string, data:{
    net_change: string;
    status: string;
    current_value: string;
    title:string;
    desc:string;
    image?:string;
    company_name:string;
    percent_change:string;
}[] 
}
const CarouselComponent=({title, data}:CarouselProps)=>{
  const settings={
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <Box sx={{ width: "90%", mx: "auto", mt: 5}}>
      {title && (
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {title}
        </Typography>
      )}

      <Slider {...settings}>
        {data.map((item, i) => (
          <Box key={i} px={2}>
            <Card sx={{ borderRadius: 3, backgroundColor: "#06402B", color: "white"}}>
              <CardContent sx={{lineHeight:2}}>
                 <div className="font-bold">{item.title}</div>
                 <div className="flex justify-between">
                  <div>{item?.current_value}</div>
                 <div className={item?.status==="gain"?"text-green-400":"text-red-400"}>{item?.status === 'gain' ? '+'+item?.net_change+'   ('+item?.percent_change+'%'+')'  : item?.net_change+'  ('+item?.percent_change+'%'+')'}</div>
                 </div>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default CarouselComponent;