import { useEffect, createContext, useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/app/(user-page)/dashboard/page";

const EventContext = createContext<any>({events: [], deleteEventById: () => {}, postEvents: () => {}});

const EventContextProvider = ({children} : {  children: any }) => {
  const useEventsHook = useEvents();
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEventsOwnByUser = async () => {
    const data = await useEventsHook.fetchEventsOwnByUser();

    if (!data) {
      return;
    }

    setEvents(data);
  };

  const deleteEventById = async (id: string) => {
    await useEventsHook.deleteEvent(id);
    fetchEventsOwnByUser();
  };

  const postEvents = async (formTitle: string, formDate: Date, formLocation: string, formDescription: string, posterURL: string) => {
    await useEventsHook.postEventsToDB(formTitle, formDate, formLocation, formDescription, posterURL);
    fetchEventsOwnByUser();
  };

  useEffect(() => {
    fetchEventsOwnByUser();
  }, []);

  return (
    <EventContext.Provider value={{events, deleteEventById, postEvents}}>
      {children}
    </EventContext.Provider>
  )
} 

export { EventContextProvider, EventContext };