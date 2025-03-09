import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
const Great_Marriage_Vows = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Great_Marriage_Vows</h1>
      <p>This is the Marriage Great_Marriage_Vows page.</p>

      <Button variant="primary" onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </div>
  );
};

export default Great_Marriage_Vows;
