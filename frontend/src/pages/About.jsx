import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <h1>About Me</h1>
      <p>
        Welcome to my website! My name is [Your Name], and I'm passionate about web development.
        This website serves as a showcase of my skills and capabilities as a web developer.
      </p>

      <h2>Contact Methods</h2>
      <p>
        You can reach out to me through various methods:
      </p>
      <ul>
        <li>Email: <a href="mailto:youremail@example.com">youremail@example.com</a></li>
        <li>LinkedIn: <a href="https://www.linkedin.com/in/your-profile">Your LinkedIn Profile</a></li>
        <li>GitHub: <a href="https://github.com/yourusername">Your GitHub Profile</a></li>
      </ul>

      <p>
        Feel free to get in touch with me if you have any questions, inquiries, or if you'd like
        to collaborate on a project. I'm always open to new opportunities and challenges.
      </p>
    </div>
  );
};

export default About;
