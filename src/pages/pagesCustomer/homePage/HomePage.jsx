// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./HomePage.css";
// import { productData } from "./DetailPage";

// import img1 from "../../../assets/asstetsCustomer/ar1.jpg";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [showAllCards] = useState(false);

//   useEffect(() => {
//     console.log("HomePage component mounted!");
//   }, []);

//   const handleArticelClick = (id) => {
//     navigate(`/customer-home/detail/${id}`);
//     console.log("Click Articel!");
//   }; // Đã thêm dấu đóng ngoặc nhọn cho hàm handleArticelClick

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       <Container className="home mt-4 container-sm">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <Row
//             className="gy-3 gx-3mt-6"
//             style={{ marginBottom: "50px", marginTop: "50px" }}
//           >
//             <Col md={6}>
//               <motion.img
//                 src={img1}
//                 alt="imgf"
//                 style={{ width: "100%", height: "350px" }}
//                 initial={{ x: -100, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.6 }}
//               />
//             </Col>

//             <Col
//               md={6}
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 textAlign: "justify",
//               }}
//             >
//               <motion.ul
//                 style={{ listStyleType: "disc", paddingLeft: "20px" }}
//                 initial={{ x: 100, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <li>
//                   Premarital counseling is a form of therapy designed to help
//                   couples prepare for marriage by addressing important aspects
//                   of their relationship. It provides a safe space for partners
//                   to discuss their expectations, communication styles, financial
//                   management, conflict resolution, and future goals. This
//                   process helps build a strong foundation for a healthy and
//                   lasting marriage.
//                 </li>
//                 <li>
//                   One of the main benefits of premarital counseling is improved
//                   communication. Many couples face misunderstandings due to
//                   different communication styles. A counselor helps partners
//                   learn effective ways to express their thoughts and emotions,
//                   reducing the chances of future conflicts. Additionally,
//                   discussing expectations regarding roles, responsibilities, and
//                   finances helps prevent disagreements after marriage.
//                 </li>
//                 <li>
//                   Premarital counseling is a valuable investment in a couple’s
//                   future. It helps partners build trust, improve communication,
//                   and develop strategies for handling challenges, ultimately
//                   leading to a more fulfilling and enduring marriage.
//                 </li>
//               </motion.ul>
//             </Col>
//           </Row>
//         </motion.div>

//         <Row
//           className="gy-3 gx-3"
//           style={{ maxWidth: "800px", margin: "0 auto" }}
//         >
//           {(showAllCards ? productData : productData.slice(0, 6)).map(
//             (item) => (
//               <Col md={4} key={item.id}>
//                 <Card
//                   className="custom-card"
//                   onClick={() => handleArticelClick(item.id)}
//                 >
//                   <motion.div className="card-image-container">
//                     <motion.img
//                       src={item.image}
//                       alt={item.title}
//                       className="card-image"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       whileHover={{ scale: 1.1 }}
//                       transition={{ duration: 0.7 }}
//                     />
//                   </motion.div>
//                   <motion.div
//                     className="card-content"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6, delay: 0.4 }}
//                   >
//                     <Card.Body className="card-body">
//                       <Card.Title>{item.title}</Card.Title>
//                       <Card.Text className="author">
//                         <strong>Author:</strong> {item.author}
//                       </Card.Text>
//                     </Card.Body>
//                   </motion.div>
//                 </Card>
//               </Col>
//             )
//           )}
//         </Row>
//       </Container>
//     </motion.div>
//   );
// };

// export default HomePage;

// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./HomePage.css";

// import img1 from "../../../assets/asstetsCustomer/ar1.jpg";

// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       {/* Hero Section */}
//       <div className="hero-section" style={{ backgroundImage: `url(${img1})` }}>
//         <div className="hero-overlay"></div>
//         <div className="hero-content">
//           <h1 className="hero-title">
//             We work with couples to build strong, lasting relationships
//           </h1>
//           <p className="hero-subtitle">
//             Explore our premarital counseling services and resources.
//           </p>
//         </div>
//       </div>

//       {/* About Us Section */}
//       <Container className="about-section text-center py-5">
//         <h2>About Us</h2>
//         <p className="about-description">
//           We provide premarital counseling services to help couples build a
//           strong foundation for their future. Our team of experts works closely
//           with you to address communication, conflict resolution, and shared
//           goals.
//         </p>
//       </Container>

//       {/* Statistics Section */}
//       <Container className="statistics-section text-center py-5">
//         <Row>
//           <Col md={3}>
//             <h3>10+</h3>
//             <p>Years of Experience</p>
//           </Col>
//           <Col md={3}>
//             <h3>500+</h3>
//             <p>Happy Couples</p>
//           </Col>
//           <Col md={3}>
//             <h3>20+</h3>
//             <p>Expert Counselors</p>
//           </Col>
//           <Col md={3}>
//             <h3>15+</h3>
//             <p>Workshops Conducted</p>
//           </Col>
//         </Row>
//       </Container>

//       {/* Services Section */}
//       <Container className="services-section py-5">
//         <h2 className="text-center">Our Services</h2>
//         <Row className="gy-4">
//           <Col md={4}>
//             <Card className="service-card">
//               <Card.Body>
//                 <Card.Title>Communication Skills</Card.Title>
//                 <Card.Text>
//                   Learn effective communication techniques to strengthen your
//                   relationship.
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={4}>
//             <Card className="service-card">
//               <Card.Body>
//                 <Card.Title>Conflict Resolution</Card.Title>
//                 <Card.Text>
//                   Develop strategies to resolve conflicts and build mutual
//                   understanding.
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col md={4}>
//             <Card className="service-card">
//               <Card.Body>
//                 <Card.Title>Financial Planning</Card.Title>
//                 <Card.Text>
//                   Plan your financial future together with expert guidance.
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </motion.div>
//   );
// };

// export default HomePage;

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";

import img1 from "../../../assets/asstetsCustomer/ar1.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          height: "400px",
          color: "#fff",
        }}
      >
        <div
          className="hero-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>
        <div
          className="hero-content"
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <h1
            className="hero-title"
            style={{ fontSize: "2.5rem", fontWeight: "bold" }}
          >
            Build Strong, Lasting Relationships
          </h1>
          <p
            className="hero-subtitle"
            style={{ fontSize: "1.2rem", marginTop: "10px" }}
          >
            Explore our premarital counseling services and resources.
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <Container className="about-section text-center py-5">
        <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>About Us</h2>
        <p
          className="about-description"
          style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
        >
          We provide premarital counseling services to help couples build a
          strong foundation for their future. Our team of experts works closely
          with you to address communication, conflict resolution, and shared
          goals.
        </p>
      </Container>

      {/* Statistics Section */}
      <Container className="statistics-section text-center py-5">
        <Row>
          {[
            { value: "10+", label: "Years of Experience" },
            { value: "500+", label: "Happy Couples" },
            { value: "20+", label: "Expert Counselors" },
            { value: "15+", label: "Workshops Conducted" },
          ].map((stat, index) => (
            <Col md={3} key={index} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3 style={{ fontWeight: "bold", color: "#007bff" }}>
                  {stat.value}
                </h3>
                <p>{stat.label}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Services Section */}
      <Container className="services-section py-5">
        <h2
          className="text-center"
          style={{ fontWeight: "bold", marginBottom: "30px" }}
        >
          Our Services
        </h2>
        <Row className="gy-4">
          {[
            {
              title: "Communication Skills",
              text: "Learn effective communication techniques to strengthen your relationship.",
              icon: "💬",
            },
            {
              title: "Conflict Resolution",
              text: "Develop strategies to resolve conflicts and build mutual understanding.",
              icon: "🤝",
            },
            {
              title: "Financial Planning",
              text: "Plan your financial future together with expert guidance.",
              icon: "💰",
            },
          ].map((service, index) => (
            <Col md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "15px",
                    color: "#007bff",
                  }}
                >
                  {service.icon}
                </div>
                <h4 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  {service.title}
                </h4>
                <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                  {service.text}
                </p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.div>
  );
};

export default HomePage;
