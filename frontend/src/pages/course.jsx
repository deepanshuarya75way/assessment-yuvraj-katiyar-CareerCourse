import { useState, useEffect } from "react";

import { Link, useSearchParams } from "react-router-dom";

import { Star, Clock, Heart, GitCompare, Filter, X } from "lucide-react";
import {apiurl} from "../api"

export default function CoursesPage() {
  const [searchParams] = useSearchParams();
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = searchParams.get("search");
  console.log(search);

  //   const {
  //     addToWishlist,
  //     removeFromWishlist,
  //     isInWishlist,
  //     addToCompare,
  //     removeFromCompare,
  //     isInCompare,
  //   } = useApp();

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",

    category: searchParams.get("category") || "",

    platform: "",

    level: "",

    priceMin: "",

    priceMax: "",

    rating: "",

    duration: "",

    isFree: false,
  });

  useEffect(() => {
    // console.log(url);
    const fetchCourses = async () => {
      try {
        let url = "http://localhost:5000/api/courses";

        if (search) {
          url += `?search=${search}`;
        }

        const response = await fetch(url);

        const data = await response.json();

        setAllCourses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = allCourses.filter((course) => {
    if (
      filters.search &&
      !course.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;

    if (filters.category && course.category !== filters.category) return false;

    if (filters.platform && course.platform !== filters.platform) return false;

    if (filters.level && course.level !== filters.level) return false;

    if (filters.priceMin && course.price < parseFloat(filters.priceMin))
      return false;

    if (filters.priceMax && course.price > parseFloat(filters.priceMax))
      return false;

    if (filters.rating && course.rating < parseFloat(filters.rating))
      return false;

    if (filters.isFree && course.price > 0) return false;

    return true;
  });

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      platform: "",
      level: "",
      priceMin: "",
      priceMax: "",
      rating: "",
      duration: "",
      isFree: false,
    });
  };

  //   const handleWishlistToggle = (course) => {

  //     if (isInWishlist(course.id)) {

  //       removeFromWishlist(course.id);

  //     } else {

  //       addToWishlist({
  //         id: course.id,
  //         title: course.title,
  //         platform: course.platform,
  //         price: course.price,
  //         rating: course.rating,
  //         image: course.image,
  //       });
  //     }
  //   };

  //   const handleCompareToggle = (course) => {

  //     if (isInCompare(course.id)) {

  //       removeFromCompare(course.id);

  //     } else {

  //       addToCompare({
  //         id: course.id,
  //         title: course.title,
  //         platform: course.platform,
  //         price: course.price,
  //         rating: course.rating,
  //         image: course.image,
  //       });
  //     }
  //   };

  //   if (loading) {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center text-2xl">
  //         Loading Courses...
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}

      <div className="bg-linear-to-br from-indigo-600 via-indigo-600 to-purple-600 text-center text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl mb-4">Browse All Courses</h1>

          <p className="text-black/90">
            Explore {allCourses.length} courses from top platforms
          </p>
        </div>
      </div>

      {/* MAIN */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* FILTERS */}

          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block fixed lg:static inset-0 z-40 lg:z-0 bg-background lg:bg-transparent`}
          >
            <div className="lg:w-64 bg-card border border-border rounded-xl p-6 h-fit lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h3>

                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm mb-2">Search</label>

                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        search: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Minimum Rating</label>

                  <select
                    value={filters.rating}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        rating: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                  >
                    <option value="">All Ratings</option>
                    <option value="4">4+ Stars</option>
                    <option value="3">3+ Stars</option>
                    <option value="2">2+ Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Platform</label>

                  <select
                    value={filters.platform}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        platform: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                  >
                    <option value="">All Platforms</option>
                    <option value="Udemy">Udemy</option>
                    <option value="Coursera">Coursera</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Apna College">Apna College</option>
                  </select>
                </div>

                <div>
  <label className="block text-sm mb-2">Level</label>

  <select
    value={filters.level}
    onChange={(e) =>
      setFilters({
        ...filters,
        level: e.target.value,
      })
    }
    className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
  >
    <option value="">All Levels</option>
    <option value="Beginner">Beginner</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Advanced">Advanced</option>
  </select>
</div>
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-sm text-primary border border-primary rounded-lg"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </aside>

          {/* COURSES */}

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredCourses.length} of {allCourses.length} courses
              </p>

              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
                >
                  {/* IMAGE */}

                  <div className="relative h-48 overflow-hidden">
                    <Link to={`/courses/${course._id}`}>
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </Link>

                    <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-lg text-sm font-medium">
                      {course.price === 0 ? "Free" : `${course.price}Rs`}
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-4">
                    <div className="text-xs text-primary font-medium mb-2">
                      {course.platform}
                    </div>

                    <Link to={`/courses/${course._id}`}>
                      <h3 className="text-sm font-medium mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-muted-foreground mb-3">
                      {course.instructor}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />

                        <span className="font-medium">{course.rating}</span>

                        <span>({course.reviews?.toLocaleString() || 0})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />

                        <span>{course.duration}</span>
                      </div>

                      <span className="px-2 py-1 bg-accent rounded text-xs">
                        {course.level}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
