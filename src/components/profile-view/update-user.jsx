import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';


//Props for updated user object,and to handle the update of the object. Bootstrap form and fields
export default function UpdateUser({ updatedUser, handleUpdate, setUpdatedUser }) {
  return (
    <Container className="mt-4 p-4 border rounded bg-light" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4 text-center">Update Your Info</h3>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={updatedUser.Username}
            onChange={(e) => setUpdatedUser({ ...updatedUser, Username: e.target.value })}
            placeholder="Enter username"
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={updatedUser.Email}
            onChange={(e) => setUpdatedUser({ ...updatedUser, Email: e.target.value })}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-4"> 
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={updatedUser.Password}
            onChange={(e) => setUpdatedUser({ ...updatedUser, Password: e.target.value })}
            placeholder="Leave blank to keep current password"
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit"> 
            Update Info
          </Button>
        </div>
      </Form>
    </Container>
  );
}
