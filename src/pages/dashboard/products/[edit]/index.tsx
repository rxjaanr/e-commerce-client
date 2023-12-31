import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { slug } = useParams();
  return (
    <main>
      <h1>Product : {slug}</h1>
    </main>
  );
}
