require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
// cors lets frontend communicate with backend 
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Read data from HTML forms
app.use(cors()); 

// Connect to database
connectDB();

// Import routes
const authRoutes = require('./routes/authRoutes');

// Use routes
app.use('/api/auth', authRoutes);

// AI Text Copywriter Endpoint
app.post('/api/ai/generate', async (req, res) => {
    const { description, format } = req.body;

    if (!description) {
        return res.status(400).json({ message: "Please provide business parameters." });
    }

    const dataToSend = JSON.stringify({ description, format });

    // Spawn Python process executing our new script
    const pythonProcess = spawn('python', [
        path.join(__dirname, 'aiServices', 'geminiService.py'), 
        dataToSend
    ]);

    let scriptOutput = "";
    let scriptError = "";

    pythonProcess.stdout.on('data', (data) => {
        scriptOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        scriptError += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python process crashed with exit code ${code}: ${scriptError}`);
            return res.status(500).json({ message: "AI script runtime error occurred." });
        }

        try {
            const parsedData = JSON.parse(scriptOutput.trim());
            if (parsedData.status === "error") {
                return res.status(500).json({ message: parsedData.message });
            }
            res.status(200).json({ content: parsedData.content });
        } catch (error) {
            console.error("Failed to parse string:", scriptOutput);
            res.status(500).json({ message: "Failed to process AI execution results." });
        }
    });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

