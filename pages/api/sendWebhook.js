export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { webhook, message } = req.body;
  if (!webhook || !message) return res.status(400).json({ error: 'Missing fields' });

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
