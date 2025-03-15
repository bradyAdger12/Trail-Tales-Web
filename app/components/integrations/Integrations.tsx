import { useEffect } from 'react';
import { useAuth } from '~/contexts/AuthContext';
import connectWithStrava from '~/assets/images/connect_with_strava.png';

export default function Integrations() {
    const { user } = useAuth();
    const stravaClientId = import.meta.env.VITE_STRAVA_CLIENT_ID;

    const integrations = [
        { name: 'strava', asset_name: connectWithStrava }
    ];

    if (!user) return null;

    return (
        <div>
            <h3 className='mb-4'>Integrations</h3>
            {integrations.map(integration => (
                <a
                    key={integration.name}
                    style={{ display: 'inline-block' }}
                    className='relative'
                    href={!user?.strava_access_token
                        ? `http://www.strava.com/oauth/authorize?client_id=${stravaClientId}&response_type=code&redirect_uri=${window.location.origin}/integration/strava&approval_prompt=force&scope=read,activity:read,activity:read_all`
                        : undefined
                    }
                >
                    <img src={integration.asset_name} style={{ width: '220px' }} alt={integration.name} />
                    {user.strava_access_token && <span className='absolute -top-2 right-0 bg-green-500 text-white px-2 py-1 rounded-full text-xs z-10'>Connected</span>}
                </a>
            ))}
        </div>
    );
}