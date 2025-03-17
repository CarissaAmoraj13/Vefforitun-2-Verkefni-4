import { useState, useEffect } from "react";

export default function AdminPage() {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState(""); // New input for department creation
  const [error, setError] = useState(null); // Error handling

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load departments");
        return res.json();
      })
      .then(data => setDepartments(data))
      .catch(error => setError(error.message));
  }, []);

  // ✅ Delete a department
  async function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this department?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/departments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete department");

      setDepartments(departments.filter(dept => dept.id !== id)); // Remove from UI
    } catch (error) {
      setError(error.message);
    }
  }

  // ✅ Create a new department
  async function handleCreate() {
    if (!newDepartment.trim()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newDepartment }),
      });

      if (!res.ok) throw new Error("Failed to create department");

      const createdDept = await res.json();
      setDepartments([...departments, createdDept]); 
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>Manage departments here.</p>

      {error && <p className="text-red-500">{error}</p>} 

    
      <div className="my-4">
        <input
          type="text"
          placeholder="New department title"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded">
          Add Department
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-4">Departments</h2>
      <ul>
        {departments.map(dept => (
          <li key={dept.id} className="border-b py-2 flex justify-between">
            {dept.title} 
            <button className="ml-2 text-red-500" onClick={() => handleDelete(dept.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
