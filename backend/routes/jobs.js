const express = require('express');
const router = express.Router();

let jobs = [
    { id: 1, title: 'Очистка фасада', description: 'Очистка фасада здания', budget: 20000, status: 'active', location: 'Москва' },
    { id: 2, title: 'Ремонт крыши', description: 'Ремонт крыши здания', budget: 15000, status: 'completed', location: 'Санкт-Петербург' },
    { id: 3, title: 'Покраска стен', description: 'Покраска фасада', budget: 30000, status: 'active', location: 'Казань' },
];

router.get('/', (req, res) => {
    res.status(200).json(jobs);
});

router.get('/filter', (req, res) => {
    const { status, minBudget, maxBudget } = req.query;

    let filteredJobs = jobs;

    if (status) {
        filteredJobs = filteredJobs.filter(job => job.status === status);
    }

    if (minBudget) {
        filteredJobs = filteredJobs.filter(job => job.budget >= parseInt(minBudget));
    }

    if (maxBudget) {
        filteredJobs = filteredJobs.filter(job => job.budget <= parseInt(maxBudget));
    }

    res.status(200).json(filteredJobs);
});

module.exports = router;