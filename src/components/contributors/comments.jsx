

const Comments = ({ userId, appliedDate, message }) => {
    return (
        <div style={{ borderBottom: '1px solid blue' }} >
            <p>{message}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                <p>Applied by - {userId.fullName}</p>
                <span style={{ textAlign: 'right' }}>
                    {new Date(appliedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </span>
            </div>
        </div>

    )
}

export default Comments