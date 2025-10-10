import { useEffect, useState } from "react";
import CarouselComponent from "./Carousel";
import api from "../api/api";


export default function Feed() {
  const [indices, setIndices] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  useEffect(()=>{
    api.get("/stock/indices").then((res)=>{
      console.log("INDICES",res.data)
      setIndices(res.data)
    })

    api.get("/stock/trending").then((res)=>{
      console.log("TRENDING",res.data)
      setGainers(res.data.trending_stocks.top_gainers)
      setLosers(res.data.trending_stocks.top_losers)
    })
  },[])

  return (
     <div>
      <CarouselComponent title="Indices" data={indices} type="index" />
      <CarouselComponent title="Top Gainers" data={gainers} type="gain" />
      <CarouselComponent title="Top Losers" data={losers} type="loss" />
    </div>
  )
}
