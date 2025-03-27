import { useEffect, createContext, useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/app/(user-page)/dashboard/page";

const EventContext = createContext<any>({events: [], deleteEventById: () => {}, postEvents: () => {}});

const EventContextProvider = ({children} : {  children: any }) => {
  const {deleteEvent, getEventsEndpoint, postEventsToDB} = useEvents();
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    setEvents(await getEventsEndpoint());
  };

  const deleteEventById = async (id: string) => {
    await deleteEvent(id);
    fetchEvents();
  };

  const postEvents = async (formTitle: string, formDate: Date, formLocation: string, formDescription: string) => {
    await postEventsToDB(formTitle, formDate, formLocation, formDescription);
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{events, deleteEventById, postEvents}}>
      {children}
    </EventContext.Provider>
  )
} 

export { EventContextProvider, EventContext };