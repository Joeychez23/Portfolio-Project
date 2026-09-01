import { useState, useEffect } from 'react';
// require('dotenv').config()

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [messageSent, setMessageSent] = useState(localStorage.getItem("messageBool"));
  //   const [messageSent, setMessageSent] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const handlesMessage = async (email, name, subject, message) => {
    setIsSending(true);
    const url = process.env.REACT_APP_EMAIL_URL;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        subject,
        message
      })
    };
    //     const data = await fetch(url, options).then(res => res.json())
    // console.log(data)
    try {
      // const response = await fetch(url, options);
      const data = await fetch(url, options).then(res => res.json())
      console.log(data)
      // const data = await response.json();

      if (data.status === 200) {

        window.alert("Message Sent Successfully");
        document.getElementById("contact-form").reset();
        localStorage.setItem("messageBool", true);
      } else {
        window.alert("Failed To Send Message");
      }
    } catch (error) {
      window.alert("Failed To Send Message");
    } finally {
      setIsSending(false);
    }
  }

  const projects = [
    {
      title: "Chess Application",
      description: "An immersive chess game that leverages HTML5 canvas. Using AWS CloudFront and S3 to ensure seamless content delivery and efficient storage management, along with the Implemention of AWS Lambda functions.",
      tech: ["Webpack", "Lambda", "DynamoDB"],
      image: "./chess.png",
      link: "https://chess.aws-prac-route53.com/"
    },
    {
      title: "Lakeside Cabin",
      description: "A broadcast application which is delivered over the air allowing Sinclair to broaden it goals to more than just traditional over the air broadcasting.",
      tech: ["Webpack", "Jquery", "Object Oriented Programming"],
      image: "./cabin.png"
    },
    {
      title: "Data Migration Service",
      description: "A Java based service using Spring Core which migrates hundreds of millions of row of data into lower enviroments.",
      tech: ["Java", "Spring Core", "SQL"],
      image: "./migrate.png"
    },
    {
      title: "Google Book Search",
      description: "A GraphQL application which allows the user to seach of books and save book for later when an account is made",
      tech: ["GraphQL", "Javascript", "MongoDB"],
      image: "./books.png",
      link: "https://books.aws-prac-route53.com/"
    },
    {
      title: "AWS Lambdas",
      description: "Backend Lambda's and Terraform to support the inquiry service and the Chess application",
      tech: ["Javascript", "Lambda", "Terraform"],
      image: "./lambdas.png",
      link: "https://github.com/Joeychez23/Lambdas/"
    },
    // {
    //   title: "Merge Sort Visualizer",
    //   description: "An application which generates a random array that will be sorted visually in O(logN).",
    //   tech: ["Merge Sort", "React", "Javascript"],
    //   image: "./merge.png",
    //   link: "https://merge-sort.aws-prac-route53.com/"
    // },
    {
      title: "LeetCode",
      description: "My LeetCode Profile",
      tech: ["Data Structures", "Java", "Javascript"],
      image: "./leetcode.png",
      link: "https://leetcode.com/u/jbsanchez23/"
    },
  ];

  let social = [
    {
      "site": "Github",
      "link": "https://github.com/joeychez23"
    },
    {
      "site": "Linkedln",
      "link": "https://www.linkedin.com/in/joseph-sanchez-b93b2b237/"
    }
  ]

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 87 },
    { name: "AWS", level: 90 },
    { name: "Lambda", level: 85 },
    { name: "Java", level: 80 },
    { name: "OOP", level: 80 },
    { name: "Spring", level: 75 },
    { name: "Node.js", level: 90 },
    { name: "SQL", level: 70 },
    { name: "MongoDB", level: 75 },
    { name: "DynamoDB", level: 85 },
    { name: "Git/GitHub", level: 95 }
  ];

  return (
    <div className="site">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-inner">
          <button onClick={() => scrollToSection('home')} className="logo gradient-text">Joseph Sanchez</button>

          {/* Desktop Nav */}
          <ul className="desktop-nav">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className={`nav-link ${activeSection === item ? 'active' : ''}`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-menu-list">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className={`mobile-nav-link ${activeSection === item ? 'active' : ''}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1 className="hero-title">
              Solving Problems, <span className="gradient-text">One Line of Code at a Time</span>
            </h1>
            <p className="hero-subtitle">
              Software Engineer | Cloud & Backend Systems
            </p>
            <div className="hero-buttons">
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-primary"
              >
                Get in Touch
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-outline"
              >
                View My Work
              </button>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image-frame">
              <img
                src="./photo.png"
                alt="Professional developer portrait"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section section-white">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Skilled Software Engineer with experience developing cloud infrastructure using AWS/Terraform, along with developing applications in Spring, React, and Webpack. Proficient in multiple programming languages, including Java, JavaScript, Python, and C#. Adept at developing backend infrastructure, integrating secure authentication, and contributing to content management systems. Looking to leverage my skills to contribute to innovative projects and integrate myself into a robust team where I can learn from my peers and continue my journey as a Software Engineer.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-list">
              <div className="about-item">
                <div className="about-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4>Experience</h4>
                  <p>3+ years of professional development experience</p>
                </div>
              </div>

              <div className="about-item">
                <div className="about-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4>Education</h4>
                  <p>Full-Stack Development Certification, University of Washington</p>
                  <p>Computer Science, Washington State University</p>
                </div>
              </div>

              <div className="about-item">
                <div className="about-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4>Certifications</h4>
                  <p>AWS Certified Solutions Architect - Associate</p>
                  <p>AWS Certified Cloud Practitioner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section section-gray">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Technical Skills</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Here are some of the technologies I've been working with recently
            </p>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-header">
                  <h3>{skill.name}</h3>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="tools-section">
            <h3 className="tools-title">Tools &amp; Technologies</h3>
            <div className="tools-list">
              {[
                "JavaScript", "Java", "Python", "C#", "React", "Node.js", "Webpack", "Spring",
                "GraphQL", "Jest", "Git", "GitHub/GitLab", "CI/CD", "Terrafrom", "EC2(linux)", "ALB", "Auto Scaling", "S3", "CloudFront", "API GW", "Lambda", "Route 53(Subnets)"
              ].map((tool, index) => (
                <span
                  key={index}
                  className="tool-tag"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section section-white">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Some of the projects I've built that showcase my technical abilities and problem-solving approach
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card"
              >
                <div className="project-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                  />
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="tech-tag"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="project-footer">
                  {project.link ? (
                    <button
                      onClick={(event) => { event.preventDefault(); window.open(project.link, '_blank', 'noopener,noreferrer') }}
                      className="project-btn"
                    > View Project
                    </button>
                  ) : (
                    <button
                      className="project-btn project-btn-disabled"
                    >
                      Project Not Viewable
                    </button>
                  )}
                </div>
              </div>


            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section section-gray">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              I'm currently looking for new opportunities and would love to hear from you!
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-form-card">
              <form id="contact-form" className="contact-form">
                <div>
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="form-input"
                    placeholder="your subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    className="form-input"
                    placeholder="Tell me about your opportunity..."
                  ></textarea>
                </div>
                {messageSent ? (
                  <button
                    type="submit"
                    className="submit-btn-disabled"
                    disabled={true}
                  > Message Sent </button>
                ) : (
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSending}
                    onClick={(event) => {
                      event.preventDefault();
                      let emailRegex = RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
                      let emailStr = document.getElementById("email").value;
                      let nameStr = document.getElementById("name").value;
                      let subjectStr = document.getElementById("subject").value;
                      let messageStr = document.getElementById("message").value;
                      if (emailRegex.test(emailStr) && nameStr.length > 1 && subjectStr.length > 1 && messageStr.length > 1) {
                        handlesMessage(emailStr, nameStr, subjectStr, messageStr);
                      }
                    }}
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </button>
                )}
              </form>
            </div>

            <div className="contact-info">
              <div className="info-card">
                <h3>Contact Information</h3>
                <div className="info-list">
                  <div className="info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p>joeychez23@outlook.com</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p>+1 (425) 209-8421</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p>Bothell, WA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Connect With Me</h3>
                <div className="connect-links">
                  {social.map((idx, index) => (
                    <a
                      key={index}
                      href={`${idx.link}`}
                      target='_blank'
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      {idx.site}
                    </a>
                  ))}
                </div>
              </div>

              <div className="info-card">
                <h3>Download Resume</h3>
                <button
                  onClick={(event) => { event.preventDefault(); window.open('./Resume.pdf', '_blank', 'noopener,noreferrer'); }}
                  className="download-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download PDF
                </button>
              </div>

              <div className="info-card">
                <h3>Download Letter of Recommendation</h3>
                <button
                  onClick={(event) => { event.preventDefault(); window.open('./Letter_of_Recommendation-compressed.pdf', '_blank', 'noopener,noreferrer'); }}
                  className="download-btn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="section-container">
          <div className="footer-top">
            <div className="footer-brand">
              <button onClick={() => scrollToSection('home')} className="logo gradient-text">Joseph Sanchez</button>
              <p className="footer-tagline">Full Stack Developer</p>
            </div>

            <div className="footer-social">
              {social.map((idx, index) => (
                <a
                  key={index}
                  href={`${idx.link}`}
                  target='_blank'
                  rel="noopener noreferrer"
                >
                  {idx.site}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Joseph Sanchez. All rights reserved.</p>
            <p>Built with React</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
