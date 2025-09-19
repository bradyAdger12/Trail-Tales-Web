import type { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { forgotPassword } from "~/api/auth"
import { SuccessAlert } from "../alerts/Alerts"
import { ErrorAlert } from "../alerts/Alerts"
export const ForgotPasswordDialog = () => {
    const [formData, setFormData] = useState({
        email: ''
    })
    const [waiting, setWaiting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        setError('')
        setSuccess('')
    }, [])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        try {
            setWaiting(true)
            await forgotPassword({ email: formData.email })
            setSuccess('If this password reset link is valid, you will receive an email with a link to reset your password.')
        } catch (e) {
            const error = e as AxiosError
            setError((error.response?.data as any).message)
        } finally {
            setWaiting(false)
        }
    }
    return (
        <div className="modal-box">
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Forgot password</h1>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle" disabled={waiting}>✕</button>
                    </form>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800/60 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 placeholder-gray-400"
                        placeholder="you@example.com"
                        required
                    />
                    {error && <div className="mt-2"><ErrorAlert message={error} /></div>}
                    {success && <div className="mt-2"><SuccessAlert message={success} /></div>}
                    <button className="btn btn-primary mt-7" type="submit" disabled={waiting || !!success || !formData.email}>Send Password Reset Link{waiting && <span className="loading loading-spinner loading-xs" />}</button>
                </form>
            </div>
        </div>
    )
}
