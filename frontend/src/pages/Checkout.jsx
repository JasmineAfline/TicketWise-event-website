import { useParams } from "react-router-dom";

export default function Checkout() {
  const { id } = useParams();

  return (
    <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Checkout Page</h1>
      <p className="text-gray-700 mb-6">Booking event with ID: {id}</p>

      <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition">
        Proceed to Pay
      </button>
    </div>
  );
}
