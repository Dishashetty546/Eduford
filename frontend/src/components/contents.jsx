import React from 'react';
import { BiNotification, BiSearch, BiLogoHtml5, BiLogoAndroid, BiBuilding } from 'react-icons/bi';
import './app.css'; // Ensure you add styles here.

const Contents = () => {
  const courses = [
    {
      title: 'Web Development',
      duration: '30 min',
      icon: <BiLogoHtml5 />,
    },
    {
      title: 'DSA and DAA',
      duration: '45 min',
      icon: <BiLogoAndroid />,
    },
    {
      title: 'Aptitude',
      duration: '20 min',
      icon: <BiBuilding />,
    },
  ];

  return (
    <div className="contents">
      {/* Content Header */}
      <div className="content-header">
        <div className="content-title">Dashboard</div>
        <div className="header-activity">
          <div className="search-box">
            <input type="text" placeholder="Search anything here" />
            <BiSearch className="react-icon" />
          </div>
          <div className="notify">
            <BiNotification className="react-icon" />
          </div>
        </div>
      </div>

      {/* Content Cards */}
      <div className="cart-container">
        {courses.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-cover">{item.icon}</div>
            <div className="card-details">
              <h2 className="card-title">{item.title}</h2>
              <p className="card-duration">{item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;
