import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  useGame } from "~/contexts/GameContext";
import { startGame } from "~/api/game";
import CharacterSelector from "../character/CharacterSelector";
import { useState } from "react";
import type { CharacterTemplate } from "~/api/character";
import { useDialog } from "~/contexts/DialogContext";
import { useNavigate } from "react-router";
import { milesToKilometers } from "~/lib/conversions";

export default function GameConfiguration() {
    const { setGame } = useGame()
    const client = useQueryClient()
    const { openDialog } = useDialog()
    const [thresholdPaceMinutes, setThresholdPaceMinutes] = useState<number | null>(6)
    const [thresholdPaceSeconds, setThresholdPaceSeconds] = useState<number | null>(15)
    const [character, setCharacter] = useState<CharacterTemplate | null>(null)
    const [weeklyMileage, setWeeklyMileage] = useState(20)
    const navigate = useNavigate()
    const start = useMutation({
        mutationFn: () => {
            if (!character) {
                throw new Error("Character is required")
            }
            if (!weeklyMileage) {
                throw new Error("Weekly mileage is required")
            }
            if (thresholdPaceMinutes === null || thresholdPaceSeconds === null) {
                throw new Error("Threshold pace is required")
            }
            return startGame({
                weekly_distance_in_kilometers: milesToKilometers(weeklyMileage),
                threshold_pace_minutes: thresholdPaceMinutes,
                threshold_pace_seconds: thresholdPaceSeconds,
                character: character
            })
        },
        onSuccess: (response) => {
            setGame(response)
            navigate(`/game/${response.id}/survival_day/${response.survival_days[0].id}`)
        },
        meta: {
            timeout: 100000
        }
    })
    const buttonDisabled = start.isPending || !character || !weeklyMileage || thresholdPaceMinutes === null || thresholdPaceSeconds === null
    return (
        <div>
            <div className="flex flex-col gap-10">
                <div>
                    <h1>Select your character</h1>
                    <CharacterSelector onSelect={(character) => {
                        setCharacter(character)
                    }} />
                </div>
                <div className="w-1/2">
                    <h1>Select your difficulty</h1>
                    <p>Your difficulty is based off of your weekly mileage and pace</p>
                    <div className="mt-8">
                        <label htmlFor="weekly_mileage" className="block text-sm font-medium mb-2">
                            Weekly Mileage
                        </label>
                        <input
                            type="number"
                            id="weekly_mileage"
                            name="weekly_distance_in_kilometers"
                            value={weeklyMileage}
                            onChange={(e) => {
                                setWeeklyMileage(parseInt(e.target.value))
                            }}
                            min="0"
                            step="1"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="mt-3">
                        <label htmlFor="threshold_pace" className="block text-sm font-medium mb-2">
                            Estimated 5k pace
                        </label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="number"
                                id="threshold_pace"
                                name="threshold_pace_minutes"
                                value={thresholdPaceMinutes ?? ""}
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                        setThresholdPaceMinutes(null)
                                        return
                                    }
                                    const value = parseInt(e.target.value)
                                    if (value <= 59 && value >= 0) {
                                        setThresholdPaceMinutes(value)
                                    }
                                }}
                                min={0}
                                max={59}
                                className="w-1/3 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-primary"
                            />
                            <span>:</span>
                            <input
                                type="number"
                                id="threshold_pace"
                                name="threshold_pace_seconds"
                                value={thresholdPaceSeconds ?? ""}
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                        setThresholdPaceSeconds(null)
                                        return
                                    }
                                    const value = parseInt(e.target.value)
                                    if (value <= 59 && value >= 0) {
                                        setThresholdPaceSeconds(value)
                                    }
                                }}
                                min={0}
                                max={59}
                                className="w-1/3 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        className="btn btn-primary"
                        disabled={buttonDisabled}
                        onClick={() => start.mutate()}
                    >
                        Start Game {start.isPending && <span className="loading loading-spinner loading-sm"></span>}
                    </button>
                </div>
            </div>
        </div>
    )
}
