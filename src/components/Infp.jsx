import React from "react";

export default function ProfileCard() {
  return (
    <div className="profile-card">
      <img
        src="https://i.ibb.co/MBtjqXQ/avatar.jpg"
        alt="Your Avatar"
        className="avatar"
      />
      <h1>Dylan Tran</h1>
      <p>Cybersecurity Researcher & DevOps Engineer</p>
      <p className="bio">
        Passionate about security, automation, and digital defense. 
        Sharing resources to build a safer internet.
      </p>
      <div className="socials">
        <a href="https://github.com/dylantran" target="_blank">GitHub</a>
        <a href="https://linkedin.com/in/dylantran" target="_blank">LinkedIn</a>
        <a href="mailto:dylantran@example.com">Email</a>
      </div>
    </div>
  );
}
