import React from "react";

function SocialButton({ image, text }) {
  return (
    <div className="flex px-12 gap-2 py-4 border border-primary-600 mb-2 rounded-5">
      <img src={image} alt="social" />
      <p>{text}</p>
    </div>
  );
}

export default SocialButton;
