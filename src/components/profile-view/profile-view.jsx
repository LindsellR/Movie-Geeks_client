import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile-view.scss";
import UserInfo from "./user-info";
import FavouriteMovies from "./favourite-movies";
import UpdateUser from "./update-user";
import { Col, Row, Card } from "react-bootstrap";

export const ProfileView = ({ user, token, movies, onLoggedOut, onUserUpdate }) => {
  const [userInfo, setUserInfo] = useState(null); //store user info for display
  const [favouriteMovies, setFavouriteMovies] = useState([]); //sets favourite movies by ID
  const [updatedUser, setUpdatedUser] = useState({ //sets update user form
    Username: "",
    Email: "",
    Password: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    //sets full user object and favourite movies
    setUserInfo(user);
    setFavouriteMovies(user.FavouriteMovies || []);
    setUpdatedUser({
      Username: user.Username,
      Email: user.Email,
      Password: "" // blank until entered
    });
  }, [user]);

   // Define handleRemoveFavourite function
   const handleRemoveFavourite = (movieId) => {
    const updatedFavouriteMovies = favouriteMovies.filter((id) => id !== movieId);
    setFavouriteMovies(updatedFavouriteMovies); // Update state with new favourites

   // Optional: If needed, make an API request to update the user on the backend
    fetch(`https://movie-geeks-one.vercel.app/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove movie from favourites");
        }
        return response.json();
      })
      .then((response) => {
        onUserUpdate(response.updatedUser); // Update user info in parent
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to remove movie from favourites");
      });

   };
  //handles updated user info and password
  const handleUpdate = (e) => {
    e.preventDefault();
  
    const payload = {
      Username: updatedUser.Username,
      Email: updatedUser.Email,
    };
    
    if (updatedUser.Password?.trim()) {
      payload.Password = updatedUser.Password;
    }
    //logsout after update so new user info has matching jwttoken
    const logoutAfterUpdate = updatedUser.Username !== user.Username;
    
    //PUT request to update userInfo
    fetch(`https://movie-geeks-one.vercel.app/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        const text = await response.text();
    
        if (!response.ok) {
          console.error("Update failed:", text);
          throw new Error("Update failed");
        }
    
        const data = JSON.parse(text);
    
        if (onUserUpdate) {
          onUserUpdate(data.updatedUser);
        }
    
        if (logoutAfterUpdate) {
          alert("Username changed. Please log in again.");
          onLoggedOut();
          return;
        }
    
        alert("Profile updated successfully!");
        console.log("User updated:", data);
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        alert("Something went wrong while updating your profile.");
      });
    
  };
  
  
  //Handles deleting an account.
  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    fetch(`https://movie-geeks-one.vercel.app/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete user");
        alert("Account deleted");
        onLoggedOut();
        navigate("/signup");
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting account");
      });
  };

  if (!userInfo) {
    return <div>Loading profile...</div>;
  }
  //3 child components with bootstrap styling.
  return (
    <>
      <Row>
        <Col xs={12} sm={4} className="mb-3 pt-5">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <UserInfo
                name={userInfo.Username}
                email={userInfo.Email}
                handleDelete={handleDelete}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={8} className="mb-3">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <UpdateUser
                updatedUser={updatedUser}
                handleUpdate={handleUpdate}
                setUpdatedUser={setUpdatedUser}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavouriteMovies
        userInfo={userInfo}
        favouriteMovies={favouriteMovies}
        movies={movies}
        handleRemoveFavourite={handleRemoveFavourite}
      />
    </>
  );
};
