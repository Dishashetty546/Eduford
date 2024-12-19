import React from 'react';
import './app.css'; // Make sure this contains relevant styles
import Home from '../../src/assets/Home.png';
import img1 from '../../src/assets/img1.png';
import img2 from '../../src/assets/img2.png';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span>Your Path to Success Starts Here: Master Interviews with AI Technology</span>
            </h1>
            <p>
              Be part of a community of professionals boosting their interview readiness with AI-powered mock sessions, real-time feedback, and tailored insights for continuous improvement.
            </p>
          </div>
          <div className="hero-image">
            <img src={Home} alt="Hero pic" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="feature1">
        <h2>Why Choose Our Platform?</h2>
        <div className="feature-list">
          <div className="feature-items">
            <h3>AI-Driven Mock Interviews</h3>
            <p>
              Our platform uses advanced AI technology to generate personalized mock interview questions tailored to your unique skill set. These questions simulate real-life interview scenarios, helping you to practice effectively and build confidence for any interview.
            </p>
          </div>
          <div className="feature-items">
            <h3>Real-Time Feedback</h3>
            <p>
              Receive instant, constructive feedback after every mock interview. With detailed performance insights, you can track your progress over time, identify areas for improvement, and fine-tune your responses to increase your chances of success.
            </p>
          </div>
          <div className="feature-items">
            <h3>HR & Technical Interviews</h3>
            <p>
              Choose between HR-style interviews, technical MCQs, or a mix of both. Practice interviews that reflect real-world interview formats for a holistic preparation.
            </p>
          </div>
          <div className="feature-items">
            <h3>Progress Tracking</h3>
            <p>
              Track your performance over time with detailed analytics that show your strengths and weaknesses. Our platform provides you with actionable insights, allowing you to visualize your improvement and strategically focus on areas that need attention.
            </p>
          </div>
        </div>
      </section>

      {/* Feature 2 Section */}
      <section className="feature-section" id="feature2">
        <div className="feature-item">
          <div className="feature-text">
            <h2>Become the Ideal Applicant</h2>
            <p>
              Build the skills, confidence, and mindset top employers are looking for. Stand out by being prepared for every question, challenge, and test.
            </p>
          </div>
          <div className="feature-image">
            <img src={img2} alt="Become the Ideal Candidate" />
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-text">
            <h2>Embark on Your Career Journey</h2>
            <p>
              Practice until you're pitch-perfect and ready to impress. Walk into any interview knowing you're about to get hired.
            </p>
          </div>
          <div className="feature-image">
            <img src={img1} alt="Land Your Dream Job" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2024 Eduford . All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
