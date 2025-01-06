export async function getTags() {
  const response = await fetch('http://localhost:5000/api/tags'); // Use your backend URL
  if (!response.ok) {
    throw new Error(`Failed to fetch tags: ${response.statusText}`);
  }
  return await response.json(); // Return the list of tags
}

export async function createTag(tag) {
  const response = await fetch('http://localhost:5000/api/tags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tag),
  });
  if (!response.ok) {
    throw new Error(`Failed to create tag: ${response.statusText}`);
  }
  return await response.json(); // Return the created tag
}
