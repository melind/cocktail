import React, { useState, useEffect } from 'react';
import eventAPI from '../../services/eventAPI';

const EventInfo = (props) => {
    

    const [events, setEvents] = useState([]);

    let eventName = props.match.params.eventName; 
    let idEvent = props.match.params.idEvent;
    
    async function eventDetails() {  

       const details = await eventAPI.eventInfo(eventName,idEvent)
       .then(res => {
           return res.data.eventsInfo;
           
       })
       .catch(err => {
          
       });
       setEvents(details);
       
       }
   
       useEffect(() => {
       eventDetails();
       }, []); 

    return (
        <div className="eventInfo">

             <div>
               <p><a href="javascript:history.go(-1)">Retour</a></p>
                 <div > 
                    { events['title'] } {events['start_time']} {events['city']} {events['region']}
                    {events['description']} 
                    
                    {events['links'] && events['links']["link"].map((result) => <div key={result.id}> <a href={`${result.url}`} target="_blank">Billeterie</a></div>)}
                    

                 </div>
                
                               
        </div>
        
        </div>
    )
}
export default EventInfo;