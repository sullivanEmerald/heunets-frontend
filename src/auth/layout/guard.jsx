import { Outlet } from 'react-router-dom';

const AuthGuard = () => {
    const isAuthenticated = true; // Replace with actual authentication logic

    if (!isAuthenticated) {
        return <div>Please log in to access this page.</div>;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default AuthGuard;