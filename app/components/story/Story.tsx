import { Link } from "react-router";
import { type Story } from "~/api/story";
export default function Story({ story }: { story: Story }) {
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Story Cover Image */}
                <div className="md:w-1/3">
                    <img
                        src={story.cover_image_url}
                        alt={story.title}
                        className="w-full h-auto rounded-lg shadow-lg object-cover"
                    />
                </div>

                {/* Story Details */}
                <div className="md:w-2/3">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{story.title}</h1>
                    <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">{story.description}</p>

                    <div className="space-y-4">

                        <div className="stats shadow mt-6 w-full">
                            <div className="stat">
                                <div className="stat-title">Progress</div>
                                <div className="stat-value text-primary">{Math.round(((story.chapters.length - 1) / 10) * 100)}%</div>
                                <div className="stat-desc">Your adventure awaits</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Last Played</div>
                                <div className="stat-value text-secondary text-lg">Today</div>
                                <div className="stat-desc">Continue where you left off</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Chapters List */}
            <div className="w-full mt-8">
                <h2 className="text-2xl font-bold mb-4">Chapters</h2>
                <div className="space-y-4">
                    {story.chapters.map((chapter) => (
                        <div
                            key={chapter.id}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow hover:shadow-primary/20 duration-300 cursor-pointer"
                        >
                            <div className="card-body">
                                <h3 className="card-title">{chapter.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300">{chapter.description}</p>
                                <div className="card-actions justify-end mt-2">
                                    <Link to={`/chapter/${chapter.id}`} className="btn btn-primary btn-sm">
                                        Continue
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
