import type { Item } from "~/api/auth"
import StravaImportActivies from "../strava/StravaImportActivies"
import type { Activity } from "~/api/activity"
export const ImportActivityDialog = ({ onImport }: { onImport: ({ activity, items }: { activity: Activity, items: Item[] }) => void }) => {
    return (
        <div className="modal-box max-h-[800px] overflow-y-auto max-w-[800px]">
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <div>
                        <h2 className="mb-4">Recent Adventures</h2>
                        <p className="mb-4">Select a recent adventure to import to your story</p>
                    </div>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle">✕</button>
                    </form>
                </div>
                <StravaImportActivies onImport={onImport} />
            </div>
        </div>
    )
}
