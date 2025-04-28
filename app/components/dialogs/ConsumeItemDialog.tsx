import type { Item } from "~/api/item"
import { useItem } from "~/api/item"
import { metersToMiles } from "~/lib/conversions"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useToast } from "~/contexts/ToastContext"
import { useDialog } from "~/contexts/DialogContext"
export const ConsumeItemDialog = ({ item, onConsume, onCancel }: { item: Item, onConsume: () => void, onCancel: () => void }) => {
    const queryClient = useQueryClient()
    const [consuming, setConsuming] = useState(false)
    const { showToast } = useToast()
    async function consume() {
        try {
            setConsuming(true)
            await useItem(item.id)
            await queryClient.invalidateQueries({ queryKey: ['user'] })
            onConsume()
        } catch (e: any) {
            showToast(e.message, 'error')
        } finally {
            setConsuming(false)
        }
    }
    return (
        <>
            <div className="modal-box max-h-[800px] overflow-y-auto max-w-[800px]">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="mb-4">{item.benefit === 'health' ? 'Consume ' : 'Use '} {item.name}</h2>
                            <p className="italic">
                                {item.description}
                            </p>
                            <p className="font-bold mt-5">
                                {item.benefit === 'health' ? 'Consuming this item will restore your health by ' + item.value + ' points.' : 'Using this item will reduce all distances of your next adventure by ' + metersToMiles(item.value).toFixed(2) + ' miles.'}
                            </p>
                        </div>
                        <form method="dialog">
                            <button className="btn btn-sm btn-outline btn-circle">✕</button>
                        </form>
                    </div>
                </div>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={consume} disabled={consuming}>Use {consuming ? <span className="loading loading-spinner loading-xs"></span> : ''}</button>
                    <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
                </div>
            </div>

        </>
    )
}
