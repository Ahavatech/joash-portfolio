const express = require('express');
const router = express.Router();
const multer = require('multer');
const { cloudinary, storage } = require('../config/cloudinary');
const Project = require('../models/Project');

// Use the configured Cloudinary storage
const upload = multer({ storage });

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Add new project with image
router.post('/', upload.single('projectImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Project image is required' });
    }

    // Create new project using the Cloudinary URL from req.file
    const project = new Project({
      name: req.body.name,
      details: req.body.details,
      link: req.body.link,
      imageUrl: req.file.path // Cloudinary URL is automatically stored in path
    });

    const savedProject = await project.save();
    console.log('Saved project:', savedProject);

    res.status(201).json(savedProject);

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Failed to add project',
      details: error.message 
    });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Delete from Cloudinary if there's an image
    if (project.imageUrl) {
      const publicId = project.imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`portfolio/projects/${publicId}`);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;