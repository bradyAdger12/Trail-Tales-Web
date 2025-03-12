import { createContext, useContext, useState } from "react";

export interface DialogContextType {
    openDialog: (dialog: React.ReactNode) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)


export function DialogProvider({ children }: { children: React.ReactNode }) {
    const [dialog, setDialog] = useState<React.ReactNode | null>(null)
    const id = 'default_modal'

    function openDialog(dialog: React.ReactNode) {
        setDialog(dialog)
        const modal = document.getElementById(id)
        if (modal) {
            (modal as HTMLDialogElement).showModal()
        }
    }

    return <DialogContext.Provider value={{ openDialog }}>
        {children}
        {<dialog id={id} className="modal">
            {dialog}
        </dialog>}
    </DialogContext.Provider>
}

export function useDialog() {
    const context = useContext(DialogContext)
    if (!context) {
        throw new Error("useDialog must be used within a DialogProvider")
    }
    return context
}



