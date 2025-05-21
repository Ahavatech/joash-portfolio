import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { getProjects } from '../utils/api';
import '../styles/Projects.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="projects-content">
        <h2 className="section-title">Projects</h2>
        <p className="section-intro">
          Each project I take on is focused on solving real-world problems using no-code platforms like Bubble and powerful automation tools.
        </p>
        <div className="projects-carousel">
          {loading ? (
            <div className="loading">Loading projects...</div>
          ) : (
            <Slider {...settings}>
              {projects.map(project => (
                <div key={project._id} className="project-card">
                  <div className="project-image">
                    <img src={project.imageUrl} alt={project.name} />
                  </div>
                  <div className="project-info">
                    <h3>{project.name}</h3>
                    <p>{project.details}</p>
                    <a 
                      href={project.link} 
                      className="project-link" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Visit Project
                    </a>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;