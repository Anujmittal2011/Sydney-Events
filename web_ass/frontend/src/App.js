import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './EventCard';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleGetTickets = (event) => {
    setSelectedEvent(event);
  };

  const isValidEmail = (email) => {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const submitEmail = async () => {
    if (!username.trim()) {
      alert('Please enter your username');
      return;
    }
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/emails', {
        username,
        email,
        eventId: selectedEvent._id,
      });
      window.open(selectedEvent.link, '_blank');
      setEmail('');
      setUsername('');
      setSelectedEvent(null);
    } catch (err) {
      alert('Error saving email');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Sydney Events</h1>
      <div className="events-grid">
        {events.map(event => (
          <EventCard key={event._id} event={event} onGetTickets={() => handleGetTickets(event)} />
        ))}
      </div>

      {selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter your username and email to get tickets:</h3>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button onClick={submitEmail}>Submit & Go</button>
            <button className="cancel" onClick={() => setSelectedEvent(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
