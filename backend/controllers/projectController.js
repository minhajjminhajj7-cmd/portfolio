const db = require("../config/db");

// GET all projects
const getProjects = (req, res) => {
  const sql = "SELECT * FROM projects ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching projects:", err);

      return res.status(500).json({
        message: "Failed to fetch projects",
      });
    }

    res.json(results);
  });
};

// CREATE a new project
const createProject = (req, res) => {
  const {
    title,
    description,
    technologies,
    github_url,
    live_url,
    image_url,
  } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description are required",
    });
  }

  const sql = `
    INSERT INTO projects
    (title, description, technologies, github_url, live_url, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    description,
    technologies,
    github_url,
    live_url,
    image_url,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error creating project:", err);

      return res.status(500).json({
        message: "Failed to create project",
      });
    }

    res.status(201).json({
      message: "Project created successfully",
      projectId: result.insertId,
    });
  });
};

// UPDATE a project
const updateProject = (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    technologies,
    github_url,
    live_url,
    image_url,
  } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description are required",
    });
  }

  const sql = `
    UPDATE projects
    SET
      title = ?,
      description = ?,
      technologies = ?,
      github_url = ?,
      live_url = ?,
      image_url = ?
    WHERE id = ?
  `;

  const values = [
    title,
    description,
    technologies,
    github_url,
    live_url,
    image_url,
    id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating project:", err);

      return res.status(500).json({
        message: "Failed to update project",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project updated successfully",
    });
  });
};

// DELETE a project
const deleteProject = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM projects WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting project:", err);

      return res.status(500).json({
        message: "Failed to delete project",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json({
      message: "Project deleted successfully",
    });
  });
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};