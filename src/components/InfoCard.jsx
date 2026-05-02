import React from 'react';
import LinuxImage from '../images/linux.png';
import { config } from '../config/env';

const InfoCard = () => {
  return (
    <div className="bg-glass shadow-[0_0_20px_rgba(0,255,0,0.25)] rounded-xl p-6 w-full max-w-md mb-10 text-center border border-[#00ff00]/30">
      {/* Avatar với hiệu ứng hacker nhạt */}
      <div className="avatar-matrix">
        <img src={LinuxImage} alt="Profile" />
      </div>

      {/* Tên */}
      <h2 className="text-2xl font-semibold text-[#00cc00] drop-shadow-[0_0_10px_rgba(0,255,0,0.6)]">
        {config.author.name}
      </h2>

      {/* Chức danh */}
      <p className="text-gray-300">
        {config.author.position}
      </p>

      {/* Email */}
      <div className="mt-4">
        <a
          href={`mailto:${config.contact.email}`}
          className="text-[#00ff00] hover:text-[#66ff66] hover:underline transition-all text-base font-semibold"
        >
          {config.contact.email}
        </a>
      </div>
    </div>
  );
};

export default InfoCard;
