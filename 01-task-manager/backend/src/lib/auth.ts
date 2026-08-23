const API_KEY_HEADER = 'x-api-key';

export function isAuthorized(request: Request): boolean {
  const expectedKey = process.env.API_KEY;

  if (!expectedKey) {
    // Fail closed: an unconfigured API key means every request is rejected.
    return false;
  }

  const providedKey = request.headers.get(API_KEY_HEADER);
  return providedKey === expectedKey;
}
