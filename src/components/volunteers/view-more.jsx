import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { VolunteerService } from "../../services/volunteer"
import { VolunteerSingle } from "./volunteerSingle"

export const ViewMore = () => {
    const { id } = useParams()
    const [isFetching, setIsFetching] = useState(true)
    const [task, setTask] = useState({})

    const [comment, setComment] = useState('');

    const handleComment = async (id) => {

        if (!comment) {
            setError('comment is required')
            return;
        }

        try {
            const data = await VolunteerService.postComment(comment, id)
            console.log(data)
            setComment('')
        } catch (error) {

        }
    }


    useEffect(() => {
        const getTask = async () => {
            try {
                const data = await VolunteerService.getTask(id)
                console.log(data)
                setTask(data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsFetching(false)
            }
        }
        getTask()
    }, [id])

    if (isFetching) return <p>Task is loading......</p>

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <button onClick={() => history.back()}>back</button>
            <div style={{
                backgroundColor: '#152a4b',
                color: '#fff',
                padding: "20px",
                borderRadius: "10px",
                textDecoration: 'none',
                width: '25%',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <p>{task.title}</p>
                <article>{task.description}</article>
                <span style={{ textAlign: 'right' }}>
                    {new Date(task.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter your comment"
                        style={{ padding: '8px', borderRadius: '5px', border: 'none', width: '100%' }}
                    />
                    <button onClick={() => handleComment(id)} style={{ width: '50px', height: '50px', borderRadius: '50%', cursor: "pointer", padding: '5px' }}>send</button>
                </div>
            </div >
        </div>

    )
}
