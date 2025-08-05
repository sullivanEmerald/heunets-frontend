"use client"

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/use.auth'
import { Outlet } from 'react-router-dom'

export function RoleGuard({ role }) {
    const navigate = useNavigate()
    const { user, isLoading } = useAuth()
    const [isRedirecting, setIsRedirecting] = useState(false)
    const [redirectMessage, setRedirectMessage] = useState('')

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                setIsRedirecting(true)
                setRedirectMessage('Please log in to continue...')
                setTimeout(() => {
                    navigate('/auth/login')
                }, 500)
                return
            }

            if (user.role !== role) {
                setIsRedirecting(true)
                setRedirectMessage(`Redirecting to ${user.role} dashboard...`)
                setTimeout(() => {
                    navigate(`/auth/login`)
                }, 500)
                return
            }
        }
    }, [isLoading, user, role, navigate])

    return (
        <div>
            {isLoading || isRedirecting ? (
                <p>{isRedirecting ? redirectMessage : ''}</p>
            ) : user && user.role === role ? (
                <div key="content">
                    <Outlet />
                </div>
            ) : null}
        </div>
    )
}
