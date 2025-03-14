import { fetchChapter } from "~/api/chapter";
import type { Route } from "./+types/chapter";
import { useLoaderData } from "react-router";
import { ErrorAlert } from "~/components/alerts/Alerts";
import ProtectedRoute from "~/components/ProtectedRoute";
import Chapter from "~/components/story/Chapter";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const chapterId = params.chapterId
    try {
        const chapter = await fetchChapter(chapterId)
        return { chapter }
    } catch (error: any) {
        return { error }
    }
}

export default function ChapterRoute() {
    const { chapter, error } = useLoaderData<typeof clientLoader>()
    return (
        <ProtectedRoute>
            {error && <ErrorAlert message={error.message} />}
            {chapter && <Chapter chapter={chapter} />}
        </ProtectedRoute>
    )
}
