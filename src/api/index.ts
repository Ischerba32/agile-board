import queryString from "query-string";

export const DOMAIN = 'http://localhost:3001';

class Api {
  protected domain: string;

  constructor(domain: string) {
    this.domain = domain;
  }

  async request(url: string, config = {}) {
    const request = await fetch(`${this.domain}/${url}`, {
      ...config,
      // body: JSON.stringify(data),
      headers: {
        'Content-type': 'application-json'
      }
    });

    return await request.json();
  }

  async get(path: string, params = {}) {
    return await this.request(`${path}?${queryString.stringify(params)}`)
  }

  async post(path: string, payload: any) {
    return await this.request(path, {
      body: JSON.stringify(payload),
      method: 'POST'
    })
  }

  async put(path: string, payload: any) {
    return await this.request(path, {
      body: JSON.stringify(payload),
      method: 'PUT'
    })
  }

  async delete(path: string) {
    return await this.request(path, {
      method: 'DELETE'
    })
  }
}

export default new Api(DOMAIN);