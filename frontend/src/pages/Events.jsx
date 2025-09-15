export default function Events() {
  // Sample events (replace with API data later)
  const events = [
    {
      id: 1,
      title: "Live Music Concert",
      date: "Sept 28, 2025",
      location: "Nairobi, Kenya",
      price: "1500 KES",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      date: "Oct 12, 2025",
      location: "Mombasa, Kenya",
      price: "2500 KES",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    },
    {
      id: 3,
      title: "Football Match",
      date: "Nov 5, 2025",
      location: "Kisumu Stadium",
      price: "1000 KES",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    },
    {
      id: 4,
      title: "Wedding Expo",
      date: "Dec 20, 2025",
      location: "Nakuru, Kenya",
      price: "Free Entry",
      image: "https://images.unsplash.com/photo-1529634806980-34e88d4b4855",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Upcoming Events 🎉</h1>
        <p className="text-gray-600">
          Browse and book your favorite events easily with Tickewise.
        </p>
      </section>

      {/* Events Grid */}
      <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-gray-600">{event.location}</p>
              <p className="text-purple-600 font-bold mt-2">{event.price}</p>
              <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
