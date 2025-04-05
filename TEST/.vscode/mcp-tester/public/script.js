document.getElementById('test-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const serverConfigInput = document.getElementById('server-config');
  const resultsDiv = document.getElementById('results');
  const serverConfig = serverConfigInput.value.trim();

  // Clear previous results
  resultsDiv.innerHTML = '';

  // Basic validation
  if (!serverConfig) {
    resultsDiv.innerHTML = `<p style="color: red;">Please enter a valid MCP server configuration URL.</p>`;
    return;
  }

  resultsDiv.innerHTML = '🧪 Testing MCP server... Please wait.';

  try {
    const response = await fetch('/api/test-mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serverConfig }),
    });

    const data = await response.json();

    if (data.success) {
      resultsDiv.innerHTML = `
        <p style="color: green;">✅ Success: ${data.message}</p>
        <pre>${JSON.stringify(data.response, null, 2)}</pre>
      `;
    } else {
      resultsDiv.innerHTML = `
        <p style="color: red;">❌ Error: ${data.message}</p>
        ${
          data.details
            ? `<pre>${JSON.stringify(data.details, null, 2)}</pre>`
            : ''
        }
      `;
    }
  } catch (error) {
    resultsDiv.innerHTML = `<p style="color: red;">❌ Network error: Could not connect to backend.</p>`;
    console.error('Frontend fetch error:', error);
  }
});
