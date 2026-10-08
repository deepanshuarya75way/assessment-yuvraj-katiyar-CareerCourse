import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Star, Clock } from "lucide-react";

function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const handleEnroll = () => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    window.open(course.enrollLink, "_blank");
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/courses/${id}`,
        );

        const data = await response.json();

        setCourse(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow overflow-hidden">
        {/* IMAGE */}

        <img
          src={course.image}
          alt={course.title}
          className="w-full h-[400px] object-cover"
        />

        {/* CONTENT */}

        <div className="p-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-medium">
              {course.platform}
            </span>

            <span className="bg-gray-100 px-4 py-1 rounded-full text-sm">
              {course.level}
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6">{course.title}</h1>

          <p className="text-gray-600 text-lg mb-8 leading-8">
            {course.description}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-100 rounded-2xl p-6">
              <h3 className="text-sm text-gray-500 mb-2">Instructor</h3>

              <p className="text-xl font-semibold">{course.instructor}</p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-6">
              <h3 className="text-sm text-gray-500 mb-2">Duration</h3>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />

                <p className="text-xl font-semibold">{course.duration}</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-6">
              <h3 className="text-sm text-gray-500 mb-2">Rating</h3>

              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />

                <p className="text-xl font-semibold">{course.rating}</p>
              </div>
            </div>
          </div>

          {/* PRICE */}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-2">Course Price</p>

              <h2 className="text-5xl font-bold text-indigo-600">
                {course.price}Rs
              </h2>
            </div>

            <button
              onClick={handleEnroll}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
