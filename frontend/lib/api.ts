const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Base fetch function
const fetchAPI = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

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
};

// Property Inquiries API (from property detail page)
export const inquiriesAPI = {
  create: async (data: {
    name: string;
    email: string;
    phone: string;
    property: string; // Required for property inquiries
    message: string;
  }) => {
    return fetchAPI('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// General Inquiries API (from contact page and other forms)
export const generalInquiriesAPI = {
  create: async (data: {
    name: string;
    email: string;
    phone: string;
    inquiryType?: string;
    message: string;
  }) => {
    return fetchAPI('/general-inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

