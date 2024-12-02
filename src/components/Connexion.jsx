import React, { useState } from "react";
import axios from "axios";

const Login = ({ setCurrentUser }) => {
  const [formData, setFormData] = useState({ login: "", password: "" });

  const getValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      const user = data.find(
        (u) => u.login === formData.login && u.password === formData.password
      );
      if (user) {
        setCurrentUser(user);
        alert("Connexion réussie !");
      } else {
        alert("Identifiants invalides !");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      <input
        name="login"
        placeholder="Login"
        onChange={getValue}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={getValue}
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
