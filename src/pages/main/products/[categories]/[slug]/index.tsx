import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { slug } = useParams();
  return (
    <main>
      <h1>{slug}</h1>
    </main>
  );
}
