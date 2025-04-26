import React from 'react';
import { Card, Button } from "react-bootstrap";
import './user-info.scss';

//Props for user-info display and delete account
export default function UserInfo({ email, name, handleDelete }) {
  const confirmDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      handleDelete();
    }
  };

  return (
    <> {/*Display styling of UserInfor and Delete account*/}
      <h3 className="text-center mb-4">Your Profile</h3> 

      <div className="avatar-circle mx-auto mb-3">  {/*Avatar for User Initials*/}
      <span className="initials-circle">
          {name ? name.charAt(0).toUpperCase() : "?"} </span>
      </div>

      <Card className="bg-light border-0 shadow-sm rounded text-center">
        <Card.Body>
          <p><strong>Username:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>

          {/* Link-style delete option */}
          <Button
            variant="link"
            className="text-danger mt-2 p-0"
            onClick={confirmDelete}
            style={{ fontSize: '0.9rem' }}
          >
            Delete My Account
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
