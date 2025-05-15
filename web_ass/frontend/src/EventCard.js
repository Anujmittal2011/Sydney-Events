function EventCard({ event, onGetTickets }) {
  return (
    <div className="event-card">
      <div className="event-details">
        <h3>{event.title}</h3>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p>{event.description}</p>
        <button onClick={onGetTickets}>GET TICKETS</button>
      </div>
      <div className="event-image">
        <img src={event.image} alt={event.title} />
      </div>
    </div>
  );
}

export default EventCard;
