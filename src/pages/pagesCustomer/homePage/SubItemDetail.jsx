import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
const subItemDetails = {
  101: {
    title: "Building Trust in Relationships",
    content: "Trust is the foundation of any strong relationship...",
  },
  102: {
    title: "How to Improve Communication",
    content: "Effective communication is key to a successful relationship...",
  },
  103: {
    title: "Maintaining Long-term Happiness",
    content: "Long-term happiness requires mutual understanding and respect...",
  },
  201: {
    title: "Overcoming Emotional Barriers",
    content: "Emotional barriers can be a challenge in relationships...",
  },
  202: {
    title: "Dealing with Past Trauma",
    content:
      "Healing from past trauma is essential for a healthy relationship...",
  },
  203: {
    title: "How to Express Love Daily",
    content: "Expressing love daily can strengthen your relationship...",
  },
  301: {
    title: "Understanding the Meaning of Vows",
    content: "Marriage vows hold significant meaning...",
  },
  302: {
    title: "Creating Personalized Vows",
    content: "Personalized vows make the wedding ceremony unique...",
  },
  303: {
    title: "How to Keep Your Promises",
    content: "Keeping promises builds trust and reliability...",
  },
};

const SubItemDetail = () => {
  const { id } = useParams();
  const subItem = subItemDetails[id];
  const navigate = useNavigate();
  if (!subItem) {
    return <h2 className="text-center mt-4">Sub-item not found</h2>;
  }

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <Card.Title>{subItem.title}</Card.Title>
        <Card.Text>{subItem.content}</Card.Text>
      </Card>
      <Button variant="primary" onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </Container>
  );
};

export default SubItemDetail;
