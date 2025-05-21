import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// Fallback data for development
const fallbackData = {
  about: {
    title: "About Me",
    content: "Default about content"
  },
  skills: [
    { name: "Figma", icon: "/figma-icon.svg", backgroundColor: "#ff4f1f" },
    { name: "Bubble.io", icon: "/bubble-icon.svg", backgroundColor: "#000000" },
    { name: "OpenAI", icon: "/openai-icon.svg", backgroundColor: "#10a37f" }
  ],
  projects: [],
  reviews: [
    {
      name: "Tevin Lowes",
      position: "CEO",
      company: "Holmes Inc.",
      review: "Securing your site is a must. And we got that taken care of, so you don't need to worry."
    }
  ]
};

export const getAbout = async () => {
  try {
    const response = await fetch('/api/about');
    if (!response.ok) {
      throw new Error('Failed to fetch about content');
    }
    const data = await response.json();
    console.log('API Response:', data); // Debug log
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const updateAbout = async (data) => {
  try {
    const response = await fetch('/api/about', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: data.content,
        keywords: data.keywords
      }),
      credentials: 'include' // Include if you're using session-based auth
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getSkills = async () => {
  try {
    const response = await api.get('/skills');
    return response.data;
  } catch (error) {
    console.warn('Using fallback data for Skills section:', error.message);
    return fallbackData.skills;
  }
};

export const addSkill = async (skillData) => {
  try {
    const response = await api.post('/skills', skillData);
    return response.data;
  } catch (error) {
    console.error('Error adding skill:', error);
    throw error;
  }
};

export const deleteSkill = async (skillId) => {
  try {
    const response = await api.delete(`/skills/${skillId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting skill:', error);
    throw error;
  }
};

export const getReviews = async () => {
  try {
    const response = await api.get('/reviews/approved');
    return response.data;
  } catch (error) {
    console.warn('Using fallback data for Reviews section:', error.message);
    return fallbackData.reviews;
  }
};

// Add these new functions after the existing exports

export const uploadProfileImage = async (formData) => {
  try {
    const response = await api.post('/admin/upload-profile', formData);
    console.log('Upload response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/admin/profile');
    return response.data;
  } catch (error) {
    console.error('Profile fetch error:', error);
    return null;
  }
};

export const getProfileImage = async () => {
  try {
    const profile = await getProfile();
    return { imageUrl: profile?.imageUrl || null };
  } catch (error) {
    console.error('Error getting profile image:', error);
    return { imageUrl: null };
  }
};


export const deleteProfileImage = async () => {
  try {
    const response = await api.delete('/admin/profile-image');
    return response.data;
  } catch (error) {
    console.error('Error deleting profile image:', error);
    throw error;
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageUrl: data.imageUrl,
        shortBio: data.shortBio
      }),
    });

    if (!response.ok) throw new Error('Failed to update profile');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateCredentials = async (credentials) => {
  try {
    const response = await api.post('/admin/update-credentials', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const addProject = async (formData) => {
  try {
    const response = await api.post('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};