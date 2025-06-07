import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const askAI = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }

    try {
        console.log("🧪 Loaded API Key:", process.env.OPENAI_API_KEY);
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        });
        const reply = completion.choices[0].message.content;
        res.json({ reply });
    } catch (err) {
        console.error('AI error:', err);
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
};