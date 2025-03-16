import StravaImportActivies from "../strava/StravaImportActivies"
import type { Activity } from "~/api/activity"
export const ConfirmDeletionDialog = ({ name, onDelete, onCancel }: { name: string, onDelete: () => void, onCancel: () => void }) => {
    return (
        <>
            <div className="modal-box max-h-[800px] overflow-y-auto max-w-[800px]">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="mb-4">Delete {name}</h2>
                            <p className="mb-4">Are you sure you want to delete this {name.toLowerCase()}? This action cannot be undone.</p>
                        </div>
                        <form method="dialog">
                            <button className="btn btn-sm btn-outline btn-circle">✕</button>
                        </form>
                    </div>
                </div>
                <div className="modal-action">
                    <button className="btn btn-error" onClick={onDelete}>Delete</button>
                    <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
                </div>
            </div>

        </>
    )
}
