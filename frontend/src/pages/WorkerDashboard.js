import React, { useState, useEffect } from 'react';

function WorkerDashboard({ workerId }) {
    const [recommendations, setRecommendations] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/workers/${workerId}/recommendations`)
            .then(response => response.json())
            .then(data => setRecommendations(data))
            .catch(err => console.error(err));

        fetch(`http://localhost:5000/api/workers/${workerId}/history`)
            .then(response => response.json())
            .then(data => setHistory(data))
            .catch(err => console.error(err));
    }, [workerId]);

    const handleAccept = (jobId) => {
        fetch(`http://localhost:5000/api/workers/${workerId}/accept/${jobId}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => alert(data.message))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Рекомендованные заявки</h1>
            {recommendations.length > 0 ? (
                recommendations.map(job => (
                    <div key={job.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <p>Бюджет: {job.budget} ₽</p>
                        <p>Местоположение: {job.location}</p>
                        <button onClick={() => handleAccept(job.id)}>Принять</button>
                    </div>
                ))
            ) : (
                <p>Нет доступных рекомендаций.</p>
            )}

            <h2>История заявок</h2>
            {history.length > 0 ? (
                history.map(job => (
                    <div key={job.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <p>Бюджет: {job.budget} ₽</p>
                        <p>Статус: {job.status}</p>
                    </div>
                ))
            ) : (
                <p>История заявок пуста.</p>
            )}
        </div>
    );
}

export default WorkerDashboard;