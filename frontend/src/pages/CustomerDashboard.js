import React, { useState, useEffect } from 'react';

function CustomerDashboard({ userId }) {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({ status: '', minBudget: '', maxBudget: '' });

    useEffect(() => {
        const query = Object.entries(filters)
            .filter(([_, value]) => value)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        fetch(`http://localhost:5000/api/jobs/filter?${query}`)
            .then(response => response.json())
            .then(data => setJobs(data))
            .catch(err => console.error(err));
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Ваши заявки</h1>
            <div>
                <label>
                    Статус:
                    <select name="status" value={filters.status} onChange={handleFilterChange}>
                        <option value="">Все</option>
                        <option value="active">Активные</option>
                        <option value="completed">Завершённые</option>
                        <option value="cancelled">Отменённые</option>
                    </select>
                </label>
                <label>
                    Мин. бюджет:
                    <input
                        type="number"
                        name="minBudget"
                        value={filters.minBudget}
                        onChange={handleFilterChange}
                    />
                </label>
                <label>
                    Макс. бюджет:
                    <input
                        type="number"
                        name="maxBudget"
                        value={filters.maxBudget}
                        onChange={handleFilterChange}
                    />
                </label>
            </div>
            {jobs.map(job => (
                <div key={job.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <p>Бюджет: {job.budget} ₽</p>
                    <p>Статус: {job.status}</p>
                </div>
            ))}
        </div>
    );
}

export default CustomerDashboard;