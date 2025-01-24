const express = require('express');
const cors = require('cors');
const jobsRoutes = require('./routes/jobs');
const workersRoutes = require('./routes/workers');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobsRoutes);
app.use('/api/workers', workersRoutes);

app.get('/', (req, res) => {
    res.send('Backend server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});