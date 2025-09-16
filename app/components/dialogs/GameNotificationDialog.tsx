import type { GameNotification } from "~/api/game"
import { ResourceDisplay } from "../resource/ResourceDisplay"
import type { Resource } from "~/api/survival_day"
import { useEffect, useState } from "react"
import { setSeenNotifications } from "~/api/game"
import { useDialog } from "~/contexts/DialogContext"
import _ from "lodash"

export const GameNotificationDialog = ({ notifications, game_id }: { notifications: GameNotification[], game_id: string }) => {
    const { closeDialog } = useDialog()
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
                                    <div className="text-base-content">Day {notification.day}</div>
                                    <div className="text-base-content flex-1 text-center">{notification.description}</div>
                                    <ResourceDisplay resource={notification.resource as Resource} value={notification.resource_change_as_percent} />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-row items-center gap-2 mt-4">
                        <div className="text-base-content">Total: </div>
                        <ResourceDisplay resource="food" value={_.sumBy(notifications.filter(n => n.resource === 'food'), 'resource_change_as_percent')} />
                        <ResourceDisplay resource="water" value={_.sumBy(notifications.filter(n => n.resource === 'water'), 'resource_change_as_percent')} />
                        <ResourceDisplay resource="health" value={_.sumBy(notifications.filter(n => n.resource === 'health'), 'resource_change_as_percent')} />
                    </div>
                    <button className="btn btn-primary btn-sm btn-outline mt-4" onClick={() => closeDialog()}>OK</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </>
    )
}
