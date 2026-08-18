import { useEffect, useState } from "react";

const API_URL = "http://localhost:5001/api";

function AdminDashboard({ admin, onLogout }) {
  // =========================================================
  // DATA
  // =========================================================

  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // HERO STATES
  // =========================================================

  const [showHeroForm, setShowHeroForm] = useState(false);
  const [editingHero, setEditingHero] = useState(null);
  const [heroLoading, setHeroLoading] = useState(false);
  const [heroMessage, setHeroMessage] = useState("");

  const [heroForm, setHeroForm] = useState({
    greeting: "",
    name: "",
    title: "",
    description: "",
    projects_button_text: "",
    contact_button_text: "",
  });

  // =========================================================
  // ABOUT STATES
  // =========================================================

  const [showAboutForm, setShowAboutForm] = useState(false);
  const [editingAbout, setEditingAbout] = useState(null);
  const [aboutLoading, setAboutLoading] = useState(false);
  const [aboutMessage, setAboutMessage] = useState("");

  const [aboutForm, setAboutForm] = useState({
    heading: "",
    paragraph1: "",
    paragraph2: "",
  });

  // =========================================================
  // PROJECT STATES
  // =========================================================

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    technologies: "",
    github_url: "",
    live_url: "",
    image_url: "",
  });

  // =========================================================
  // SKILL STATES
  // =========================================================

  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillLoading, setSkillLoading] = useState(false);
  const [skillMessage, setSkillMessage] = useState("");

  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "",
    proficiency: 50,
  });

  // =========================================================
  // FETCH DASHBOARD DATA
  // =========================================================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setError("");

      const [
        heroResponse,
        aboutResponse,
        projectsResponse,
        skillsResponse,
        messagesResponse,
      ] = await Promise.all([
        fetch(`${API_URL}/hero`),
        fetch(`${API_URL}/about`),
        fetch(`${API_URL}/projects`),
        fetch(`${API_URL}/skills`),
        fetch(`${API_URL}/messages`),
      ]);

      if (!heroResponse.ok) {
        throw new Error("Failed to load hero");
      }

      if (!aboutResponse.ok) {
        throw new Error("Failed to load about");
      }

      if (!projectsResponse.ok) {
        throw new Error("Failed to load projects");
      }

      if (!skillsResponse.ok) {
        throw new Error("Failed to load skills");
      }

      if (!messagesResponse.ok) {
        throw new Error("Failed to load messages");
      }

      const heroData = await heroResponse.json();
      const aboutData = await aboutResponse.json();
      const projectsData = await projectsResponse.json();
      const skillsData = await skillsResponse.json();
      const messagesData = await messagesResponse.json();

      setHero(heroData);
      setAbout(aboutData);
      setProjects(projectsData);
      setSkills(skillsData);
      setMessages(messagesData);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // HERO
  // =========================================================

  const handleHeroChange = (e) => {
    setHeroForm({
      ...heroForm,
      [e.target.name]: e.target.value,
    });
  };

  const openAddHero = () => {
    setEditingHero(null);

    setHeroForm({
      greeting: "",
      name: "",
      title: "",
      description: "",
      projects_button_text: "",
      contact_button_text: "",
    });

    setHeroMessage("");
    setShowHeroForm(true);
  };

  const openEditHero = () => {
    if (!hero) return;

    setEditingHero(hero);

    setHeroForm({
      greeting: hero.greeting || "",
      name: hero.name || "",
      title: hero.title || "",
      description: hero.description || "",
      projects_button_text: hero.projects_button_text || "",
      contact_button_text: hero.contact_button_text || "",
    });

    setHeroMessage("");
    setShowHeroForm(true);
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();

    setHeroLoading(true);
    setHeroMessage("");

    try {
      const token = localStorage.getItem("token");

      const url = editingHero
        ? `${API_URL}/hero/${editingHero.id}`
        : `${API_URL}/hero`;

      const method = editingHero ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(heroForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save hero"
        );
      }

      setHeroMessage(
        editingHero
          ? "Hero updated successfully! 🚀"
          : "Hero added successfully! 🚀"
      );

      await fetchDashboardData();

      setTimeout(() => {
        setShowHeroForm(false);
        setEditingHero(null);
        setHeroMessage("");
      }, 1000);
    } catch (err) {
      console.error("Hero error:", err);
      setHeroMessage(err.message);
    } finally {
      setHeroLoading(false);
    }
  };

  const handleDeleteHero = async () => {
    if (!hero) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete your Hero content?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/hero/${hero.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete hero"
        );
      }

      setHero(null);

      alert("Hero deleted successfully! 🗑️");

      await fetchDashboardData();
    } catch (err) {
      console.error("Delete hero error:", err);
      alert(err.message);
    }
  };

  // =========================================================
  // ABOUT
  // =========================================================

  const handleAboutChange = (e) => {
    setAboutForm({
      ...aboutForm,
      [e.target.name]: e.target.value,
    });
  };

  const openAddAbout = () => {
    setEditingAbout(null);

    setAboutForm({
      heading: "",
      paragraph1: "",
      paragraph2: "",
    });

    setAboutMessage("");
    setShowAboutForm(true);
  };

  const openEditAbout = () => {
    if (!about) return;

    setEditingAbout(about);

    setAboutForm({
      heading: about.heading || "",
      paragraph1: about.paragraph1 || "",
      paragraph2: about.paragraph2 || "",
    });

    setAboutMessage("");
    setShowAboutForm(true);
  };

  const handleAboutSubmit = async (e) => {
    e.preventDefault();

    setAboutLoading(true);
    setAboutMessage("");

    try {
      const token = localStorage.getItem("token");

      const url = editingAbout
        ? `${API_URL}/about/${editingAbout.id}`
        : `${API_URL}/about`;

      const method = editingAbout ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(aboutForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save about"
        );
      }

      setAboutMessage(
        editingAbout
          ? "About updated successfully! 🚀"
          : "About added successfully! 🚀"
      );

      await fetchDashboardData();

      setTimeout(() => {
        setShowAboutForm(false);
        setEditingAbout(null);
        setAboutMessage("");
      }, 1000);
    } catch (err) {
      console.error("About error:", err);
      setAboutMessage(err.message);
    } finally {
      setAboutLoading(false);
    }
  };

  const handleDeleteAbout = async () => {
    if (!about) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete your About Me content?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/about/${about.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete about"
        );
      }

      setAbout(null);

      alert("About deleted successfully! 🗑️");

      await fetchDashboardData();
    } catch (err) {
      console.error("Delete about error:", err);
      alert(err.message);
    }
  };

  // =========================================================
  // PROJECTS
  // =========================================================

  const handleProjectChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    setProjectLoading(true);
    setProjectMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(projectForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create project"
        );
      }

      setProjectMessage(
        "Project added successfully! 🚀"
      );

      setProjectForm({
        title: "",
        description: "",
        technologies: "",
        github_url: "",
        live_url: "",
        image_url: "",
      });

      await fetchDashboardData();

      setTimeout(() => {
        setShowProjectForm(false);
        setProjectMessage("");
      }, 1000);
    } catch (err) {
      console.error("Add project error:", err);
      setProjectMessage(err.message);
    } finally {
      setProjectLoading(false);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();

    if (!editingProject) return;

    setProjectLoading(true);
    setProjectMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/projects/${editingProject.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editingProject.title,
            description: editingProject.description,
            technologies: editingProject.technologies,
            github_url: editingProject.github_url,
            live_url: editingProject.live_url,
            image_url: editingProject.image_url,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update project"
        );
      }

      setProjectMessage(
        "Project updated successfully! 🚀"
      );

      await fetchDashboardData();

      setTimeout(() => {
        setEditingProject(null);
        setProjectMessage("");
      }, 1000);
    } catch (err) {
      console.error("Update project error:", err);
      setProjectMessage(err.message);
    } finally {
      setProjectLoading(false);
    }
  };

  const handleDeleteProject = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete project"
        );
      }

      await fetchDashboardData();

      alert("Project deleted successfully! 🗑️");
    } catch (err) {
      console.error("Delete project error:", err);
      alert(err.message);
    }
  };

  // =========================================================
  // SKILLS
  // =========================================================

  const handleSkillChange = (e) => {
    setSkillForm({
      ...skillForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();

    setSkillLoading(true);
    setSkillMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/skills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: skillForm.name,
            category: skillForm.category,
            proficiency: Number(skillForm.proficiency),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create skill"
        );
      }

      setSkillMessage(
        "Skill added successfully! 🚀"
      );

      setSkillForm({
        name: "",
        category: "",
        proficiency: 50,
      });

      await fetchDashboardData();

      setTimeout(() => {
        setShowSkillForm(false);
        setSkillMessage("");
      }, 1000);
    } catch (err) {
      console.error("Add skill error:", err);
      setSkillMessage(err.message);
    } finally {
      setSkillLoading(false);
    }
  };

  const handleUpdateSkill = async (e) => {
    e.preventDefault();

    if (!editingSkill) return;

    setSkillLoading(true);
    setSkillMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/skills/${editingSkill.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editingSkill.name,
            category: editingSkill.category,
            proficiency: Number(
              editingSkill.proficiency
            ),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update skill"
        );
      }

      setSkillMessage(
        "Skill updated successfully! 🚀"
      );

      await fetchDashboardData();

      setTimeout(() => {
        setEditingSkill(null);
        setSkillMessage("");
      }, 1000);
    } catch (err) {
      console.error("Update skill error:", err);
      setSkillMessage(err.message);
    } finally {
      setSkillLoading(false);
    }
  };

  const handleDeleteSkill = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/skills/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete skill"
        );
      }

      await fetchDashboardData();

      alert("Skill deleted successfully! 🗑️");
    } catch (err) {
      console.error("Delete skill error:", err);
      alert(err.message);
    }
  };

  // =========================================================
  // MESSAGES
  // =========================================================

  const handleDeleteMessage = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the message from "${name}"?`
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/messages/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete message"
        );
      }

      await fetchDashboardData();

      alert("Message deleted successfully! 🗑️");
    } catch (err) {
      console.error("Delete message error:", err);
      alert(err.message);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-5xl mb-4">⚙️</div>
          <p className="text-xl">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // DASHBOARD
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* HEADER */}

      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-400 text-sm">
              Welcome back,{" "}
              {admin?.name || "Admin"}
            </p>
          </div>

          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* ERROR */}

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-5 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* ===================================================
            STATISTICS
        ==================================================== */}

        <div className="grid md:grid-cols-5 gap-6 mb-12">

          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-2">
              Hero
            </p>

            <h2 className="text-4xl font-bold">
              {hero ? "1" : "0"}
            </h2>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-2">
              About
            </p>

            <h2 className="text-4xl font-bold">
              {about ? "1" : "0"}
            </h2>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-2">
              Projects
            </p>

            <h2 className="text-4xl font-bold">
              {projects.length}
            </h2>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-2">
              Skills
            </p>

            <h2 className="text-4xl font-bold">
              {skills.length}
            </h2>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-2">
              Messages
            </p>

            <h2 className="text-4xl font-bold">
              {messages.length}
            </h2>
          </div>

        </div>

        {/* ===================================================
            HERO
        ==================================================== */}

        <section className="mb-12">

          <div className="flex justify-between items-center mb-5">

            <div>
              <h2 className="text-2xl font-bold">
                Hero Section
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Manage the content displayed at the top
                of your portfolio.
              </p>
            </div>

            {!hero && (
              <button
                onClick={openAddHero}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                + Add Hero
              </button>
            )}

          </div>

          {/* HERO FORM */}

          {showHeroForm && (
            <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-blue-600">

              <div className="flex justify-between items-center mb-6">

                <h3 className="text-xl font-semibold">
                  {editingHero
                    ? "Edit Hero"
                    : "Add Hero"}
                </h3>

                <button
                  onClick={() => {
                    setShowHeroForm(false);
                    setEditingHero(null);
                    setHeroMessage("");
                  }}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ✕
                </button>

              </div>

              <form onSubmit={handleHeroSubmit}>

                {/* GREETING */}

                <div className="mb-5">
                  <label className="block text-gray-300 mb-2">
                    Greeting
                  </label>

                  <input
                    type="text"
                    name="greeting"
                    value={heroForm.greeting}
                    onChange={handleHeroChange}
                    placeholder="WELCOME TO MY PORTFOLIO"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* NAME */}

                <div className="mb-5">
                  <label className="block text-gray-300 mb-2">
                    Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={heroForm.name}
                    onChange={handleHeroChange}
                    required
                    placeholder="e.g. Minhajj"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* TITLE */}

                <div className="mb-5">
                  <label className="block text-gray-300 mb-2">
                    Professional Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={heroForm.title}
                    onChange={handleHeroChange}
                    placeholder="e.g. Computer Science Student | Software Developer"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* DESCRIPTION */}

                <div className="mb-5">
                  <label className="block text-gray-300 mb-2">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={heroForm.description}
                    onChange={handleHeroChange}
                    rows="5"
                    placeholder="Write your introduction..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* BUTTONS */}

                <div className="grid md:grid-cols-2 gap-5 mb-6">

                  <div>
                    <label className="block text-gray-300 mb-2">
                      Projects Button Text
                    </label>

                    <input
                      type="text"
                      name="projects_button_text"
                      value={
                        heroForm.projects_button_text
                      }
                      onChange={handleHeroChange}
                      placeholder="View My Work"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      Contact Button Text
                    </label>

                    <input
                      type="text"
                      name="contact_button_text"
                      value={
                        heroForm.contact_button_text
                      }
                      onChange={handleHeroChange}
                      placeholder="Let's Talk"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3"
                    />
                  </div>

                </div>

                {heroMessage && (
                  <div className="mb-5 bg-blue-500/10 border border-blue-500 text-blue-400 px-4 py-3 rounded-lg">
                    {heroMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={heroLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold"
                >
                  {heroLoading
                    ? "Saving..."
                    : editingHero
                    ? "Update Hero"
                    : "Add Hero"}
                </button>

              </form>
            </div>
          )}

          {/* NO HERO */}

          {!hero && !showHeroForm && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">

              <div className="text-5xl mb-4">
                👋
              </div>

              <h3 className="text-xl font-semibold mb-2">
                No Hero Content
              </h3>

              <p className="text-gray-400 mb-6">
                Add your Hero information to display it
                on your portfolio.
              </p>

              <button
                onClick={openAddHero}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
              >
                + Add Hero
              </button>

            </div>
          )}

          {/* HERO DISPLAY */}

          {hero && !showHeroForm && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

              <div className="flex flex-col md:flex-row justify-between gap-6">

                <div className="flex-1">

                  {hero.greeting && (
                    <p className="text-gray-400 text-sm mb-2">
                      {hero.greeting}
                    </p>
                  )}

                  <h3 className="text-3xl font-bold mb-2">
                    {hero.name}
                  </h3>

                  <h4 className="text-xl text-blue-400 mb-4">
                    {hero.title}
                  </h4>

                  <p className="text-gray-400 leading-relaxed mb-5">
                    {hero.description}
                  </p>

                  <div className="flex flex-wrap gap-3">

                    {hero.projects_button_text && (
                      <span className="bg-gray-800 px-4 py-2 rounded-lg text-sm">
                        {hero.projects_button_text}
                      </span>
                    )}

                    {hero.contact_button_text && (
                      <span className="bg-gray-800 px-4 py-2 rounded-lg text-sm">
                        {hero.contact_button_text}
                      </span>
                    )}

                  </div>

                </div>

                <div className="flex gap-3 items-start">

                  <button
                    onClick={openEditHero}
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDeleteHero}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          )}

        </section>

        {/* ===================================================
            ABOUT ME
        ==================================================== */}

        <section className="mb-12">

          <div className="flex justify-between items-center mb-5">

            <div>
              <h2 className="text-2xl font-bold">
                About Me
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Manage the information displayed in your
                About Me section.
              </p>
            </div>

            {!about && (
              <button
                onClick={openAddAbout}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
              >
                + Add About
              </button>
            )}

          </div>

          {/* ABOUT FORM */}

          {showAboutForm && (
            <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-blue-600">

              <div className="flex justify-between items-center mb-6">

                <h3 className="text-xl font-semibold">
                  {editingAbout
                    ? "Edit About Me"
                    : "Add About Me"}
                </h3>

                <button
                  onClick={() => {
                    setShowAboutForm(false);
                    setEditingAbout(null);
                    setAboutMessage("");
                  }}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ✕
                </button>

              </div>

              <form onSubmit={handleAboutSubmit}>

                {/* HEADING */}

                <div className="mb-5">

                  <label className="block text-gray-300 mb-2">
                    Heading *
                  </label>

                  <input
                    type="text"
                    name="heading"
                    value={aboutForm.heading}
                    onChange={handleAboutChange}
                    required
                    placeholder="e.g. About Me"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  />

                </div>

                {/* PARAGRAPH 1 */}

                <div className="mb-5">

                  <label className="block text-gray-300 mb-2">
                    First Paragraph
                  </label>

                  <textarea
                    name="paragraph1"
                    value={aboutForm.paragraph1}
                    onChange={handleAboutChange}
                    rows="6"
                    placeholder="Tell visitors about yourself..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  />

                </div>

                {/* PARAGRAPH 2 */}

                <div className="mb-6">

                  <label className="block text-gray-300 mb-2">
                    Second Paragraph
                  </label>

                  <textarea
                    name="paragraph2"
                    value={aboutForm.paragraph2}
                    onChange={handleAboutChange}
                    rows="6"
                    placeholder="Tell visitors more about your skills, goals and interests..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  />

                </div>

                {aboutMessage && (
                  <div className="mb-5 bg-blue-500/10 border border-blue-500 text-blue-400 px-4 py-3 rounded-lg">
                    {aboutMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={aboutLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold"
                >
                  {aboutLoading
                    ? "Saving..."
                    : editingAbout
                    ? "Update About"
                    : "Add About"}
                </button>

              </form>

            </div>
          )}

          {/* NO ABOUT */}

          {!about && !showAboutForm && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">

              <div className="text-5xl mb-4">
                👤
              </div>

              <h3 className="text-xl font-semibold mb-2">
                No About Me Content
              </h3>

              <p className="text-gray-400 mb-6">
                Add information about yourself to display
                it on your portfolio.
              </p>

              <button
                onClick={openAddAbout}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
              >
                + Add About
              </button>

            </div>
          )}

          {/* ABOUT DISPLAY */}

          {about && !showAboutForm && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

              <div className="flex flex-col md:flex-row justify-between gap-6">

                <div className="flex-1">

                  <h3 className="text-2xl font-bold mb-5">
                    {about.heading}
                  </h3>

                  {about.paragraph1 && (
                    <p className="text-gray-400 leading-relaxed mb-4 whitespace-pre-wrap">
                      {about.paragraph1}
                    </p>
                  )}

                  {about.paragraph2 && (
                    <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                      {about.paragraph2}
                    </p>
                  )}

                </div>

                <div className="flex gap-3 items-start">

                  <button
                    onClick={openEditAbout}
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDeleteAbout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          )}

        </section>

        {/* ===================================================
            PROJECTS
        ==================================================== */}

        <section className="mb-12">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold">
              Projects
            </h2>

            <button
              onClick={() => {
                setShowProjectForm(!showProjectForm);
                setEditingProject(null);
                setProjectMessage("");
              }}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              {showProjectForm
                ? "Cancel"
                : "+ Add Project"}
            </button>

          </div>

          {/* ADD PROJECT */}

          {showProjectForm && (
            <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">

              <h3 className="text-xl font-semibold mb-6">
                Add New Project
              </h3>

              <form onSubmit={handleAddProject}>

                <input
                  type="text"
                  name="title"
                  value={projectForm.title}
                  onChange={handleProjectChange}
                  required
                  placeholder="Project title"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <textarea
                  name="description"
                  value={projectForm.description}
                  onChange={handleProjectChange}
                  required
                  rows="4"
                  placeholder="Project description"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <input
                  type="text"
                  name="technologies"
                  value={projectForm.technologies}
                  onChange={handleProjectChange}
                  placeholder="React, Node.js, MySQL"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <input
                  type="url"
                  name="github_url"
                  value={projectForm.github_url}
                  onChange={handleProjectChange}
                  placeholder="GitHub URL"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <input
                  type="url"
                  name="live_url"
                  value={projectForm.live_url}
                  onChange={handleProjectChange}
                  placeholder="Live Demo URL"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <input
                  type="url"
                  name="image_url"
                  value={projectForm.image_url}
                  onChange={handleProjectChange}
                  placeholder="Image URL"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-6"
                />

                {projectMessage && (
                  <div className="mb-5 text-blue-400">
                    {projectMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={projectLoading}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
                >
                  {projectLoading
                    ? "Adding..."
                    : "Add Project"}
                </button>

              </form>

            </div>
          )}

          {/* EDIT PROJECT */}

          {editingProject && (
            <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-yellow-600">

              <h3 className="text-xl font-semibold mb-6">
                Edit Project
              </h3>

              <form onSubmit={handleUpdateProject}>

                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      title: e.target.value,
                    })
                  }
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <textarea
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value,
                    })
                  }
                  required
                  rows="4"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <input
                  type="text"
                  value={editingProject.technologies || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      technologies: e.target.value,
                    })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <input
                  type="url"
                  value={editingProject.github_url || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      github_url: e.target.value,
                    })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <input
                  type="url"
                  value={editingProject.live_url || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      live_url: e.target.value,
                    })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <input
                  type="url"
                  value={editingProject.image_url || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      image_url: e.target.value,
                    })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-6"
                />

                {projectMessage && (
                  <div className="mb-5 text-blue-400">
                    {projectMessage}
                  </div>
                )}

                <div className="flex gap-3">

                  <button
                    type="submit"
                    disabled={projectLoading}
                    className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg"
                  >
                    {projectLoading
                      ? "Updating..."
                      : "Update Project"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject(null);
                      setProjectMessage("");
                    }}
                    className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>
          )}

          {/* PROJECT LIST */}

          <div className="bg-gray-900 rounded-xl overflow-hidden">

            {projects.length === 0 ? (
              <p className="p-6 text-gray-400">
                No projects found.
              </p>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="border-b border-gray-800 p-5 flex flex-col md:flex-row justify-between gap-5"
                >

                  <div className="flex-1">

                    <h3 className="font-semibold text-lg">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      {project.technologies ||
                        "No technologies specified"}
                    </p>

                    <p className="text-gray-500 text-sm mt-2">
                      {project.description}
                    </p>

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() => {
                        setEditingProject({
                          ...project,
                        });

                        setShowProjectForm(false);
                      }}
                      className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteProject(
                          project.id,
                          project.title
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>

        </section>

        {/* ===================================================
            SKILLS
        ==================================================== */}

        <section className="mb-12">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold">
              Skills
            </h2>

            <button
              onClick={() => {
                setShowSkillForm(!showSkillForm);
                setEditingSkill(null);
                setSkillMessage("");
              }}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              {showSkillForm
                ? "Cancel"
                : "+ Add Skill"}
            </button>

          </div>

          {/* ADD SKILL */}

          {showSkillForm && (
            <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-800">

              <h3 className="text-xl font-semibold mb-6">
                Add New Skill
              </h3>

              <form onSubmit={handleAddSkill}>

                <input
                  type="text"
                  name="name"
                  value={skillForm.name}
                  onChange={handleSkillChange}
                  required
                  placeholder="Skill name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <input
                  type="text"
                  name="category"
                  value={skillForm.category}
                  onChange={handleSkillChange}
                  placeholder="Category"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <label className="block text-gray-300 mb-2">
                  Proficiency:{" "}
                  {skillForm.proficiency}%
                </label>

                <input
                  type="range"
                  name="proficiency"
                  min="0"
                  max="100"
                  value={skillForm.proficiency}
                  onChange={handleSkillChange}
                  className="w-full mb-6"
                />

                {skillMessage && (
                  <div className="mb-5 text-blue-400">
                    {skillMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={skillLoading}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
                >
                  {skillLoading
                    ? "Adding..."
                    : "Add Skill"}
                </button>

              </form>

            </div>
          )}

          {/* EDIT SKILL */}

          {editingSkill && (
            <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-yellow-600">

              <h3 className="text-xl font-semibold mb-6">
                Edit Skill
              </h3>

              <form onSubmit={handleUpdateSkill}>

                <input
                  type="text"
                  value={editingSkill.name}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      name: e.target.value,
                    })
                  }
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <input
                  type="text"
                  value={editingSkill.category || ""}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      category: e.target.value,
                    })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 mb-4"
                />

                <label className="block text-gray-300 mb-2">
                  Proficiency:{" "}
                  {editingSkill.proficiency}%
                </label>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editingSkill.proficiency}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      proficiency: e.target.value,
                    })
                  }
                  className="w-full mb-6"
                />

                {skillMessage && (
                  <div className="mb-5 text-blue-400">
                    {skillMessage}
                  </div>
                )}

                <div className="flex gap-3">

                  <button
                    type="submit"
                    disabled={skillLoading}
                    className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 rounded-lg"
                  >
                    {skillLoading
                      ? "Updating..."
                      : "Update Skill"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingSkill(null);
                      setSkillMessage("");
                    }}
                    className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>
          )}

          {/* SKILLS LIST */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {skills.length === 0 ? (
              <p className="text-gray-400">
                No skills found.
              </p>
            ) : (
              skills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-gray-800 rounded-xl p-5"
                >

                  <div className="flex justify-between mb-2">

                    <h3 className="font-semibold">
                      {skill.name}
                    </h3>

                    <span className="text-blue-400">
                      {skill.proficiency}%
                    </span>

                  </div>

                  <p className="text-gray-400 text-sm mb-4">
                    {skill.category ||
                      "No category"}
                  </p>

                  <div className="w-full bg-gray-700 rounded-full h-2 mb-5">

                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${skill.proficiency}%`,
                      }}
                    />

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={() => {
                        setEditingSkill({
                          ...skill,
                        });

                        setShowSkillForm(false);
                      }}
                      className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteSkill(
                          skill.id,
                          skill.name
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>

        </section>

        {/* ===================================================
            MESSAGES
        ==================================================== */}

        <section className="mb-12">

          <div className="flex justify-between items-center mb-5">

            <div>
              <h2 className="text-2xl font-bold">
                Messages
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                Messages received from your portfolio.
              </p>
            </div>

            <button
              onClick={fetchDashboardData}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              🔄 Refresh
            </button>

          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">

            <p className="text-gray-400 text-sm">
              Total Messages
            </p>

            <h3 className="text-3xl font-bold mt-1">
              {messages.length}
            </h3>

          </div>

          {messages.length === 0 ? (

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">

              <div className="text-5xl mb-4">
                📭
              </div>

              <h3 className="text-xl font-semibold mb-2">
                No Messages
              </h3>

              <p className="text-gray-400">
                You haven't received any messages yet.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {messages.map((message) => (

                <div
                  key={message.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6"
                >

                  <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-5">

                    <div className="flex items-start gap-4">

                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold flex-shrink-0">
                        {message.name
                          ? message.name
                              .charAt(0)
                              .toUpperCase()
                          : "?"}
                      </div>

                      <div>

                        <h3 className="text-lg font-semibold">
                          {message.name}
                        </h3>

                        <a
                          href={`mailto:${message.email}`}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          {message.email}
                        </a>

                      </div>

                    </div>

                    <div className="text-gray-500 text-sm">
                      {message.created_at
                        ? new Date(
                            message.created_at
                          ).toLocaleString()
                        : "Unknown date"}
                    </div>

                  </div>

                  <div className="bg-gray-800 rounded-lg p-5 mb-5">

                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {message.message}
                    </p>

                  </div>

                  <div className="flex justify-end">

                    <button
                      onClick={() =>
                        handleDeleteMessage(
                          message.id,
                          message.name
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;
