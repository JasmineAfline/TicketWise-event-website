const BookEvent = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Book Event</h1>
      <p>Select an event and proceed to payment.</p>
      <ul>
        <li>
          Charity Run - KES 500 
          <button>Book Now</button>
        </li>
        <li>
          Music Concert - KES 1500 
          <button>Book Now</button>
        </li>
        <li>
          Art Workshop - KES 800 
          <button>Book Now</button>
        </li>
      </ul>
    </div>
  );
};

export default BookEvent;
