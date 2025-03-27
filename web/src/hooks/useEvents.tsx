import { Event } from "@/app/(user-page)/dashboard/page";

export function useEvents() {
    const backendURL = process.env.NEXT_PUBLIC_API_URL;

    const deleteEvent = async (id: string) => {
        const response = await fetch(`${backendURL}/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });
    };

    const getEventsEndpoint = async () => {
        const response = await fetch(`${backendURL}/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        const data: Event[] = await response.json();
        return data;
    };

    const postEventsToDB = async (formTitle: string, formDate: Date, formLocation: string, formDescription: string) => {

        const response = await fetch(`${backendURL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                title: formTitle,
                date: formDate,
                location: formLocation,
                description: formDescription
            })
        });

        if (!response.ok) {
            let data = await response.json();
            alert(data.message);
            return;
        }
    };

    return { deleteEvent, getEventsEndpoint, postEventsToDB };
}