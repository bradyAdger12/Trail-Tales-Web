import { fetchChapter } from "~/api/chapter";
import { useParams } from "react-router";
import { ErrorAlert } from "~/components/alerts/Alerts";
import ProtectedRoute from "~/components/ProtectedRoute";
import Chapter from "~/components/story/Chapter";
import { useQuery } from "@tanstack/react-query";
export default function ChapterRoute() {
    const { chapterId } = useParams()
    const { data: chapter, error, isFetching } = useQuery({ queryKey: ['chapter', chapterId], queryFn: () => fetchChapter(chapterId!) })
    return (
        <ProtectedRoute>
            {isFetching && <span className="loading loading-spinner loading-lg"></span>}
            {error && <ErrorAlert message={error.message} />}
            {chapter && <Chapter chapter={chapter} />}
        </ProtectedRoute>
    )
}
