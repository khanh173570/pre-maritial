import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";
import { productData } from "./DetailPage";

import img1 from "../../../assets/asstetsCustomer/ar1.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const [showAllCards] = useState(false);

  useEffect(() => {
    console.log("HomePage component mounted!");
  }, []);

  const handleArticelClick = (id) => {
    navigate(`/customer-home/detail/${id}`);
    console.log("Click Articel!");
  }; // Đã thêm dấu đóng ngoặc nhọn cho hàm handleArticelClick

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Container className="home mt-4 container-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Row
            className="gy-3 gx-3mt-6"
            style={{ marginBottom: "50px", marginTop: "50px" }}
          >
            <Col md={6}>
              <motion.img
                src={img1}
                alt="imgf"
                style={{ width: "100%", height: "350px" }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
            </Col>

            <Col
              md={6}
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "justify",
              }}
            >
              <motion.ul
                style={{ listStyleType: "disc", paddingLeft: "20px" }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <li>
                  Premarital counseling is a form of therapy designed to help
                  couples prepare for marriage by addressing important aspects
                  of their relationship. It provides a safe space for partners
                  to discuss their expectations, communication styles, financial
                  management, conflict resolution, and future goals. This
                  process helps build a strong foundation for a healthy and
                  lasting marriage.
                </li>
                <li>
                  One of the main benefits of premarital counseling is improved
                  communication. Many couples face misunderstandings due to
                  different communication styles. A counselor helps partners
                  learn effective ways to express their thoughts and emotions,
                  reducing the chances of future conflicts. Additionally,
                  discussing expectations regarding roles, responsibilities, and
                  finances helps prevent disagreements after marriage.
                </li>
                <li>
                  Premarital counseling is a valuable investment in a couple’s
                  future. It helps partners build trust, improve communication,
                  and develop strategies for handling challenges, ultimately
                  leading to a more fulfilling and enduring marriage.
                </li>
              </motion.ul>
            </Col>
          </Row>
        </motion.div>

        <Row
          className="gy-3 gx-3"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          {(showAllCards ? productData : productData.slice(0, 6)).map(
            (item) => (
              <Col md={4} key={item.id}>
                <Card
                  className="custom-card"
                  onClick={() => handleArticelClick(item.id)}
                >
                  <motion.div className="card-image-container">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="card-image"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                  </motion.div>
                  <motion.div
                    className="card-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Card.Body className="card-body">
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text className="author">
                        <strong>Author:</strong> {item.author}
                      </Card.Text>
                    </Card.Body>
                  </motion.div>
                </Card>
              </Col>
            )
          )}
        </Row>
      </Container>
    </motion.div>
  );
};

export default HomePage;
