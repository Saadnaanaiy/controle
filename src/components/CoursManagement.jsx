import { useState, useEffect } from "react";
import axios from "axios";

const CourseManagement = ({ currentUser, setCurrentUser }) => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ id: "", titre: "", genre: "" });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/courses");
      setCourses(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
    }
  };

  const getValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/courses", formData);
      fetchCourses();
      setFormData({ id: "", titre: "", genre: "" });
      alert("Cours ajouté !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours :", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/courses/${id}`);
      fetchCourses();
      alert("Cours supprimé !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div>
      <h2>Bienvenue, {currentUser.login}</h2>
      <button onClick={handleLogout}>Se déconnecter</button>
      <form onSubmit={submitData}>
        <h3>Ajouter un Cours</h3>
        <input
          name="id"
          placeholder="ID"
          value={formData.id}
          onChange={getValue}
          required
        />
        <input
          name="titre"
          placeholder="Titre"
          value={formData.titre}
          onChange={getValue}
          required
        />
        <input
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={getValue}
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      <h3>Liste des Cours</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.titre}</td>
              <td>{course.genre}</td>
              <td>
                <button onClick={() => handleDelete(course.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
