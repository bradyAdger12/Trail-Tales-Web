import { APP_NAME, TIMEZONES } from "~/lib/constants";
import type { Route } from "./+types/profile";
import React, { useEffect, useState } from "react";
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
        display_name: "",
        timezone: "",
        unit: "imperial",
    });
    const [originalFormData, setOriginalFormData] = useState({});
    const unit_options = [
        { label: 'Imperial', value: 'imperial' },
        { label: 'Metric', value: 'metric' },
    ]
    const { showToast } = useToast();

    useEffect(() => {
        setFormData({
            display_name: user?.display_name || "",
            timezone: user?.timezone || "",
            unit: user?.unit || "imperial",
        })
        setOriginalFormData({
            display_name: user?.display_name || "",
            timezone: user?.timezone || "",
            unit: user?.unit || "imperial",
        })
    }, [user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const updatedUser = await updateMe({
                ...formData
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
                <div>
                    <h3 className='mb-4'>Integrations</h3>
                    <Integrations />
                </div>
                <div>
                    <h3 className="mb-8">Edit Profile</h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!user?.avatar_file_key ?
                            <FileUpload path={`avatars/${user?.id}`} fileName="avatar" onUpload={(key) => onFileUpload(key)} />
                            : <div className="w-24 h-24 relative">
                                <img key={user?.avatar_file_key} src={S3.getUrl(user?.avatar_file_key)} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                                <button className="bg-error btn-circle btn-sm absolute top-0 right-0" onClick={() => removeAvatar()}>
                                    <span className="fas fa-trash text-error-content"></span>
                                </button>
                            </div>}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={user?.email}
                                readOnly
                                disabled
                            />
                        </div>
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
                            />
                        </div>
                        <div>
                            <label htmlFor="timezone" className="block text-sm font-medium mb-2">
                                Timezone
                            </label>
                            <select
                                id="timezone"
                                name="timezone"
                                value={formData.timezone}
                                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                required
                            >
                                {TIMEZONES.map((timezone) => (
                                    <option key={timezone.value} value={timezone.value}>
                                        {timezone.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="unit" className="block text-sm font-medium mb-2">
                                Unit
                            </label>
                            <select
                                id="unit"
                                name="unit"
                                value={formData.unit}
                                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                required
                            >
                                {unit_options.map((unit) => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary py-2 px-4 rounded-lg"
                            disabled={isLoading || JSON.stringify(formData) === JSON.stringify(originalFormData)}
                        >
                            Save Changes {isLoading && <span className="loading loading-spinner loading-xs"></span>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
}
