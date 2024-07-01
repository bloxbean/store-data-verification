import { APIService, HttpMethod } from '@common/api/apiService';
import { Env, Credentials } from '@env/env';

export default class APIHelper {
  private cookieAsHeader: Record<string, string> = {};

  public setCookieAsHeader(cookieAsHeader: Record<string, string>): void {
    this.cookieAsHeader = cookieAsHeader;
  }

  public async getCookieByLoginWithCredential(credentials: Credentials): Promise<Record<string, string>> {
    const req = new APIService(Env.DB_CONN_STRING);
    const body = {
      username: credentials.username,
      password: credentials.password,
    };

    try {
      const endpoint = '';
      req.withDefaultHeaders().uri(endpoint).addBody(body);
      await req.send(HttpMethod.Post);
      return req.getResponse().cookies;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to reach server.');
    } finally {
      req.dispose();
    }
  }
}
