import DefaultLayout from "~/layouts/default_layout";
import type { Route } from "./+types/home";
import { Link } from "react-router";
import { APP_NAME } from "~/lib/constants";
import UnprotectedRoute from "~/components/UnprotectedRoute";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: `${APP_NAME} - Transform Your Exercise Into Adventures` },
    { name: "description", content: `Turn your daily exercise into epic adventures with ${APP_NAME}. Run, walk, and discover stories that unfold with every step.` },
  ];
}

export default function Home() {
  return (
    <UnprotectedRoute>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-md md:max-w-2xl text-center">
          <h1 className="mb-5 text-5xl font-bold text-primary">{APP_NAME}</h1>
          <p className="mb-8 text-xl">Your plane has crashed on a remote island. With limited supplies and no rescue in sight, you must survive for 15 days.</p>

          <div className="mb-8 bg-base-100 bg-opacity-80 p-6 rounded-lg shadow-lg">
            <h3 className="mb-4 text-2xl">How It Works</h3>
            <ul className="text-left space-y-3">
              <li className="flex items-start">
                <i className="fas fa-walking mr-3 mt-1 text-primary"></i>
                <span>Complete daily walking or running challenges to gather resources</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-campground mr-3 mt-1 text-primary"></i>
                <span>Build shelter, find food, and craft tools to survive</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-book-open mr-3 mt-1 text-primary"></i>
                <span>Uncover the island's mysterious story with each passing day</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-users mr-3 mt-1 text-primary"></i>
                <span>Compete with friends or join forces to increase your chances</span>
              </li>
            </ul>
          </div>

          <p className="mb-6 italic">"Every step you take in the real world brings you closer to survival in ours."</p>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/signup" className="btn btn-primary">Start Your Adventure</Link>
            <Link to="/login" className="btn btn-outline">Continue Surviving</Link>
          </div>

          <div className="mt-10 text-sm opacity-80">
            <p>Real exercise. Real adventure. Real survival.</p>
            <p>Can you make it through all 15 days?</p>
          </div>
        </div>
      </div>
    </UnprotectedRoute>
  );
}
