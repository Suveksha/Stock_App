import { useEffect, useState } from "react";
import CarouselComponent from "./reusable/Carousel";
import api from "../api/api";
import DisplayCard from "./reusable/DisplayCard";


export default function Feed() {
  const [indices, setIndices] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  useEffect(()=>{
    api.get("/index/all").then((res)=>{
      console.log("INDICES",res.data)
      setIndices(res.data)
    })

    api.get("/stock/gainers").then((res)=>{
      console.log("Gainers",res.data)
      setGainers(res.data)
    })

    api.get("/stock/losers").then((res)=>{
      console.log("Losers",res.data)
      setLosers(res.data)
    })
  },[])

  return (
     <div className="pr-10 pl-10 pt-5 pb-5 ">
      <CarouselComponent data={indices} />
      <DisplayCard title="Top Gainers" data={gainers} type="gain" />
      <DisplayCard title="Top Losers" data={losers} type="loss" />
    </div>
  )
}
