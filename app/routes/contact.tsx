import { useState } from "react";
import type { Route } from "./+types/contact";
import { sendContact } from "~/api/auth";
import { ErrorAlert, SuccessAlert } from "~/components/alerts/Alerts";
import { APP_NAME } from "~/lib/constants";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: `Contact - ${APP_NAME}` },
    { name: "description", content: `Contact us for support or to learn more about ${APP_NAME}` },
  ];
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(null);
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setWaiting(true);
      await sendContact(formData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setWaiting(false);
      setSuccess("Message sent successfully");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            required
            placeholder="Your Message"
            onChange={handleChange}
          ></textarea>
        </div>

        {error && <ErrorAlert message={error} />}
        {success && <SuccessAlert message={success} />}

        <div>
          <button
            type="submit"
            disabled={waiting || !!error || !!success}
            className="btn btn-primary w-full"
          >
            Send Message {waiting && <span className="loading loading-spinner loading-xs"></span>}
          </button>
        </div>
      </form>
    </div>
  );
}
