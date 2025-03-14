import { useEffect } from 'react';
import { useAuth } from '~/contexts/AuthContext';
import connectWithStrava from '~/assets/images/connect_with_strava.png';

export default function Integrations() {
    const { user } = useAuth();
    const stravaClientId = import.meta.env.VITE_STRAVA_CLIENT_ID;

    const integrations = [
        { name: 'strava', asset_name: connectWithStrava }
    ];

    // useEffect(() => {
    //     if (user?.strava_refresh_token) {
    //         refreshStravaToken({ refresh_token: user.strava_refresh_token });
    //     }
    // }, [user?.strava_refresh_token]);

    if (!user) return null;

    return (
        <div>
            <h3 className='mb-4'>Integrations</h3>
            {integrations.map(integration => (
                <a
                    key={integration.name}
                    style={{ display: 'inline-block' }}
                    href={!user?.strava_access_token 
                        ? `http://www.strava.com/oauth/authorize?client_id=${stravaClientId}&response_type=code&redirect_uri=${window.location.origin}/integration/strava&approval_prompt=force&scope=read,activity:read,activity:read_all`
                        : '/integration/strava'
                    }
                >
                    <img src={integration.asset_name} style={{ width: '220px' }} alt={integration.name} />
                </a>
            ))}
        </div>
    );
}