export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const webhookUrl = 'https://discord.com/api/webhooks/your_webhook_id/your_webhook_token';

    const payload = {
      content: 'Webhook fired from Vercel endpoint!',
    };

    const discordRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!discordRes.ok) {
      return res.status(500).json({ error: 'Discord webhook failed' });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}