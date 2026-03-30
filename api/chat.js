// api/chat.js
export default async function handler(req, res) {
    // Ambil API Key dari Environment Variable Vercel (Sangat Aman)
    const apiKey = process.env.GEMINI_API_KEY;
    const { message } = req.body;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }],
                systemInstruction: { parts: [{ text: "Kamu adalah asisten Nugraha (18 thn, Cililin). Jawab ramah & singkat." }] }
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Gagal memproses pesan" });
    }
}
