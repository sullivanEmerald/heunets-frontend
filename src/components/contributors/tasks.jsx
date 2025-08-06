import { useEffect, useState } from "react"
import { ContributorService } from "../../services/contributor";
import { Singletask } from "./single-task";

const Contibutortasks = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getMyTasks = async () => {
            try {
                const data = await ContributorService.getTasks();
                console.log(data)
                setTasks(data)
            } catch (error) {
                const err = error?.response?.data?.message || 'An error ocurred'
                console.log(err)
            } finally {
                setIsFetching(false)
            }
        }

        getMyTasks();
    }, [])

    if (isFetching) return <p>The tasks are loading.....</p>



    return (
        <>
            <h3>My Tasks</h3>
            <section style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', padding: '20px', alignContent: 'center', justifyContent: 'center' }}>
                {tasks.map((task, index) => (
                    <Singletask key={index} {...task} />
                ))}
            </section>
        </>
    )
}

export default Contibutortasks;