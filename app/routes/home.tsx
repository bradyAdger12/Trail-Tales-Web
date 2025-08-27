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
          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-6xl md:text-7xl font-bold mb-4">
                  {APP_NAME}
                </h1>
                <div className="flex items-center justify-center gap-2 text-orange-400 text-lg">
                  <i className="fas fa-clock"></i>
                  <span>21 Days to Survive</span>
                  <i className="fas fa-skull-crossbones"></i>
                </div>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Your survival depends on your movement. Walk, run, and push your limits 
                to gather resources and stay alive in this real-time survival challenge.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/signup" className="btn btn-primary btn-lg px-8 py-4 text-lg">
                  <i className="fas fa-play mr-2"></i>
                  Start Surviving
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg px-8 py-4 text-lg">
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Continue Game
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 border border-slate-700/50 rounded-xl">
                <div className="text-4xl font-bold text-orange-400 mb-2">21</div>
                <div className="text-gray-300">Days to Survive</div>
              </div>
              <div className="p-6 border border-slate-700/50 rounded-xl">
                <div className="text-4xl font-bold text-red-400 mb-2">100%</div>
                <div className="text-gray-300">Real Movement Required</div>
              </div>
              <div className="p-6 border border-slate-700/50 rounded-xl">
                <div className="text-4xl font-bold text-green-400 mb-2">∞</div>
                <div className="text-gray-300">Adventures Awaiting</div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-20 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
              How to <span className="text-orange-400">Survive</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl border border-slate-700/50 hover:border-orange-400/50 transition-all duration-300">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-running text-2xl text-orange-400"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Move Daily</h3>
                <p className="text-gray-400">Walk or run to gather essential resources and energy for survival</p>
              </div>

              <div className="text-center p-6 rounded-xl border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-2xl text-blue-400"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Track Progress</h3>
                <p className="text-gray-400">Monitor your health, resources, and survival status in real-time</p>
              </div>

              <div className="text-center p-6 rounded-xl border border-slate-700/50 hover:border-green-400/50 transition-all duration-300">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-trophy text-2xl text-green-400"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Win or Die</h3>
                <p className="text-gray-400">Survive all 21 days to claim victory</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Your Survival Starts <span className="text-orange-400">Now</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Every step counts. Every day matters. Do you have what it takes to survive 21 days?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup" className="btn btn-primary btn-sm md:btn-lg shadow-lg hover:shadow-orange-500/25">
                  <i className="fas fa-fire mr-2"></i>
                  Begin Your Journey
                </Link>
              </div>

              <div className="mt-12 text-sm text-gray-400 space-y-1">
                <p className="font-semibold">Real movement. Real challenge. Real consequences.</p>
                <p>Will you be among the survivors?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UnprotectedRoute>
  );
}
