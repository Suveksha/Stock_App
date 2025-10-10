import Slider from "react-slick";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

type CarouselProps = {
  title:string, data:{
    net_change: string;
    price: string;
    percentChange: string;
    status: string;
    currentValue: string;
    change: string;
    title:string;
    desc:string;
    image?:string;
    company_name:string;
    percent_change:string;
}[], type:string 
}
const CarouselComponent=({title, data, type}:CarouselProps)=>{
   const navigate = useNavigate();
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
    <Box sx={{ width: "90%", mx: "auto", mt: 5 }}>
      {title && (
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {title}
        </Typography>
      )}

      <Slider {...settings}>
        {data.map((item, i) => (
          type=="index"?
          <Box key={i} px={2}>
            <Card sx={{ borderRadius: 3, backgroundColor: "#06402B", color: "white"}}>
              <CardContent sx={{lineHeight:2}}>
                 <div className="font-bold">{item.title}</div>
                 <div className="flex justify-between">
                  <div>{item?.currentValue}</div>
                 <div className={item?.status==="gain"?"text-green-400":"text-red-400"}>{item?.status === 'gain' ? '+'+item?.change+'   ('+item?.percentChange+'%'+')'  : item?.change+'  ('+item?.percentChange+'%'+')'}</div>
                 </div>
              </CardContent>
            </Card>
          </Box>
          :
          <Box key={i} px={2} onClick={()=>navigate("/stock/"+item?.company_name)}>
             <Card sx={{ borderRadius: 3, backgroundColor:type=="gain"?"#F0FFF0":"white", border:type=="gain"?"1.5px solid #06402B":"1.5px solid #BF0A30" ,height:"200px"}}>
             <CardContent>
                <div className="font-bold">
                  {item.company_name}
                </div>
                <div>
                  <img src={item?.image} alt="company" className="w-[50px] h-[50px]"/>
                </div>
                <div className="flex justify-between">
                  <div>{item.price}</div>
                  <div className={type==="gain"?"text-green-400 font-bold":"text-red-400 font-bold"}>{type === 'gain' ? '+'+item?.net_change+'   ('+item?.percent_change+'%'+')'  : item?.net_change+'  ('+item?.percent_change+'%'+')'}</div>
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