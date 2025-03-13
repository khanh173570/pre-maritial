import React from "react";
import { Table, Button } from "react-bootstrap";

const MajorsTable = ({ majors, onDelete, onEdit }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Is active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {majors.map((major) => (
          <tr key={major.id}>
            <td>{major.id}</td>
            <td>{major.name}</td>
            <td>{major.isActive ? "Yes" : "No"}</td>
            <td>
              <Button variant="danger" onClick={() => onDelete(major.id)}>
                Delete
              </Button>{" "}
              <Button variant="primary" onClick={() => onEdit(major.id)}>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MajorsTable;
