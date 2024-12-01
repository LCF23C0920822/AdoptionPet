// Miguel Poma
// c0920822
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Importar módulo para manejar rutas

dotenv.config();

const app = express();

const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Routes
app.use('/api', userRoutes);
app.use('/api', petRoutes);

// Middleware para servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Ruta genérica para manejar todas las peticiones que no sean de API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Puerto de la aplicación
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
