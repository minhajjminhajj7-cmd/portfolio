import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("admin");

    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  // Called after successful login
  const handleLogin = (adminData) => {
    setAdmin(adminData);
    setShowAdminLogin(false);
  };

  // Logout admin
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    setAdmin(null);
    setShowAdminLogin(false);
  };

  // Show Admin Login page
  if (showAdminLogin) {
    return (
      <div>
        <AdminLogin onLogin={handleLogin} />

        <button
          onClick={() => setShowAdminLogin(false)}
          className="fixed top-6 left-6 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
        >
          ← Back
        </button>
      </div>
    );
  }

  // Show Admin Dashboard after successful login
  if (admin) {
    return (
      <AdminDashboard
        admin={admin}
        onLogout={handleLogout}
      />
    );
  }

  // Normal Portfolio
  return (
    <div className="bg-gray-950 min-h-screen text-white">

      {/* Navigation */}
      <Navbar />

      {/* Main Portfolio */}
      <main>
        <Hero />

        <About />

        <Skills />

        <Projects />

        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Login Button */}
      <div className="fixed bottom-6 right-6">

        <button
          onClick={() => setShowAdminLogin(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-lg transition"
        >
          Admin Login
        </button>

      </div>

    </div>
  );
}

export default App;