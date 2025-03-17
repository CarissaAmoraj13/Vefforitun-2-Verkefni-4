import { useEffect, useState } from "react";

export default function Home() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null); // 👈 New state for error messages

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load departments"); // 👈 Check for API errors
        return res.json();
      })
      .then((data) => setDepartments(data))
      .catch((error) => setError(error.message)); // 👈 Store error
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Departments</h1>
      {error && <p className="text-red-500">{error}</p>} {/* 👈 Show error if API fails */}
      <ul>
        {departments.map((dept) => (
          <li key={dept.id} className="border-b py-2">
            <a href={`/departments/${dept.slug}`} className="text-blue-500">
              {dept.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
