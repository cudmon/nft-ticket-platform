import { Event } from "@/app/(user-page)/dashboard/page";
import { EventInformation, EventTicket } from "../lib/model/useEvents-model";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export function useEvents() {
    const backendURL = process.env.NEXT_PUBLIC_API_URL;

    const useAuthHooks = useAuth();

    const [headerOption, setHeaderOption] = useState<HeadersInit>({
        'Content-Type': 'application/json',
    });

    const deleteEvent = async (id: string) => {
        const response = await fetch(`${backendURL}/events/${id}`, {
            method: 'DELETE',
            headers: headerOption
        });
    };

    const fetchEventsOwnByUser = async () => {

        let me = await useAuthHooks.fetchMe();

        if (!me) {
            alert('Please login again');
            return;
        }

        console.log(me.id)

        const response = await fetch(`${backendURL}/users/${me.id}/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        const data: Event[] = await response.json();
        return data;
    };

    const getPublishedEvents = async () => {
        const response = await fetch(`${backendURL}/events?published=true`);
        const data = await response.json();

        return data;
    };

    const postEventsToDB = async (formTitle: string, formDate: Date, formLocation: string, formDescription: string, posterURL: string) => {

        const response = await fetch(`${backendURL}/events`, {
            method: 'POST',
            headers: headerOption,
            body: JSON.stringify({
                title: formTitle,
                date: formDate,
                location: formLocation,
                description: formDescription,
                image: posterURL
            })
        });

        if (!response.ok) {
            let data = await response.json();
            alert(data.message);
            return;
        }
    };

    const getEventInformation = async (id: string) : Promise<EventInformation> => {
        const response = await fetch(`${backendURL}/events/${id}`, {
            method: 'GET',
            headers: headerOption
        });

        const data = await response.json();

        return data;
    };

    const getEventTickets = async (id: string) : Promise<EventTicket[]> => {
        const response = await fetch(`${backendURL}/events/${id}/tickets`, {
            method: 'GET',
            headers: headerOption
        });

        const data = await response.json();
        return data;
    }

    const patchEventInformation = async (id: string, title: string, date: Date, location: string, description: string) => {
        const response = await fetch(`${backendURL}/events/${id}`, {
            method: 'PATCH',
            headers: headerOption,
            body: JSON.stringify({
                title: title,
                date: date,
                location: location,
                description: description
            })
        });
    };

    const createEventTicket = async (eventId: Number, name: string, price: number, total: number, resalable: boolean) => {
        const response = await fetch(`${backendURL}/tickets`, {
            method: 'POST',
            headers: headerOption,
            body: JSON.stringify({
                name: name,
                price: price,
                total: total,
                resalable: resalable,
                event_id: eventId
            })
        });

        if (!response.ok) {
            let data = await response.json();
            alert(data.message);
            return;
        }
    };

    const patchEventTicket = async (ticketId: string, name: string, price: number, total: number, resalable: boolean) => {
        const response = await fetch(`${backendURL}/tickets/${ticketId}`, {
            method: 'PATCH',
            headers: headerOption,
            body: JSON.stringify({
                name: name,
                price: price,
                total: total,
                resalable: resalable
            })
        });
    };

    const publishEvent = async (eventId: Number) => {
        const response = await fetch(`${backendURL}/events/${eventId}`, {
            method: 'PATCH',
            headers: headerOption,
            body: JSON.stringify({
                published: true
            })
        });

        return response;
    };

    const deleteTicket = async (ticketId: Number) => {  
        const response = await fetch(`${backendURL}/tickets/${ticketId}`, {
            method: 'DELETE',
            headers: headerOption
        });
    };

    const getTicketInformation = async (ticketId: Number) => {
        const response = await fetch(`${backendURL}/tickets/${ticketId}`, {
            method: 'GET',
            headers: headerOption
        });

        const data = await response.json();
        return data;
    }

    const getEvents = async () => {
        const response = await fetch(`${backendURL}/events`, {
            method: 'GET',
            headers: headerOption
        });

        const data = await response.json();
        return data;
    }
    
    useEffect (() => {
        setHeaderOption({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })

    }, []);

    const eventMethods = {
        deleteEvent,
        fetchEventsOwnByUser,
        postEventsToDB,
        getEventInformation,
        getEventTickets,
        patchEventInformation,
        publishEvent,
        getPublishedEvents,
        getEvents
    }

    const ticketMethods = {
        deleteTicket,
        createEventTicket,
        patchEventTicket,
        getTicketInformation
    }

    return { ...eventMethods, ...ticketMethods };
}