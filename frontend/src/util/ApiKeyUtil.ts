export default abstract class ApiKeyUtil {
  public static saveApiKey(appId: string, apiKey: string) {
    localStorage.setItem(`apiKey-${appId}`, apiKey);
  }

  public static getApiKey(appId: string) {
    return localStorage.getItem(`apiKey-${appId}`);
  }

  public static clearApiKey(appId: string) {
    localStorage.removeItem(`apiKey-${appId}`);
  }
}
