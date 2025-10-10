import { useParams } from "react-router-dom";

export default function Details() {
  const {name}=useParams();
  return (
    <div>Details {name}</div>
  )
}
