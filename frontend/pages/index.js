import { useEffect, useState } from "react";

export default function Home() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Departments</h1>
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
