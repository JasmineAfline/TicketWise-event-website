import { useEffect, useRef, useState } from "react";
import { AiFillStar } from "react-icons/ai";

const ReviewCard = ({ name, rating, comment, avatar }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="font-bold">{name}</h4>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <AiFillStar key={i} size={18} className={i < rating ? "" : "opacity-30"} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">"{comment}"</p>
    </div>
  );
};

export default ReviewCard;
