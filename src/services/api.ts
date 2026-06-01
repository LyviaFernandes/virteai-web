import { ApiError } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://virteai-backend-tcc.onrender.com';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
  body?: any;
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async getAuthToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');
    let data: any;

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw {
        message: data?.message || data?.error || 'API Error',
        status: response.status,
        data,
      } as ApiError;
    }

    return data;
  }

  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      skipAuth = false,
      body,
      headers: customHeaders = {},
      ...restOptions
    } = options;

    const headers: Record<string, string> = {
      ...(customHeaders as Record<string, string>),
    };

    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (!skipAuth) {
      const token = await this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const url = `${this.baseURL}${endpoint}`;
    const fetchOptions: RequestInit = {
      ...restOptions,
      headers,
    };

    if (body) {
      fetchOptions.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    try {
      const response = await fetch(url, fetchOptions);
      return this.handleResponse<T>(response);
    } catch (error: any) {
      if (error.status === 401) {
        // Token expired or invalid
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/Login';
        }
      }
      throw error;
    }
  }

  // GET
  get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  // POST
  post<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  // PUT
  put<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  // PATCH
  patch<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  // DELETE
  delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new APIClient();
