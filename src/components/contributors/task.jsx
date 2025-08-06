import { useState } from "react";
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { ContributorService } from "../../services/contributor";
import ViewTasks from "./view-tasks";
import Comments from "./comments";

const Task = () => {
    const { id } = useParams();

    const [isFetching, setIsFetching] = useState(true)
    const [error, setIsError] = useState('')
    const [task, setTask] = useState({})
    const [comment, setComment] = useState([])

    useEffect(() => {
        const getTask = async () => {
            try {
                const data = await ContributorService.getTask(id)
                console.log(data)
                setTask(data.transformedTask)
                setComment(data.comments)
            } catch (error) {
                const err = error?.response?.message || 'An errro occurred'
                setIsError(err)
            } finally {
                setIsFetching(false)
            }
        }
        getTask();
    }, [id])


    if (isFetching) return <p>Task is loading......</p>
    if (!task) return <p>No task found</p>


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <button style={{ width: '10%', backgroundColor: '#152a4b', color: '#fff', borderRadius: '20px', padding: '15px', cursor: 'pointer' }} onClick={() => history.back()}>back</button>
            <ViewTasks {...task} />

            <h2 style={{ textAlign: 'center' }}>Applications</h2>
            {comment.length < 1 ? (
                <p style={{ textAlign: 'center' }}>This Task has no Applications Yet</p>
            ) : (
                <section style={{ width: '80%', margin: '10px auto' }}>
                    {comment.map((item, index) => (
                        <Comments key={index} {...item} />
                    ))}
                </section>
            )}
        </div>

    )
}

export default Task