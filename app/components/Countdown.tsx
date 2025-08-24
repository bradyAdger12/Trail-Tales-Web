import { useState, useEffect } from 'react';
import { useAuth } from '~/contexts/AuthContext';

export default function Countdown() {
    const { user } = useAuth()
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const denver = new Date(now.toLocaleString("en-US", { timeZone: user?.timezone }));
            const midnight = new Date(denver);
            midnight.setHours(24, 0, 0, 0); // Next midnight

            const diff = midnight.getTime() - denver.getTime();

            if (diff > 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setTimeLeft({ hours, minutes, seconds });
            } else {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <p className="text-sm text-gray-400 mb-2">
                Until next day
            </p>
            <div className="flex gap-5">
                <div>
                    <span className="countdown font-mono text-4xl">
                        <span style={{ "--value": timeLeft.hours } as React.CSSProperties} aria-live="polite" aria-label="10">{timeLeft.hours.toString()}</span>
                    </span>
                    hours
                </div>
                <div>
                    <span className="countdown font-mono text-4xl">
                        <span style={{ "--value": timeLeft.minutes } as React.CSSProperties} aria-live="polite" aria-label="24">{timeLeft.minutes.toString()}</span>
                    </span>
                    min
                </div>
                <div>
                    <span className="countdown font-mono text-4xl">
                        <span style={{ "--value": timeLeft.seconds } as React.CSSProperties} aria-live="polite" aria-label="59">{timeLeft.seconds.toString()}</span>
                    </span>
                    sec
                </div>
            </div>
        </div>
    )
}