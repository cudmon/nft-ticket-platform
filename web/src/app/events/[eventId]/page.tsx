import { useRouter } from "next/router"

export default function page() {
    const router = useRouter();
    return (
        <h1>{router.query.eventId}</h1>
    )
} 