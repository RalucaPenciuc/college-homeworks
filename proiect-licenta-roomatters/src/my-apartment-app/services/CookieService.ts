export function setCookie(cookieName: string, cookieValue: string): void {
  const expirationDate: Date = new Date();
  expirationDate.setTime(expirationDate.getTime() + 7 * 24 * 60 * 60 * 1000); // expires in 7 days
  document.cookie = cookieName + "=" + cookieValue + "; expires=" + expirationDate.toUTCString() + "; path=/";
}

export function getCookie(cookieName: string): string | undefined {
  const cookieValue: string = "; " + document.cookie;
  const parts: string[] = cookieValue.split("; " + cookieName + "=");

  const lastPart: string | undefined = parts.pop();
  if (lastPart) {
    return lastPart.split(";").shift();
  }
  return undefined;
}

export function deleteCookie(cookieName: string): void {
  const date: Date = new Date();
  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000); // expires in -1 days
  document.cookie = cookieName + "=; expires=" + date.toUTCString() + "; path=/";
}
