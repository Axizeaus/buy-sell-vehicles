import React from "react";

interface TiltCardProps {
  image: string;
  title: string;
  price: number;
  location: string;
}

const TiltCard: React.FC<TiltCardProps> = ({
  image,
  title,
  price,
  location,
}) => {
  return (
    <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-lg bg-slate-800 dark:bg-slate-900 p-4 transition-transform duration-200 neumorphism hover:scale-110">
      <img
        src={image}
        alt={title}
        className="w-full h-30 sm:h-42 object-cover rounded-t-lg"
      />
      <div className="relative z-10 flex flex-col p-4 bg-slate-900 dark:bg-slate-800 rounded-lg shadow-neumorphism">
        <h4 className="text-lg sm:text-xl font-bold text-slate-50 dark:text-slate-200">
          {title}
        </h4>
        <p className="text-md font-semibold text-yellow-400">{`${price.toFixed(
          2
        )}`}</p>
        <p className="text-sm text-gray-300 dark:text-gray-400">{location}</p>
      </div>
      <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-200"></div>
    </div>
  );
};

export default TiltCard;
