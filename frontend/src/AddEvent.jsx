const AddEvent = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Event</h1>
      <form>
        <div>
          <label>Event Name:</label>
          <input type="text" placeholder="Enter event name" />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" placeholder="Enter location" />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" placeholder="Enter price" />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
