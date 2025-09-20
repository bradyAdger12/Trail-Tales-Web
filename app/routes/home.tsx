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
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="text-center">
              {/* Main Heading */}
              <img src="https://trail-tales-ba-3013.s3.us-west-2.amazonaws.com/web_assets/logo.png" alt="logo" className="rounded-full w-60 mx-auto mb-8" />

              {/* Subtitle */}
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your daily exercise into epic survival adventures.
                Every step you take in the real world becomes part of your journey.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <span className="px-4 py-2 border border-slate-700 rounded-full text-sm">
                  🏃‍♂️ Real Exercise
                </span>
                <span className="px-4 py-2 border border-slate-700 rounded-full  text-sm">
                  🗺️ Epic Adventures
                </span>
                <span className="px-4 py-2  border border-slate-700 rounded-full text-sm">
                  ⚔️ Survival Gameplay
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-primary font-semibold text-primary-content rounded-lg hover:bg-primary/80 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Your Adventure
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 border-2 border-slate-600 font-semibold rounded-lg hover:border-slate-500 transition-all duration-200"
                >
                  Continue Journey
                </Link>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="mt-16 relative">
              <div className="rounded-2xl p-8 backdrop-blur-sm border border-slate-600/30">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <i className="fas fa-running text-2xl text-primary-content"></i>
                    </div>
                    <h3 className="text-xl font-semibold">Exercise Tracking</h3>
                    <p>Your real-world steps and activities power your in-game progress</p>
                  </div>

                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <i className="fas fa-map text-2xl text-primary-content"></i>
                    </div>
                    <h3 className="text-xl font-semibold ">Strategic Exploration</h3>
                    <p>Strategically explore the island to find resources and survive</p>
                  </div>

                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <i className="fas fa-heart text-2xl text-primary-content"></i>
                    </div>
                    <h3 className="text-xl font-semibold ">Survival Elements</h3>
                    <p>Manage resources, make choices, and survive in challenging environments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UnprotectedRoute >
  );
}
