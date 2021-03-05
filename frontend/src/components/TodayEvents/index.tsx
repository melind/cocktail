import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import eventAPI from '../../services/eventAPI';

const TodayEvents = () => {
    
    const [todayEvents, setTodayEvents] = useState([]);

     async function TodayEventsList() { 
         const TodayEventsInfo = await eventAPI.todayEvents("france")
         .then(res => {
          
             return res.data.todayEvents.events.event;
         })
         .catch(err => {

         });

         // setting variable with the datacolected
         setTodayEvents(TodayEventsInfo);
     
     }

      useEffect(() => {
       TodayEventsList();
       }, []); 

    return (
        <div className="todayEvent">
        <div>
                {todayEvents.map((result) =>
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
export default TodayEvents;