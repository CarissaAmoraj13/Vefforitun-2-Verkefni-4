import { useState, useEffect } from "react";

export default function AdminPage() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`)
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(error => console.error("Error fetching departments:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p>Manage departments and courses here.</p>

      <h2 className="text-xl font-semibold mt-4">Departments</h2>
      <ul>
        {departments.map(dept => (
          <li key={dept.id} className="border-b py-2">
            {dept.title} 
            <button className="ml-2 text-red-500" onClick={() => console.log("Delete", dept.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
