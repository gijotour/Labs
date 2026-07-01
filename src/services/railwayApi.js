const API_BASE_URL = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error('VITE_API_URL is not configured');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || `API request failed: ${response.status}`);
  }

  return response.json();
}

export const railwayApi = {
  getProposals: () => request('/api/proposals'),
  createProposal: (payload) => request('/api/proposals', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  getGuides: () => request('/api/guides'),
  createGuide: (payload) => request('/api/guides', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  updateGuide: (id, payload) => request(`/api/guides/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  }),
  deleteGuide: (id) => request(`/api/guides/${id}`, {
    method: 'DELETE'
  }),

  getUsers: () => request('/api/users'),
  createUser: (payload) => request('/api/users', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  updateUser: (id, payload) => request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  }),
  deleteUser: (id) => request(`/api/users/${id}`, {
    method: 'DELETE'
  })
};

export function isRailwayApiEnabled() {
  return Boolean(API_BASE_URL);
}
