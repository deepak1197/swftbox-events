import React, { useState } from "react";
import axios from 'axios';

const App = () => {

  let [eventName, setEventName] = useState('');
  let [eventStartTime, setEventStartTime] = useState(new Date());
  let [eventEndTime, setEventEndTime] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventName, eventStartTime, eventEndTime);
    if (new Date(eventEndTime).getTime() <= new Date(eventStartTime).getTime() )  {
      alert('End date should be after start date');
    } else {
      const data = {
        eventName,
        eventStartTime: new Date(eventStartTime).toISOString(),
        eventEndTime: new Date(eventEndTime).toISOString()
      }
      axios.post('/createevent', data).then((res) => {
        console.log(res);
        if (res.data === 'exist') alert('An event exist during this duration');
        if (res.data === 'success') {
          alert('Event Created');
          setEventName('')
          setEventStartTime(new Date());
          setEventEndTime(new Date());
        }
      });
    }  
  }

  const handleEventNameChange = e => setEventName(e.target.value);
  const handleStartTimeChange = e => setEventStartTime(e.target.value);
  const handleEndTimeChange = e => setEventEndTime(e.target.value);
  

  return (
    <React.Fragment>
      <h1>Book time slot for an event</h1>
      <form onSubmit={handleSubmit}>
        <input required type="text" value="" placeholder="Event Name" onChange={handleEventNameChange} value={eventName}/>
        <input required type="datetime-local" id="starttime" name="starttime" onChange={handleStartTimeChange} value={eventStartTime}/>
        <input required type="datetime-local" id="endtime" name="endtime" onChange={handleEndTimeChange} value={eventEndTime}/>
        <button type="submit">Create Event</button>
      </form>
    </React.Fragment>
  );
}

export default App;
