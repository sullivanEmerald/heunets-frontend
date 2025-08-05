import { useState } from "react";
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { ContributorService } from "../../services/contributor";
import { Singletask } from "./single-task";

const Task = () => {
    const { id } = useParams();

    console.log(id)
    const [isFetching, setIsFetching] = useState(true)
    const [error, setIsError] = useState('')
    const [task, setTask] = useState({})

    useEffect(() => {
        const getTask = async () => {
            try {
                const data = await ContributorService.getTask(id)
                console.log(data)
                setTask(data)
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
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <button onClick={() => history.back()}>back</button>
            <Singletask {...task} />
        </div>

    )
}

export default Task