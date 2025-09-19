import DefaultLayout from "~/layouts/default_layout";
import type { Route } from "./+types/home";
import { Link } from "react-router";
import { APP_NAME } from "~/lib/constants";
import UnprotectedRoute from "~/components/UnprotectedRoute";
import { HEALTH_COLOR, HUNGER_COLOR, THIRST_COLOR } from "~/components/character/CharacterVitals";
import { ResourceDisplay } from "~/components/resource/ResourceDisplay";
import SurvivalDayOption from "~/components/survival-day/SurvivalDayOption";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: `${APP_NAME} - How to Play` },
    { name: "description", content: `How to play ${APP_NAME}. Move your body until help arrives.` },
  ];
}

export default function HowToPlay() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-12">

      {/* Objective */}
      <div className="flex flex-col gap-2">
        <h3>
          Objective
        </h3>
        <p className="text-sm text-gray-400">
          Survive 21 days on a deserted island by logging your daily exercise. Reach the end of day 21 and you win the game!
        </p>
      </div>

      {/* Getting Started */}
      <div className="flex flex-col gap-2">
        <h3>
          Getting Started
        </h3>
        <p className="text-sm text-gray-400">
          Create an account if you don't have one yet. You'll begin by linking your Strava account and selecting your difficulty level. The difficulty level will determine the amount of exercise you need to do each day, as well as your starting vitals.
        </p>
      </div>

      {/* Vitals */}
      <div className="flex flex-col gap-2">
        <h3>
          Vitals
        </h3>
        <div className="text-sm">
          There are 3 different vitals that you will need to manage:
          <ul className="list-disc list-inside mt-3">
            <li>Health</li>
            <li>Thirst</li>
            <li>Hunger</li>
          </ul>
          <h5 className="text-lg font-bold mt-3">
            Health <i className={`fas fa-heart`} style={{ color: HEALTH_COLOR }}></i>
          </h5>
          <p className="text-sm text-gray-400">
            Health is your overall health and will be affected by your actions. If your health reaches 0, you will die and the game will be over.
          </p>
          <h5 className="text-lg font-bold mt-3">
            Thirst <i className={`fas fa-water`} style={{ color: THIRST_COLOR }}></i>
          </h5>
          <p className="text-sm text-gray-400">
            Your thirst will be affected by your actions. If your thirst reaches 0, you will lose 10% of your health after every day.
          </p>
          <h5 className="text-lg font-bold mt-3">
            Hunger <i className={`fas fa-utensils`} style={{ color: HUNGER_COLOR }}></i>
          </h5>
          <p className="text-sm text-gray-400">
            Hunger is your hunger and will be affected by your actions. If your hunger reaches 0, you will lose 10% of your health after every day.
          </p>
        </div>
      </div>

      {/* Each Day */}
      <div className="flex flex-col gap-2">
        <h3>
          Each Day
        </h3>
        <div className="text-sm">
          <p className="text-sm text-gray-400">
            Each day you will choose from 4 different actions, all resulting in different effects on your vitals. Choose the easy way, and you will gain minimal resources. Choose the hard way and you will be rewarded
          </p>
          <ul className="list-disc list-inside mt-3">
            <li>Easy</li>
            <li>Medium</li>
            <li>Hard</li>
            <li>Rest</li>
          </ul>
          <p className="text-sm mt-4 text-gray-400">
            Next to each action, you will see a description of the effect it will have on your vitals. You'll see icons such as these:
          </p>
          <div className="flex gap-2 mt-4">
            <ResourceDisplay resource="food" value={10} />
            <ResourceDisplay resource="water" value={5} />
            <ResourceDisplay resource="health" value={10} />
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400">
              Which action you choose is determined by how long your activity duration is. Easy actions will be shorter, while hard actions will be longer. Below is an example of what your available actions will look like.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <SurvivalDayOption option={{
                description: "Explore a nearby river and gather some water.",
                difficulty: "easy",
                duration_in_seconds: 60 * 20,
                food_gain_percentage: 0,
                water_gain_percentage: 5,
                health_gain_percentage: 0
              }} />
              <SurvivalDayOption option={{
                description: "Gather some food from the nearby forest.",
                difficulty: "medium",
                duration_in_seconds: 60 * 30,
                food_gain_percentage: 8,
                water_gain_percentage: 0,
                health_gain_percentage: 5
              }} />
              <SurvivalDayOption option={{
                description: "Grab your spear and hunt some fish.",
                difficulty: "hard",
                duration_in_seconds: 60 * 45,
                food_gain_percentage: 10,
                water_gain_percentage: 0,
                health_gain_percentage: 8
              }} />
              <SurvivalDayOption option={{
                description: "Take a day off and rest.",
                difficulty: "rest",
                duration_in_seconds: 0,
                food_gain_percentage: 0,
                water_gain_percentage: 0,
                health_gain_percentage: 5
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* End of Each Day */}
      <div className="flex flex-col gap-2">
        <h3>
          End of Each Day
        </h3>
        <div className="text-sm">
          <p className="text-sm text-gray-400">
            At the end of each day (12AM of your respective timezone) a couple of things will happen:
          </p>
          <ul className="list-disc list-inside mt-3">
            <li>Your food and water will decrease by 5%</li>
            <li>A random event will occur. This event could be good or bad and will affect your health, thirst, or hunger.</li>
          </ul>
        </div>
      </div>
    </div>

    
  );
}
