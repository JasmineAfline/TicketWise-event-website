import React, { useState, useEffect } from 'react';

const Flights = () => {
  const [flights, setFlights] = useState([]);

  // Example: Fetch flights data from an API on component mount
  useEffect(() => {
    // Replace with your actual API call
    const fetchFlights = async () => {
      // Mock flight data
      const data = [
        { id: 1, from: 'New York', to: 'London', date: '2024-09-01', price: 500 },
        { id: 2, from: 'Paris', to: 'Tokyo', date: '2024-10-15', price: 750 },
        { id: 3, from: 'Sydney', to: 'Los Angeles', date: '2024-11-20', price: 900 },
      ];
      setFlights(data);
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <h2>Available Flights</h2>
      <ul>
        {flights.map(flight => (
          <li key={flight.id}>
            {flight.from} to {flight.to} - {flight.date} - ${flight.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
