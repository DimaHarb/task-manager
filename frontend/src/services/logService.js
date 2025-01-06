export async function getLogs() {
  const response = await fetch("http://localhost:5000/api/logs");
  if (!response.ok) {
    throw new Error(`Failed to fetch logs: ${response.statusText}`);
  }
  return await response.json();
}
