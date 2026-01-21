import { useParams } from "react-router-dom";

export default function Page() {
  const { slug } = useParams();

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
