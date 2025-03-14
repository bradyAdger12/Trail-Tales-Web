import { startStory, type Story } from "~/api/story";
import ProtectedRoute from "../ProtectedRoute";
import { useNavigate } from "react-router";
import { useToast } from "~/contexts/ToastContext";
import { useState } from "react";



export default function Stories({ storyTemplates }: { storyTemplates: Story[] }) {
    const { showToast } = useToast();
    const [starting, setStarting] = useState(false);
    const navigate = useNavigate();
    async function start(storyTemplateId: string) {
        try {
            if (starting) return;
            setStarting(true);
            await startStory(storyTemplateId)
            navigate(0)
        } catch (error: any) {
            showToast(error.message, "error")
        } finally {
            setStarting(false);
        }
    }
    return (
        <ProtectedRoute>
            <div>
                <h1 className="text-2xl font-bold mb-4">Story Templates</h1>
                <p className="mb-4">Choose a story to start your adventure.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {storyTemplates?.map((storyTemplate: Story) => (
                        <div key={storyTemplate.id} className="card bg-base-100 shadow-xl mb-4 hover:shadow-2xl transition-shadow hover:shadow-primary/20 duration-300">
                            <figure>
                                <img
                                    src={storyTemplate.cover_image_url}
                                    alt={storyTemplate.title}
                                    className="w-full h-48 object-cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{storyTemplate.title}</h2>
                                <p>{storyTemplate.description}</p>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-primary" onClick={() => start(storyTemplate.id)}>Start Story { starting && <span className="loading loading-spinner loading-xs"></span>}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    );
}
