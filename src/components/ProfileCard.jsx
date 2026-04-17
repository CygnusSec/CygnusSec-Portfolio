import React from 'react';
import LinuxImage from '../images/linux.png';

const InfoCard = () => {
  return (
    // <div className="bg-black/70 shadow-[0_0_20px_rgba(0,255,0,0.25)] rounded-xl p-6 w-full max-w-md mb-10 text-center border border-[#00ff00]/30">
    // <div className="bg-glass shadow-md rounded-xl p-6 w-full max-w-md mb-10 text-center">
    <div className="bg-glass shadow-[0_0_20px_rgba(0,255,0,0.25)] rounded-xl p-6 w-full max-w-md mb-10 text-center border border-[#00ff00]/30">
      {/* Avatar với hiệu ứng hacker nhạt */}
      <div className="avatar-matrix">
        <img src={LinuxImage} alt="Profile" />
      </div>

      {/* Tên */}
      <h2 className="text-2xl font-semibold text-[#00cc00] drop-shadow-[0_0_10px_rgba(0,255,0,0.6)]">
        Trần Đại Dương
      </h2>

      {/* Chức danh */}
      <p className="text-gray-300">
        Researcher - Institute of Information Technology
      </p>

      {/* Email */}
      <div className="mt-4">
        <a
          href="mailto:dylan@cygnussec.com"
          className="text-[#00ff00] hover:text-[#66ff66] hover:underline transition-all text-base font-semibold"
        >
          dylan@cygnussec.com
        </a>
      </div>
    </div>
  );
};

export default InfoCard;

