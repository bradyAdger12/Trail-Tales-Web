import type { Resource } from "~/api/survival_day";
import { ResourceDisplay } from "../resource/ResourceDisplay";
import type { GameNotification } from "~/api/game";

export default function GameNotifications({ notifications }: { notifications: GameNotification[] }) {
    return (
        <ul className="menu w-full rounded-box bg-primary/10">
            {notifications.map((notification, index) => (
                <li key={index}>
                    <div className="flex items-start justify-between w-full gap-y-2 text-xs">
                        <div className="text-base-content font-bold">Day {notification.day}</div>
                        <div className="text-base-content flex-1">{notification.description}</div>
                        <ResourceDisplay resource={notification.resource as Resource} value={notification.resource_change_as_percent} />
                    </div>
                </li>
            ))}
        </ul>
    )
}