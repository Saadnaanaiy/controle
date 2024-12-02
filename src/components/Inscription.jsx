import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({ id: "", login: "", password: "" });

  const getValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users", formData);
      alert("Utilisateur inscrit avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <input name="id" placeholder="ID" onChange={getValue} required />
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
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Register;
