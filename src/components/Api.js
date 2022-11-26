export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  async requireApi(url = "", body, method = "GET") {
    try {
      const options = {
        method,
        headers: this._headers,
      };
      if (body) {
        options.body = JSON.stringify(body);
      }
      const response = await fetch(`${this._baseUrl}${url}`, options);
      const contentType = response.headers.get("Content-Type");
      if (contentType.includes("application/json")) {
        const result = await response.json();
        return result;
      } else {
        throw Error(`Произошла ошибка ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
