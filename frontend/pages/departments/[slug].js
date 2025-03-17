import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DepartmentPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [department, setDepartment] = useState(null);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null); // 👈 New state for errors

  useEffect(() => {
    if (!slug) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/departments/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Department not found"); // 👈 Check for 404
        return res.json();
      })
      .then(data => setDepartment(data))
      .catch(error => setError(error.message)); // 👈 Store error

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/departments/${slug}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(error => console.error("Error fetching courses:", error));
  }, [slug]);

  if (error) return <h1 className="text-red-500 text-2xl">404 - Department Not Found</h1>; // 👈 Show error if not found
  if (!department) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{department.title}</h1>
      <p>{department.description}</p>

      <h2 className="text-xl font-semibold mt-4">Courses:</h2>
      <ul>
        {courses.map(course => (
          <li key={course.course_id} className="border-b py-2">
            {course.title} ({course.semester})
          </li>
        ))}
      </ul>
    </div>
  );
}
