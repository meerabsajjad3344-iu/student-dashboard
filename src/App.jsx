import { useState } from "react";
import "./App.css";

const studentsData = [
  {
    id: 1,
    name: "Ayesha Khan",
    email: "ayesha@gmail.com",
    course: "Web Development",
    attendance: 92,
    grade: "A",
    status: "Active",
  },
  {
    id: 2,
    name: "Ali Raza",
    email: "ali@gmail.com",
    course: "UI/UX Design",
    attendance: 87,
    grade: "A-",
    status: "Active",
  },
  {
    id: 3,
    name: "Sara Ahmed",
    email: "sara@gmail.com",
    course: "Graphic Design",
    attendance: 78,
    grade: "B+",
    status: "Active",
  },
  {
    id: 4,
    name: "Hamza Malik",
    email: "hamza@gmail.com",
    course: "JavaScript",
    attendance: 68,
    grade: "B",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Maham Noor",
    email: "maham@gmail.com",
    course: "React Development",
    attendance: 95,
    grade: "A+",
    status: "Active",
  },
];

const menuItems = [
  { name: "Dashboard", icon: "⌂" },
  { name: "Students", icon: "♙" },
  { name: "Courses", icon: "▣" },
  { name: "Attendance", icon: "✓" },
  { name: "Results", icon: "▤" },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredStudents = studentsData.filter((student) => {
    const text = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(text) ||
      student.course.toLowerCase().includes(text) ||
      student.email.toLowerCase().includes(text)
    );
  });

  const changePage = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
    setSearch("");
  };

  return (
    <div className="app">

      {/* SIDEBAR OVERLAY - MOBILE */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>

        <div className="logo">
          <div className="logo-icon">S</div>

          <div>
            <h2>Student</h2>
            <span>Dashboard</span>
          </div>
        </div>

        <nav className="navigation">

          <p className="menu-title">
            MAIN MENU
          </p>

          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => changePage(item.name)}
            >
              <span className="nav-icon">
                {item.icon}
              </span>

              {item.name}
            </button>
          ))}

        </nav>

        <div className="sidebar-bottom">

          <button className="nav-item">
            <span className="nav-icon">⚙</span>
            Settings
          </button>

          <button className="nav-item logout">
            <span className="nav-icon">↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* MAIN */}
      <main className="main-content">

        {/* TOPBAR */}
        <header className="topbar">

          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <div className="mobile-logo">
            <div className="logo-icon">
              S
            </div>

            <strong>
              Student Dashboard
            </strong>
          </div>


          <div className="search-box">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search students or courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <div className="top-actions">

            <button className="notification">
              ♢
            </button>

            <div className="profile">

              <div className="avatar">
                M
              </div>

              <div className="profile-info">

                <strong>
                  Meerab
                </strong>

                <span>
                  Administrator
                </span>

              </div>

              <span className="arrow">
                ⌄
              </span>

            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}

        <section className="page-content">

          {activePage === "Dashboard" && (
            <Dashboard
              students={filteredStudents}
              changePage={changePage}
            />
          )}

          {activePage === "Students" && (
            <StudentsPage
              students={filteredStudents}
              search={search}
              setSearch={setSearch}
            />
          )}

          {activePage === "Courses" && (
            <CoursesPage />
          )}

          {activePage === "Attendance" && (
            <AttendancePage />
          )}

          {activePage === "Results" && (
            <ResultsPage />
          )}

        </section>


        <footer>
          © 2026 Student Dashboard. All rights reserved.
        </footer>

      </main>

    </div>
  );
}


/* =====================================================
   DASHBOARD
===================================================== */

function Dashboard({ students, changePage }) {
  return (
    <>

      {/* WELCOME */}
      <div className="welcome-section">

        <div>

          <p className="small-label">
            OVERVIEW
          </p>

          <h1>
            Good morning, Meerab 👋
          </h1>

          <p>
            Here's what's happening with your students today.
          </p>

        </div>

        <button className="add-student">
          <span>＋</span>
          Add Student
        </button>

      </div>


      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-top">

            <div className="stat-icon students-icon">
              ♙
            </div>

            <span className="growth">
              +12.5%
            </span>

          </div>

          <p>Total Students</p>

          <h2>1,248</h2>

          <span className="stat-note">
            Compared to last month
          </span>

        </div>


        <div className="stat-card">

          <div className="stat-top">

            <div className="stat-icon course-icon">
              ▣
            </div>

            <span className="growth">
              +8.2%
            </span>

          </div>

          <p>Active Courses</p>

          <h2>24</h2>

          <span className="stat-note">
            4 new this month
          </span>

        </div>


        <div className="stat-card">

          <div className="stat-top">

            <div className="stat-icon attendance-icon">
              ✓
            </div>

            <span className="growth">
              +3.4%
            </span>

          </div>

          <p>Avg. Attendance</p>

          <h2>87.6%</h2>

          <span className="stat-note">
            Across all students
          </span>

        </div>


        <div className="stat-card">

          <div className="stat-top">

            <div className="stat-icon result-icon">
              ★
            </div>

            <span className="growth">
              +5.7%
            </span>

          </div>

          <p>Avg. Performance</p>

          <h2>8.4/10</h2>

          <span className="stat-note">
            Overall student score
          </span>

        </div>

      </div>


      {/* CHART + QUICK ACTIONS */}
      <div className="dashboard-grid">

        {/* CHART */}
        <div className="card chart-card">

          <div className="card-header">

            <div>
              <h3>
                Student Overview
              </h3>

              <p>
                Student enrollment throughout the year
              </p>
            </div>

            <select>
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>

          </div>


          <div className="chart">

            <div className="chart-y">
              <span>400</span>
              <span>300</span>
              <span>200</span>
              <span>100</span>
              <span>0</span>
            </div>


            <div className="chart-area">

              <div className="line line-one"></div>
              <div className="line line-two"></div>
              <div className="line line-three"></div>
              <div className="line line-four"></div>


              <div className="bars">

                <div
                  className="bar"
                  style={{ height: "42%" }}
                ></div>

                <div
                  className="bar"
                  style={{ height: "58%" }}
                ></div>

                <div
                  className="bar"
                  style={{ height: "48%" }}
                ></div>

                <div
                  className="bar"
                  style={{ height: "72%" }}
                ></div>

                <div
                  className="bar"
                  style={{ height: "64%" }}
                ></div>

                <div
                  className="bar"
                  style={{ height: "82%" }}
                ></div>

                <div
                  className="bar"
                  style={{ height: "76%" }}
                ></div>

                <div
                  className="bar"
                  style={{ height: "90%" }}
                ></div>

              </div>


              <div className="months">

                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>

              </div>

            </div>

          </div>

        </div>


        {/* QUICK ACTIONS */}
        <div className="card quick-card">

          <div className="card-header">

            <div>

              <h3>
                Quick Actions
              </h3>

              <p>
                Manage your dashboard
              </p>

            </div>

          </div>


          <div className="quick-actions">

            <button
              onClick={() => changePage("Students")}
            >

              <span className="quick-icon">
                ＋
              </span>

              <div>

                <strong>
                  Add Student
                </strong>

                <small>
                  Create a new student profile
                </small>

              </div>

              <span>›</span>

            </button>


            <button
              onClick={() => changePage("Courses")}
            >

              <span className="quick-icon">
                ▣
              </span>

              <div>

                <strong>
                  Create Course
                </strong>

                <small>
                  Add a new course
                </small>

              </div>

              <span>›</span>

            </button>


            <button
              onClick={() => changePage("Attendance")}
            >

              <span className="quick-icon">
                ✓
              </span>

              <div>

                <strong>
                  Mark Attendance
                </strong>

                <small>
                  Update today's attendance
                </small>

              </div>

              <span>›</span>

            </button>


            <button
              onClick={() => changePage("Results")}
            >

              <span className="quick-icon">
                ▤
              </span>

              <div>

                <strong>
                  View Results
                </strong>

                <small>
                  Check student performance
                </small>

              </div>

              <span>›</span>

            </button>

          </div>

        </div>

      </div>


      {/* RECENT STUDENTS */}
      <div className="card table-card">

        <div className="card-header table-header">

          <div>

            <h3>
              Recent Students
            </h3>

            <p>
              Latest students added to the system
            </p>

          </div>


          <button
            className="view-all"
            onClick={() => changePage("Students")}
          >
            View All →
          </button>

        </div>


        <StudentTable students={students} />

      </div>

    </>
  );
}


/* =====================================================
   STUDENT TABLE
===================================================== */

function StudentTable({ students }) {
  return (
    <div className="table-wrapper">

      <table>

        <thead>

          <tr>
            <th>STUDENT</th>
            <th>COURSE</th>
            <th>ATTENDANCE</th>
            <th>GRADE</th>
            <th>STATUS</th>
          </tr>

        </thead>


        <tbody>

          {students.length > 0 ? (
            students.map((student) => (

              <tr key={student.id}>

                <td>

                  <div className="student-info">

                    <div className="student-avatar">
                      {student.name.charAt(0)}
                    </div>

                    <div>

                      <strong>
                        {student.name}
                      </strong>

                      <span>
                        {student.email}
                      </span>

                    </div>

                  </div>

                </td>


                <td>
                  {student.course}
                </td>


                <td>

                  <div className="attendance">

                    <div className="progress">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${student.attendance}%`,
                        }}
                      ></div>

                    </div>

                    <span>
                      {student.attendance}%
                    </span>

                  </div>

                </td>


                <td>

                  <span className="grade">
                    {student.grade}
                  </span>

                </td>


                <td>

                  <span
                    className={`status ${
                      student.status === "Active"
                        ? "active-status"
                        : "inactive-status"
                    }`}
                  >

                    <i></i>

                    {student.status}

                  </span>

                </td>

              </tr>

            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="no-results"
              >
                No students found.
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}


/* =====================================================
   STUDENTS PAGE
===================================================== */

function StudentsPage({
  students,
  search,
  setSearch,
}) {
  return (
    <div className="page-card">

      <div className="welcome-section">

        <div>

          <p className="small-label">
            STUDENTS
          </p>

          <h1>
            All Students
          </h1>

          <p>
            Manage and view all students in your system.
          </p>

        </div>


        <button className="add-student">
          <span>＋</span>
          Add Student
        </button>

      </div>


      <div className="table-header">

        <div>
          <h3>
            Student List
          </h3>
        </div>


        <input
          className="page-search"
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>


      <StudentTable students={students} />

    </div>
  );
}


/* =====================================================
   COURSES PAGE
===================================================== */

function CoursesPage() {
  const courses = [
    ["Web Development", "320", "82%"],
    ["UI/UX Design", "245", "76%"],
    ["Graphic Design", "198", "68%"],
    ["JavaScript", "276", "89%"],
    ["React Development", "209", "74%"],
    ["Python Programming", "185", "63%"],
  ];

  return (
    <div className="page-card">

      <p className="small-label">
        COURSES
      </p>

      <h1>
        All Courses
      </h1>

      <p>
        Manage all courses and monitor student enrollment.
      </p>


      <div className="course-grid">

        {courses.map((course) => (

          <div
            className="course-card"
            key={course[0]}
          >

            <div className="stat-icon course-icon">
              ▣
            </div>

            <h3>
              {course[0]}
            </h3>

            <p>
              {course[1]} students enrolled
            </p>

            <div className="course-progress">

              <div
                className="progress-fill"
                style={{
                  width: course[2],
                }}
              ></div>

            </div>

            <span className="course-percent">
              {course[2]} completed
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}


/* =====================================================
   ATTENDANCE PAGE
===================================================== */

function AttendancePage() {
  return (
    <div className="page-card">

      <p className="small-label">
        ATTENDANCE
      </p>

      <h1>
        Attendance
      </h1>

      <p>
        Monitor student attendance and daily participation.
      </p>


      <div className="stats-grid">

        <div className="stat-card">

          <div>

            <p>
              Present Today
            </p>

            <h2>
              1,092
            </h2>

            <span className="growth">
              87.5%
            </span>

          </div>

          <div className="stat-icon attendance-icon">
            ✓
          </div>

        </div>


        <div className="stat-card">

          <div>

            <p>
              Absent Today
            </p>

            <h2>
              156
            </h2>

            <span className="stat-note">
              12.5% of students
            </span>

          </div>

          <div className="stat-icon result-icon">
            !
          </div>

        </div>

      </div>


      <div className="table-wrapper">

        <table>

          <thead>

            <tr>
              <th>STUDENT</th>
              <th>COURSE</th>
              <th>ATTENDANCE</th>
              <th>STATUS</th>
            </tr>

          </thead>


          <tbody>

            {studentsData.map((student) => (

              <tr key={student.id}>

                <td>

                  <div className="student-info">

                    <div className="student-avatar">
                      {student.name.charAt(0)}
                    </div>

                    <div>

                      <strong>
                        {student.name}
                      </strong>

                      <span>
                        {student.email}
                      </span>

                    </div>

                  </div>

                </td>

                <td>
                  {student.course}
                </td>

                <td>
                  {student.attendance}%
                </td>

                <td>

                  <span
                    className={`status ${
                      student.attendance >= 75
                        ? "active-status"
                        : "inactive-status"
                    }`}
                  >

                    <i></i>

                    {student.attendance >= 75
                      ? "Good"
                      : "Low"}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}


/* =====================================================
   RESULTS PAGE
===================================================== */

function ResultsPage() {
  return (
    <div className="page-card">

      <p className="small-label">
        RESULTS
      </p>

      <h1>
        Student Results
      </h1>

      <p>
        View overall student grades and academic performance.
      </p>


      <div className="table-wrapper">

        <table>

          <thead>

            <tr>
              <th>STUDENT</th>
              <th>COURSE</th>
              <th>GRADE</th>
              <th>PERFORMANCE</th>
              <th>STATUS</th>
            </tr>

          </thead>


          <tbody>

            {studentsData.map((student) => (

              <tr key={student.id}>

                <td>

                  <div className="student-info">

                    <div className="student-avatar">
                      {student.name.charAt(0)}
                    </div>

                    <div>

                      <strong>
                        {student.name}
                      </strong>

                      <span>
                        {student.email}
                      </span>

                    </div>

                  </div>

                </td>


                <td>
                  {student.course}
                </td>


                <td>

                  <span className="grade">
                    {student.grade}
                  </span>

                </td>


                <td>

                  <div className="attendance">

                    <div className="progress">

                      <div
                        className="progress-fill"
                        style={{
                          width: `${student.attendance}%`,
                        }}
                      ></div>

                    </div>

                    <span>
                      {student.attendance}%
                    </span>

                  </div>

                </td>


                <td>

                  <span className="status active-status">

                    <i></i>

                    Completed

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default App;