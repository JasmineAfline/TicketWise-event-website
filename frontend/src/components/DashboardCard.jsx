import { useNavigate } from "react-router-dom";

const DashboardCard = ({ title, description, path }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(path)}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default DashboardCard;
