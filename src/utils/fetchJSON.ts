export default async function fetchJSON<T>(
  url: string,
  auth: string
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${url}`);
  }

  return response.json() as Promise<T>;
}
