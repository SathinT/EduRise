import express from 'express';
import OpenAI from 'openai';
import { askAI } from '../controllers/aiController.js';

console.log('✅ aiRoutes.js loaded');

const router = express.Router();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

router.post('/ask', askAI);

// router.post('/chat', async (req, res) => {
//     const { message } = req.body;
//
//     try {
//         const response = await openai.chat.completions.create({
//             model: 'gpt-3.5-turbo',
//             messages: [{ role: 'user', content: message }],
//         });
//
//         res.json({ reply: response.choices[0].message.content });
//     } catch (err) {
//         console.error('OpenAI error:', err);
//         res.status(500).json({ error: 'Failed to get AI response' });
//     }
// });

export default router;
