const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return response.json();
  },

  async getById<T>(endpoint: string, id: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data with id ${id} from ${endpoint}`);
    }

    return response.json();
  },

  async post<T, D>(endpoint: string, data: D): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to create data at ${endpoint}`);
    }

    return response.json();
  },

  async patch<T, D>(endpoint: string, id: string, data: D): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update data with id ${id} at ${endpoint}`);
    }

    return response.json();
  },

  async delete(endpoint: string, id: string): Promise<void> {
    const response = await fetch(`${API_URL}${endpoint}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete data with id ${id} from ${endpoint}`);
    }
  },
};
