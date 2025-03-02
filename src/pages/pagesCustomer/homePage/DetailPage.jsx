import { useParams, useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./DetailPage.css";

// Dữ liệu giả định (trong thực tế có thể lấy từ API hoặc state)
import img1 from "../../../assets/asstetsCustomer/ar1.jpg";
import img2 from "../../../assets/asstetsCustomer/ar2.jpg";
import img3 from "../../../assets/asstetsCustomer/ar3.jpg";
import img4 from "../../../assets/asstetsCustomer/ar4.jpg";
import img5 from "../../../assets/asstetsCustomer/ar5.jpg";
import img6 from "../../../assets/asstetsCustomer/ar6.jpg";
const productData = [
  {
    id: 1,
    image: img1,
    title: "15 Signs You Are in a Stable Relationship & Ways to Maintain It",
    author: "Approved By John Doe",
  },
  {
    id: 2,
    image: img2,
    title: "10 Reasons Why You Need to Break Down Walls in Your Marriage",
    author: "Approved By Emily Smith",
  },
  {
    id: 3,
    image: img3,
    title: "10 Essential Marriage Vows for a Happy & Fulfilling Relationship",
    author: "Approved By Michael Johnson",
  },
  {
    id: 4,
    image: img4,
    title: "7 Ways of Handling Social Anxiety at Your Wedding Reception",
    author: "Approved By Sarah Williams",
  },
  {
    id: 5,
    image: img5,
    title: "How to Manage Healthy Expectations in a Relationship: 7 Tips",
    author: "Approved By David Brown",
  },
  {
    id: 6,
    image: img6,
    title:
      "Saving Money for Your Marriage: 5 Practical Tips to Cut Wedding Costs",
    author: "Approved By Sophia Martinez",
  },
];

const DetailPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const product = productData.find((item) => item.id === parseInt(id));

  if (!product) {
    return <h2 className="text-center mt-4">Sản phẩm không tồn tại!</h2>;
  }

  return (
    <Container className="detail-page text-center mt-4">
      <h2>{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "200px", height: "200px", margin: "20px auto" }}
      />
      <p>{product.description}</p>
      <Button variant="primary" onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </Container>
  );
};

export default DetailPage;
