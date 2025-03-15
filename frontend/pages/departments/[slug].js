import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DepartmentPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [department, setDepartment] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!slug) return;
    
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/departments/${slug}`)
      .then(res => res.json())
      .then(data => setDepartment(data))
      .catch(error => console.error("Error fetching department:", error));

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/departments/${slug}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(error => console.error("Error fetching courses:", error));
  }, [slug]);

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
