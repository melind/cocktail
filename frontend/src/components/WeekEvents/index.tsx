import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import eventAPI from '../../services/eventAPI';

const WeekEvents = () => {

    const [weekEvents, setWeekEvents] = useState([]);

     async function weekEventsList() { 
         const weekEventsInfo = await eventAPI.weekEvents("france")
         .then(res => {
            
             return res.data.weekEvents.events.event;
         })
         .catch(err => {

         });

         // setting variable with the datacolected
         setWeekEvents(weekEventsInfo);
     
     }

      useEffect(() => {
       weekEventsList();
       }, []); 

    return (
        <div className="weekEvents">

        <div>
                {weekEvents.map((result) =>
                 <div key={result.id}> 
                     {result.title}  {result.start_time}
                     {result.venue_name} {result.venue_address} 
                     {result.city_name} {result.region_name} 
                     <Link to={`/description/${result.title}/${result.id}`}>Plus d'info</Link>

                 </div>
                 )} 
                               
        </div>
        
        </div>
    )
}
export default WeekEvents;