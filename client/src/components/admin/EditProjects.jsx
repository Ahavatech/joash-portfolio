import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject, addProject } from '../../utils/api';
import '../../styles/Admin/EditProjects.css';

const EditProjects = () => {
  // State management
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newProject, setNewProject] = useState({
    name: '',
    details: '',
    link: ''
  });

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        setProjects(projects.filter(project => project._id !== projectId));
      } catch (error) {
        setError('Failed to delete project');
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedImage) {
      setError('Please select a project image');
      return;
    }

    try {
      setSaveLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('projectImage', selectedImage);
      formData.append('name', newProject.name);
      formData.append('details', newProject.details);
      formData.append('link', newProject.link);

      const addedProject = await addProject(formData);
      setProjects(prevProjects => [...prevProjects, addedProject]);
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      setError('Failed to add project. Please try again.');
      console.error('Error adding project:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  const resetForm = () => {
    setNewProject({ name: '', details: '', link: '' });
    setSelectedImage(null);
    setImagePreview(null);
    setError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <div className="edit-projects">
      <div className="projects-header">
        <h3>My Projects</h3>
        <button 
          className="add-button"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Project
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="projects-list">
        {projects.map(project => (
          <div key={project._id} className="project-item">
            <div className="project-image">
              <img src={project.imageUrl} alt={project.name} />
            </div>
            <div className="project-info">
              <h4>{project.name}</h4>
              <p>{project.details}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </div>
            <button 
              className="delete-button"
              onClick={() => handleDelete(project._id)}
              title="Delete Project"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Project</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Image</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    id="project-image"
                    hidden
                  />
                  <label htmlFor="project-image" className="image-upload-label">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Project preview" 
                        className="image-preview" 
                      />
                    ) : (
                      <div className="upload-placeholder">
                        Click to upload image
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({
                    ...newProject,
                    name: e.target.value
                  })}
                  required
                  placeholder="Enter project name"
                />
              </div>

              <div className="form-group">
                <label>Details</label>
                <textarea
                  value={newProject.details}
                  onChange={(e) => setNewProject({
                    ...newProject,
                    details: e.target.value
                  })}
                  required
                  rows={4}
                  placeholder="Describe your project"
                />
              </div>

              <div className="form-group">
                <label>Project Link</label>
                <input
                  type="url"
                  value={newProject.link}
                  onChange={(e) => setNewProject({
                    ...newProject,
                    link: e.target.value
                  })}
                  required
                  placeholder="https://example.com"
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="submit" 
                  className="save-button"
                  disabled={saveLoading}
                >
                  {saveLoading ? 'Saving...' : 'Save Project'}
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProjects;