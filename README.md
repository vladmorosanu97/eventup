# FiiPracticReact

EventHooks: an application which helps you to promote or find events

## General:  

I used Redux to manage the state of the application and Firebase for storing data. 

## Home page: 

I changed the design and layout for the home page and I added new functionalities: 
You can filter events by name: the search is executed live when you are typing 
You can filter the events by range between user and the event location: 
(I used navigator to get the user location and “fromLength” function from openLayer to calculate the distance)

For layout I used the range-semantic-component and Inputs components from Semantic UI:  
https://www.npmjs.com/package/react-semantic-ui-range 

You can filer the events by date: see all events or only future events. 

Now, you can add new events in a separate page. 

If there are no upcoming events, the user will notice an illustration which represents the current state of the events. This improves the user experience.

I used illustartions from https://undraw.co/illustrations. 

You can differentiate the past events from the others: now future events are “alive” marked with an orange colour. 
 
## Event page: 

I created a presentation page for an event and I put the eventId in the link to share the event’s link over the Internet easily: “app/event/eventId” 

The page contains the details for the event

The user can check the location of the event and the distance from the event location to the current location of the user.

The date can be viewed in a calendar component (I used and ajusted the layout for the calendar found on codePen), 

I integrated an API for weather to see the forecast weather for event if you are going: 

  * I used the API from here: https://www.accuweather.com 
  * If the event is coming in less than 5 days you can see the weather for that date. 

You can see the participants for this event 

The motion backgraund is done using bideo.js library and videos from the internet. 

 
## Adding new events: 

I created a new page for adding events where you can see validation when you don’t fill in correctly all the required fields. 

You can see the location selected on the openLayer’s map (used for example when you aren’t sure where the selected location is placed on the earth). 

I created separate components for reusable fields like input and textarea 


## My-events page: 

In “my-events” page you can see your promoted events and scheduled events. 

I used the same component for viewing the details for event used in the home page. 

## User page: 

Each user registred in application has a presentation page where you can see his details. 

You can also view the promoted events created and events to which he joined. 

 I used the same components like at home pag. 
