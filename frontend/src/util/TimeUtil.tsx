export abstract class TimeUtil {
  public static formatTime(date?: Date) {
    if (!date) return "";
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  public static formatDate(dateString?: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const dayInMs = 24 * 60 * 60 * 1000;

    if (diff < dayInMs && now.getDate() === date.getDate()) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    if (diff < 2 * dayInMs && now.getDate() - date.getDate() === 1) {
      return "Yesterday";
    }
    return date.toLocaleDateString();
  }
}
