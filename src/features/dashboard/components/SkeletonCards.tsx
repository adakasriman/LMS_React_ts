import React from 'react';

const SkeletonCards: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-28 bg-gray-200 rounded animate-pulse" />
    ))}
  </div>
);

export default SkeletonCards;
