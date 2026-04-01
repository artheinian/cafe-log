const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models/User');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/auth'));

// Sync database
sequelize.sync()
    .then(() => console.log('✅ SQLite Database connected'))
    .catch(err => console.log('❌ Database error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});