
import { Link } from "react-router-dom"
export const Singletask = ({ title, description, createdBy, createdAt, id }) => {
    console.log(title)
    return (
        <a href={`/contributor/my-posted-tasks/${id}`} style={{ backgroundColor: '#152a4b', color: '#fff', padding: "20px", borderRadius: "10px", textDecoration: 'none', width: '25%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p>{title}</p>
            <article>{description}</article>
            <span style={{ textAlign: 'right' }}>
                {new Date(createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </span>
        </a>
    )
}
