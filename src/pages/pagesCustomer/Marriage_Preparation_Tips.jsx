import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
const Marriage_Preparation_Tips = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Marriage_Preparation_Tips</h1>
      <p>This is the Marriage Marriage_Preparation_Tips page.</p>

      <Button variant="primary" onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </div>
  );
};

export default Marriage_Preparation_Tips;
