import { useEffect, useState } from "react";

export function useAuth () {
    const backendURL = process.env.NEXT_PUBLIC_API_URL;

    const fetchMe = async () => {
        const response = await fetch(`${backendURL}/auth/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
        });

        const data = await response.json();

        return data;
    };

    return { fetchMe };
}