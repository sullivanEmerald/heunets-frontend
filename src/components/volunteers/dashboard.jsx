import { useEffect, useState } from "react"
import { Singletask } from "../contributors/single-task";
import { VolunteerService } from "../../services/volunteer";
import { VolunteerSingle } from "./volunteerSingle";

const VolunteerDashboard = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getMyTasks = async () => {
            try {
                const data = await VolunteerService.getTasks();
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
            <h3>Tasks Feeds and Reels</h3>
            <section style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: "center", gap: '10px', padding: '20px', flexDirection: 'row' }}>
                {tasks.map((task, index) => (
                    <VolunteerSingle key={index} {...task} />
                ))}
            </section>
        </>
    )
}

export default VolunteerDashboard;