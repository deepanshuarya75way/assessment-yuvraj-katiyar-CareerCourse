import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const token = localStorage.getItem("token");
const name = localStorage.getItem("name");

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-100 border-b shadow-sm overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 min-h-16">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 min-w-0 shrink"
          >
            <div className="bg-indigo-600 p-2 rounded-xl shrink-0">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>

            <span className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
              CareerCourse
            </span>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 transition whitespace-nowrap"
            >
              Home
            </Link>

            <Link
              to="/course"
              className="text-gray-600 hover:text-indigo-600 transition font-medium whitespace-nowrap"
            >
              Courses
            </Link>

            <Link
              to="/carrerquiz"
              className="text-gray-600 hover:text-indigo-600 transition whitespace-nowrap"
            >
              Career Quiz
            </Link>
          </div>

          {/* LOGIN / LOGOUT */}
          {token ? (
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">

              {/* WELCOME NAME */}
              <h2 className="font-semibold text-indigo-600 text-sm sm:text-base whitespace-nowrap max-w-[90px] sm:max-w-none truncate">
                <span className="hidden sm:inline">Welcome </span>
                {name}
              </h2>

              {/* LOGOUT BUTTON */}
              <button
                type="button"
                onClick={async() => {
                  try{
                    await fetch("http://localhost:5000/api/auth/logout"),{
                      method :"POST",
                      headers :{
                        Authorization: `Bearer $(token)`,
                  },
                }
                }catch(error){
                  console.log("error",error)
                }finally{
                  localStorage.removeItem("token");
                  localStorage.removeItem("name");
                  window.location.reload();
                }
                  
                }}
                
                className="
                  shrink-0
                  px-3 sm:px-6
                  py-2
                  rounded-xl
                  border
                  border-red-500
                  text-red-500
                  font-medium
                  text-sm sm:text-base
                  whitespace-nowrap
                  hover:bg-red-500
                  hover:text-white
                  transition
                "
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="
                shrink-0
                px-4 sm:px-6
                py-2
                rounded-xl
                bg-indigo-600
                text-white
                font-medium
                text-sm sm:text-base
                whitespace-nowrap
                hover:bg-indigo-700
                transition
                shadow
              "
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}