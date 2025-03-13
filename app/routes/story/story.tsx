import type { Route } from "./+types/story";
import ProtectedRoute from "~/components/ProtectedRoute";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Story - " },
    ];
}

export function clientLoader({ params }: Route.ClientLoaderArgs) {
    // const storyId = params.storyId;
    // if (storyId) {
    
    // }
}   

export default function Story() {
    return (
        <ProtectedRoute>
            <div>
                <h1>Story</h1>
            </div>
        </ProtectedRoute>
    );
}

