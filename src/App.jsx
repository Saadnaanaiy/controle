import React, { useState } from "react";
import Register from "./components/Inscription";
import Login from "./components/Connexion";
import CourseManagement from "./components/CoursManagement";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      <h1>Gestion des Cours</h1>
      {!currentUser ? (
        <>
          <Register />
          <Login setCurrentUser={setCurrentUser} />
        </>
      ) : (
        <CourseManagement
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
}

export default App;
