import React, { useState } from "react";

export default function BadgeDeletion() {
  const [badges, setBadges] = useState([
    { id: 1, text: "Badge 1" },
    { id: 2, text: "Badge 2" },
    { id: 3, text: "Badge 3" },
  ]);

  const handleDeleteBadge = (id) => {
    setBadges(badges.filter((badge) => badge.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Badges</h1>
      <div>
        {badges.map((badge) => (
          <span
            key={badge.id}
            className="badge badge-info flex items-center space-x-1 m-2"
          >
            <span>{badge.text}</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => handleDeleteBadge(badge.id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
