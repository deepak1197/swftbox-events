import { useState } from "react";
import axios from 'axios';

const App = () => {

  const [eventName, setEventName] = useState('');
  const [eventStartTime, setEventStartTime] = useState(new Date());
  const [eventEndTime, setEventEndTime] = useState(new Date());

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
      });
    }  
  }

  const handleEventNameChange = e => setEventName(e.target.value);
  const handleStartTimeChange = e => setEventStartTime(e.target.value);
  const handleEndTimeChange = e => setEventEndTime(e.target.value);
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value="" placeholder="Event Name" onChange={handleEventNameChange} value={eventName}/>
      <input type="datetime-local" id="starttime" name="starttime" onChange={handleStartTimeChange} value={eventStartTime}/>
      <input type="datetime-local" id="endtime" name="endtime" onChange={handleEndTimeChange} value={eventEndTime}/>
      <button type="submit">Create Event</button>
    </form>
  );
}

export default App;
