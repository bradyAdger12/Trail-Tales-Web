import { useState } from "react"
import { useAuth } from "~/contexts/AuthContext"
import { useToast } from "~/contexts/ToastContext"
import { S3 } from "~/lib/s3"

export default function FileUpload({ path, fileName, onUpload, accept = 'image/*' }: { path: string, fileName?: string, onUpload: (key: string) => void, accept?: string }) {
    const [isHovering, setIsHovering] = useState(false)
    const [uploading, setUploading] = useState(false)
    const s3Client = S3.getInstance()
    const { showToast } = useToast()
    async function onDrop(file: File | null | undefined) {
        setIsHovering(false)
        try {
            setUploading(true)
            if (file) {
                const extension = file.type.split('/')[1]
                const fullPath = `${path}/${fileName}.${extension}`
                console.log('fullPath', fullPath)
                await s3Client.uploadFile({ file, key: fullPath })
                onUpload(fullPath)
            } else {
                throw { message: 'Error uploading file' }
            }
        } catch (e: any) {
            showToast(e.message, "error")
        } finally {
            setUploading(false)
        }
    }
    return (
        <div className={`border border-dashed border-gray-300 text-gray-400 hover:bg-black/10 p-8 text-center rounded-lg relative ${isHovering && 'bg-black/10'}`}
            onDrop={(e) => { e.preventDefault(); onDrop(e.dataTransfer.files[0]) }}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsHovering(true)}
            onDragLeave={() => setIsHovering(false)}
        >
            <input type="file" accept={accept} className="w-full h-full absolute top-0 left-0 cursor-pointer text-transparent" onChange={(e) => onDrop(e.target.files?.item(0))} />
            {uploading && <span className="loading loading-spinner loading-xs mr-2 mb-1"></span>}
            {isHovering ? 'Drop here' : 'Click here or drop file to upload'}
        </div>
    )
}