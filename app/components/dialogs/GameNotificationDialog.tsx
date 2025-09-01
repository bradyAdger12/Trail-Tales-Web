import type { GameNotification } from "~/api/game"
import { ResourceDisplay } from "../resource/ResourceDisplay"
import type { Resource } from "~/api/survival_day"
import { useEffect, useState } from "react"
import { setSeenNotifications } from "~/api/game"

export const GameNotificationDialog = ({ notifications, game_id }: { notifications: GameNotification[], game_id: string }) => {
    useEffect(() => {
        setSeenNotifications(game_id)
    }, [])
    return (
        <>
            <div className="modal-box">
                <div>
                    <ul className="menu bg-base-200 w-full rounded-box">
                        {notifications.map((notification, index) => (
                            <li key={index}>
                                <div className="flex items-center justify-between w-full gap-y-2 text-xs">
                                    <span className="text-base-content">Day {notification.day}</span>
                                    <span className="text-base-content">{notification.description}</span>
                                    <ResourceDisplay resource={notification.resource as Resource} value={notification.resource_change_as_percent} />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-primary btn-sm btn-outline mt-4">OK</button>
                </div>
            </div>
        </>
    )
}
