const express = require('express');
const router = express.Router();

let jobs = [
    { id: 1, title: 'Очистка фасада', description: 'Очистка фасада здания', budget: 20000, status: 'active', location: 'Москва' },
    { id: 2, title: 'Ремонт крыши', description: 'Ремонт крыши здания', budget: 15000, status: 'completed', location: 'Санкт-Петербург' },
    { id: 3, title: 'Покраска стен', description: 'Покраска фасада', budget: 30000, status: 'active', location: 'Казань' },
];

let workers = [
    { id: 1, name: 'Олег Петров', preferences: { location: 'Москва', minBudget: 10000 }, history: [] },
];

router.get('/:workerId/recommendations', (req, res) => {
    const worker = workers.find(w => w.id === parseInt(req.params.workerId));
    if (!worker) {
        return res.status(404).json({ error: 'Исполнитель не найден' });
    }

    const recommendations = jobs.filter(job => 
        job.location === worker.preferences.location &&
        job.budget >= worker.preferences.minBudget &&
        job.status === 'active'
    );

    res.status(200).json(recommendations);
});

router.post('/:workerId/accept/:jobId', (req, res) => {
    const worker = workers.find(w => w.id === parseInt(req.params.workerId));
    const job = jobs.find(j => j.id === parseInt(req.params.jobId));

    if (!worker || !job) {
        return res.status(404).json({ error: 'Исполнитель или заявка не найдены' });
    }

    if (job.status !== 'active') {
        return res.status(400).json({ error: 'Заявка недоступна для принятия' });
    }

    job.status = 'in progress';
    worker.history.push(job);

    res.status(200).json({ message: 'Заявка принята', job });
});

router.get('/:workerId/history', (req, res) => {
    const worker = workers.find(w => w.id === parseInt(req.params.workerId));
    if (!worker) {
        return res.status(404).json({ error: 'Исполнитель не найден' });
    }

    res.status(200).json(worker.history);
});

module.exports = router;