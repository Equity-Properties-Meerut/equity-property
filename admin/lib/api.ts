const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to set auth token
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Helper function to remove auth token
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Base fetch function with authentication
const fetchAPI = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getAuthToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }

  return data;
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (response.token) {
      setAuthToken(response.token);
    }
    return response;
  },

  register: async (name: string, email: string, password: string, role = 'admin') => {
    const response = await fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });
    return response;
  },

  getMe: async () => {
    return fetchAPI('/auth/me');
  },

  updateDetails: async (name: string, email: string) => {
    return fetchAPI('/auth/updatedetails', {
      method: 'PUT',
      body: JSON.stringify({ name, email }),
    });
  },

  updatePassword: async (currentPassword: string, newPassword: string) => {
    return fetchAPI('/auth/updatepassword', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  logout: () => {
    removeAuthToken();
  },
};

// Properties API
export const propertiesAPI = {
  getAll: async (params?: {
    status?: string;
    propertyType?: string;
    transactionType?: string;
    area?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    const queryString = queryParams.toString();
    return fetchAPI(`/properties${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id: string) => {
    return fetchAPI(`/properties/${id}`);
  },

  create: async (formData: FormData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/properties`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  },

  update: async (id: string, formData: FormData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_URL}/properties/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  },

  delete: async (id: string) => {
    return fetchAPI(`/properties/${id}`, {
      method: 'DELETE',
    });
  },

  updateStatus: async (id: string, status: 'active' | 'inactive') => {
    return fetchAPI(`/properties/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  getDashboardStats: async () => {
    return fetchAPI('/properties/stats/dashboard');
  },
};

// Property Inquiries API
export const inquiriesAPI = {
  getAll: async (params?: {
    status?: string;
    property?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    const queryString = queryParams.toString();
    return fetchAPI(`/inquiries${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id: string) => {
    return fetchAPI(`/inquiries/${id}`);
  },

  create: async (data: {
    name: string;
    email: string;
    phone: string;
    property: string;
    message: string;
  }) => {
    return fetchAPI('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: { status?: string }) => {
    return fetchAPI(`/inquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return fetchAPI(`/inquiries/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return fetchAPI('/inquiries/stats');
  },
};

// General Inquiries API
export const generalInquiriesAPI = {
  getAll: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    const queryString = queryParams.toString();
    return fetchAPI(`/general-inquiries${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id: string) => {
    return fetchAPI(`/general-inquiries/${id}`);
  },

  update: async (id: string, data: { status?: string }) => {
    return fetchAPI(`/general-inquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string) => {
    return fetchAPI(`/general-inquiries/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return fetchAPI('/general-inquiries/stats');
  },
};

