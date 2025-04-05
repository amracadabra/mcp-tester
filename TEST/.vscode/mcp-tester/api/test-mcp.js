const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { serverConfig } = req.body;

  if (!serverConfig) {
    return res.status(400).json({ success: false, message: 'Missing server configuration' });
  }

  try {
    const testPayload = {
      action: 'sequential-thought',
      input: 'Test request',
    };

    const response = await axios.post(serverConfig, testPayload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    });

    if (response.status === 200) {
      return res.status(200).json({
        success: true,
        message: 'Server is functional!',
        response: response.data,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: 'Unexpected server response',
        details: response.data,
      });
    }
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: 'Error connecting to server',
      error: err.message,
      details: err.response?.data || null,
    });
  }
}
