import { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/utils';



export function useAuth() {
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        role: '',
        id: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    const isAuthenticated = Boolean(user);
    const userRole = user?.role || null;

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsLoading(false);
                return;
            }

            try {

                const payload = JSON.parse(atob(token.split('.')[1]));
                const currentTime = Math.floor(Date.now() / 1000);

                if (payload.exp && payload.exp < currentTime) {
                    throw new Error('Token expired');
                }

                const response = await axiosInstance.get('/auth/me');
                const userData = response.data;

                console.log('Fetched user data:', userData);

                setUser({
                    id: userData.id,
                    email: userData.email,
                    fullName: userData.fullName,
                    role: userData.role,
                });

                localStorage.setItem('fullName', userData.fullName);
                localStorage.setItem('id', userData._id);
                localStorage.setItem('email', userData.email);
                localStorage.setItem('role', userData.role);
            } catch (err) {
                console.error('Auth error:', err);
                setError('Authentication failed');
                localStorage.removeItem('fullName');
                localStorage.removeItem('id');
                localStorage.removeItem('email');
                localStorage.removeItem('role');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return {
        user,
        isLoading,
        error,
        isAuthenticated,
        userRole,
        setUser
    };
}
