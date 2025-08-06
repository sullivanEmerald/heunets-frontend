const ViewTasks = ({ title, description, createdAt, id }) => {
    return (
        <div style={{
            backgroundColor: '#152a4b',
            color: '#fff',
            padding: "20px",
            borderRadius: "10px",
            textDecoration: 'none',
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            margin: '20px auto'
        }}>
            <p>{title}</p>
            <article>{description}</article>
            <span style={{ textAlign: 'right' }}>
                {new Date(createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </span>
        </div >
    )
}

export default ViewTasks;