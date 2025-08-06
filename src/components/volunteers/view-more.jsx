import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { VolunteerService } from "../../services/volunteer"
import { useNavigate } from "react-router-dom"

const ViewMore = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState('')
    const [task, setTask] = useState({})
    const [comment, setComment] = useState('');
    const [userApplied, setUserApplied] = useState(false)

    const getTask = async () => {
        try {
            const data = await VolunteerService.getTask(id);
            console.log(data)
            setTask(data.task);
            setUserApplied(data.hasUserCommented)
            setError('');
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.error || 'Could not load task');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (id) getTask();
    }, [id]);

    const handleComment = async (id) => {
        if (!comment.trim()) {
            setError('Comment is required');
            return;
        }

        try {
            await VolunteerService.postComment(comment, id);
            alert('congratulations. you have applied for this tasks')
            setComment('');
            setError('');
            setTimeout(() => {
                navigate('/volunteer/dashboard')
            }, 1500)
            // getTask(); 
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message || 'Could not post comment');
        }
    };

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
            <button onClick={() => navigate(-1)}>Back</button>
            {error && <p>{error}</p>}
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
                <p>{task?.title}</p>
                <article>{task?.description}</article>
                <span style={{ textAlign: 'right' }}>
                    {new Date(task?.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </span>
                {userApplied ? <p style={{ color: 'green' }}>You have already Applied. Wait for Feedback and Congrat.</p> : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Enter your comment"
                            style={{ padding: '8px', borderRadius: '5px', border: 'none', width: '100%' }}
                        />
                        <button onClick={() => handleComment(id)} style={{ width: '50px', height: '50px', borderRadius: '50%', cursor: "pointer", padding: '5px' }}> Apply</button>
                    </div>
                )}
            </div >
        </div>

    )
}

export default ViewMore;
