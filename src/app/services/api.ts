const API_BASE_URL = import.meta.env.DEV ? '/api' : 'http://localhost:5000';

export interface ChatRequest {
  message: string;
  language?: string;
}

export interface ChatResponse {
  response: string;
  language: string;
  contextUsed: number;
  confidence: number;
}

export interface HealthStatus {
  status: string;
  timestamp: string;
  services: {
    search: string;
    ai: string;
  };
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
    return this.request<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getHealthStatus(): Promise<HealthStatus> {
    return this.request<HealthStatus>('/health');
  }
}

export const apiService = new ApiService();