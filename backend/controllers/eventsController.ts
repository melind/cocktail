import {Request, Response} from 'express';
import axios from 'axios';
//import  htmlspecialchars from 'htmlspecialchars';
export default class eventsController {
 



    static async eventsList(request: Request, response: Response) {

        let location = request.params.location;
 /*--------------get api key and the url of the  external api -------------------*/
        const API_KEY = process.env.API_KEY;
        //event of the day
        const eventsUrl = `http://api.eventful.com/json/events/search?app_key=${API_KEY}&location=${location}`;
       
       /* -------------get data of the external api---------*/
        const events = await axios.get(eventsUrl)
            .then((res) =>{ return res.data})
            .catch(err => { });
        

        response.status(200).json({
                                    events
                                   });

   

        
          
    }
 
    static async todayEventsList(request: Request, response: Response) {

        let location = request.params.location;
 /*--------------get api key and the url of the  external api -------------------*/
        const API_KEY = process.env.API_KEY;
        //event of the day
        const todayEventsUrl = `http://api.eventful.com/json/events/search?app_key=${API_KEY}&location=${location}&date=Today`
       
       /* -------------get data of the external api---------*/
        const todayEvents = await axios.get(todayEventsUrl)
            .then((res) =>{ return res.data})
            .catch(err => { });
        

        response.status(200).json({
                                    todayEvents
                                   });

   

        
          
    }

      static async weekEventsList(request: Request, response: Response) {

          let type = request.params.type;
          let location = request.params.location;
          const API_KEY = process.env.API_KEY
 /*--------------get api key and the url of the  external api -------------------*/
        
        const weekEventsUrl = `http://api.eventful.com/json/events/search?app_key=${API_KEY}&location=${location}&date=this+week`;
       
       /* -------------get data of the external api---------*/
        const weekEvents = await axios.get(weekEventsUrl)
            .then((res) =>{ return res.data})
            .catch(err => { });
        

        response.status(200).json({
                                    weekEvents
                                   });
 
   

        
          
    }

       static async eventsInfo(request: Request, response: Response) {

        let idEvent = request.params.idEvent;
        const API_KEY = process.env.API_KEY

        idEvent = idEvent.trim();
       // idEvent = htmlspecialchars(idEvent);
          
        if(idEvent) { 
/*--------------get api key and the url of the  external api -------------------*/

          
        const eventsInfoUrl =  `http://api.eventful.com/json/events/get?app_key=${API_KEY}&id=${idEvent}`
       /* -------------get data of the external api---------*/
          
        const eventsInfo = await axios.get(eventsInfoUrl)
        .then((res) =>{ return res.data})
        .catch(err => { });
          
          
        response.status(200).json({
                                    eventsInfo
                                   });
                                  
        }
    
      
    }

}