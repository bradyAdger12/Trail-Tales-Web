import DefaultLayout from "~/layouts/default_layout";
import type { Route } from "./+types/home";
import { Link } from "react-router";
import { APP_NAME } from "~/lib/constants";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: `${APP_NAME} - Transform Your Exercise Into Adventures` },
    { name: "description", content: `Turn your daily exercise into epic adventures with ${APP_NAME}. Run, walk, and discover stories that unfold with every step.` },
  ];
}

export default function Home() {
  return (
    <DefaultLayout>
      <div className="h-screen">
        <div className="relative pt-24 pb-20 sm:pt-32 sm:pb-28">
          <section className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-x-2 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-full px-4 py-1.5 mb-6">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-sm font-medium text-gray-200">Now in Public Beta</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 leading-tight mb-6">
                Turn Your Exercise Into
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text">Epic Adventures</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-8">
                Every step you take shapes your story. Complete runs or walks to explore new worlds, 
                make daring choices, and uncover hidden secrets in your personalized adventure.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link to="/signup" className="btn btn-primary shadow-none text-black px-8 py-3 text-sm md:text-lg font-medium transition-all duration-300 hover:-translate-y-[3px]">
                  Start your adventure
                </Link>
                <Link to="/about" className="btn bg-secondary/10 border-none shadow-none px-8 py-3 text-lg text-sm md:text-lg font-light transition-all duration-300 hover:-translate-y-[3px]">
                  How does it work?
                </Link>
              </div>
              
              {/* <div className="mt-12 flex items-center gap-8 text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9/5 rating</span>
                </div>
                <div>•</div>
                <div>10k+ active users</div>
                <div>•</div>
                <div>100% free</div>
              </div> */}
            </div>
          </section>
        </div>
      </div>
    </DefaultLayout>
  );
}
