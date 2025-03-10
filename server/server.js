const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 5001;

app.use(bodyParser.json());

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the AI Email Generator API! 🎉");
});

// Test API Route
app.get("/api/test", (req, res) => {
    res.json({ message: "API is working!" });
});

// POST route to generate email using ChatGPT
app.post('/generate-email', async (req, res) => {
    const { recipient, eventDetails, instructions, tone } = req.body;

    const messages = [
        { role: "system", content: "You are an AI email generator." },
        { role: "user", content: `Write a ${tone} email for ${recipient} about ${eventDetails}. Instructions: ${instructions}` }
    ];

    try {
        const openaiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4-turbo',  // You can use 'gpt-3.5-turbo' for a cheaper option
            messages: messages,
            max_tokens: 300,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
        });

        const generatedEmail = openaiResponse.data.choices[0].message.content;
        res.json({ email: generatedEmail });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate email' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
