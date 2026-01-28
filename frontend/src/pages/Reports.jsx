import { useEffect, useState } from "react";

export default function Reports() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    popularEvent: "Loading..."
  });

  useEffect(() => {
    // TEMP MOCK DATA (backend later)
    setStats({
      totalBookings: 128,
      totalRevenue: 245000,
      popularEvent: "Nairobi Music Fest"
    });
  }, []);

  return (
    <div className="pt-24 px-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">
        Reports & Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Total Bookings</h3>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Total Revenue (KES)</h3>
          <p className="text-2xl font-bold">{stats.totalRevenue}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Most Popular Event</h3>
          <p className="text-xl font-semibold">{stats.popularEvent}</p>
        </div>
      </div>
    </div>
  );
}
