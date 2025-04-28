import { APP_NAME } from "~/lib/constants";
import type { Route } from "./+types/profile";
import { mmssToSeconds, secondsToMMSS, kilometersToMiles, milesToKilometers } from "~/lib/conversions";
import { useState } from "react";
import { useToast } from "~/contexts/ToastContext";
import { useAuth } from "~/contexts/AuthContext";
import FileUpload from "~/components/FileUpload";
import { S3 } from "~/lib/s3";
import Integrations from "~/components/integrations/Integrations";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { updateMe } from "~/api/auth";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: `Profile - ${APP_NAME}` },
        { name: "description", content: "Manage your account settings and preferences" },
    ];
}

export default function Profile() {
    const { setUser, user } = useAuth()
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        display_name: user?.display_name ?? "",
        weekly_distance_in_kilometers: user?.weekly_distance_in_kilometers ?? 0,
        threshold_pace_seconds: user?.threshold_pace_seconds ?? "0:00"
    });
    const { showToast } = useToast();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const updatedUser = await updateMe({
                display_name: formData.display_name ?? "",
                weekly_distance_in_kilometers: milesToKilometers(formData.weekly_distance_in_kilometers ?? 0),
                threshold_pace_seconds: mmssToSeconds(formData.threshold_pace_seconds.toString() ?? "0:00")
            });
            setUser(updatedUser)
            showToast("Profile updated successfully", "success");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function onFileUpload(key: string) {
        try {
            await updateMe({ avatar_file_key: key })
            setUser({ ...user, avatar_file_key: key })
            queryClient.invalidateQueries({ queryKey: ['user'] })
            showToast('Profile picture uploaded successfully', 'success')
        } catch (e: any) {
            showToast(e.message, 'error')
        }
    }

    async function removeAvatar() {
        await updateMe({ avatar_file_key: '' })
        setUser({ ...user, avatar_file_key: '' })
        queryClient.invalidateQueries({ queryKey: ['user'] })
        showToast('Profile picture removed successfully', 'success')
    }

    return <div>
        <div className="max-w-2xl mx-auto">
            <div className="flex flex-col gap-8">
                <Integrations />
                <div>
                    <h3 className="mb-8">Edit Profile</h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!user?.avatar_file_key ?
                            <FileUpload path={`avatars/${user?.id}`} fileName="avatar" onUpload={(key) => onFileUpload(key)} />
                            : <div className="w-24 h-24 relative">
                                <img src={S3.getUrl(user?.avatar_file_key)} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                                <button className="bg-red-500 btn-circle btn-sm absolute top-0 right-0" onClick={() => removeAvatar()}>
                                    <span className="fas fa-trash"></span>
                                </button>
                            </div>}
                        <div>
                            <label htmlFor="display_name" className="block text-sm font-medium mb-2">
                                Display Name
                            </label>
                            <input
                                type="text"
                                id="display_name"
                                name="display_name"
                                value={formData.display_name}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, display_name: e.target.value }));
                                }}
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label htmlFor="weekly_mileage" className="block text-sm font-medium mb-2">
                                Weekly Mileage
                            </label>
                            <input
                                type="number"
                                id="weekly_mileage"
                                name="weekly_distance_in_kilometers"
                                value={formData.weekly_distance_in_kilometers}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, weekly_distance_in_kilometers: parseInt(e.target.value) }));
                                }}
                                min="0"
                                step="1"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label htmlFor="threshold_pace" className="block text-sm font-medium mb-2">
                                Threshold Pace (seconds)
                            </label>
                            <input
                                type="text"
                                id="threshold_pace"
                                name="threshold_pace_seconds"
                                value={formData.threshold_pace_seconds}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, threshold_pace_seconds: e.target.value }));
                                }}
                                min="0"
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary py-2 px-4 rounded-lg"
                        >
                            Save Changes {isLoading && <span className="loading loading-spinner loading-xs"></span>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
}
