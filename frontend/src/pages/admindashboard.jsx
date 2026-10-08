import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { apiurl } from "../api";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",

    instructor: "",

    platform: "",

    price: "",

    rating: "",

    category: "",

    duration: "",

    level: "",

    image: "",

    enrollLink: "",

    description: "",
  });

  // FETCH COURSES

  const fetchCourses = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/courses",
      );

      const data = await response.json();

      setCourses(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // HANDLE INPUT

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // ADD / UPDATE COURSE

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE
        console.log(editingId);
        const response = await fetch(
          `http://localhost:5000/api/courses/${editingId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(formData),
          },
        );

        const data = await response.json();

        console.log(data);

        await fetchCourses();
      } else {
        // CREATE

        await fetch(
          "http://localhost:5000/api/courses",

          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(formData),
          },
        );
      }

      setFormData({
        title: "",

        instructor: "",

        platform: "",

        price: "",

        rating: "",

        category: "",

        duration: "",

        level: "",

        image: "",

        enrollLink: "",

        description: "",
      });

      setEditingId(null);

      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE COURSE

  const handleDelete = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/courses/${id}`,

        {
          method: "DELETE",
        },
      );

      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT COURSE

  const handleEdit = (course) => {
    setEditingId(course._id);

    setFormData({
      title: course.title,

      instructor: course.instructor,

      platform: course.platform,

      price: course.price,

      rating: course.rating,

      category: course.category,

      duration: course.duration,

      level: course.level,

      image: course.image,

      enrollLink: course.enrollLink,

      description: course.description,
    });

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className=" ">
        {/* HEADER */}

        <div className=" text-center bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-600 text-white py-28 ">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>

          <p className="text-white mt-2">Manage all courses dynamically</p>
        </div>

        {/* FORM */}

        <div className="bg-white rounded-2xl shadow p-8 mb-10 m-4 ">
          <div className="flex items-center gap-3 mb-6">
            <Plus className="w-6 h-6 text-indigo-600" />

            <h2 className="text-2xl font-semibold">
              {editingId ? "Update Course" : "Add New Course"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="title"
              placeholder="Course Title"
              value={formData.title}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
              required
            />

            <input
              type="text"
              name="instructor"
              placeholder="Instructor"
              value={formData.instructor}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
              required
            />

            <input
              type="text"
              name="platform"
              placeholder="Platform"
              value={formData.platform}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="number"
              step="0.1"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              name="level"
              placeholder="Level"
              value={formData.level}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />

            <input
              type="text"
              name="enrollLink"
              placeholder="Enroll Link"
              value={formData.enrollLink}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 md:col-span-2"
            />

            <textarea
              name="description"
              placeholder="Course Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="border rounded-xl px-4 py-3 md:col-span-2"
            ></textarea>

            <button
              type="submit"
              className="bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition md:col-span-2"
            >
              {editingId ? "Update Course" : "Add Course"}
            </button>
          </form>
        </div>

        {/* COURSES */}

        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">All Courses</h2>

          {loading ? (
            <p>Loading courses...</p>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-2xl shadow overflow-hidden"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-5">
                    <div className="flex justify-between mb-3">
                      <span className="text-indigo-600 text-sm">
                        {course.platform}
                      </span>

                      <span className="font-medium">₹{course.price}</span>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">
                      {course.title}
                    </h3>

                    <p className="text-gray-500 mb-4">{course.instructor}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        ⭐ {course.rating}
                      </span>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(course)}
                          className="p-2 rounded-lg bg-blue-100 text-blue-600"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(course._id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
