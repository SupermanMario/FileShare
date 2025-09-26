export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body;

    // If using form data, parse it manually
    let rawData = '';
    req.on('data', chunk => rawData += chunk);
    req.on('end', () => {
      const params = new URLSearchParams(rawData);
      const webhookUrl = params.get('webhook');
      const message = params.get('message');

      if (!webhookUrl || !message) {
        return res.status(400).json({ error: 'Missing fields' });
      }

      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message })
      })
      .then(discordRes => {
        if (!discordRes.ok) throw new Error('Discord failed');
        res.status(200).json({ success: true });
      })
      .catch(() => res.status(500).json({ error: 'Webhook failed' }));
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
// final redeploy trigger
