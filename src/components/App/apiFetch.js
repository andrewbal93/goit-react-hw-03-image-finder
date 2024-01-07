import axios from 'axios';

export default async function fetchImgs(query, page) {
  const BaseApiUrl = 'https://pixabay.com/api/';
  const ApiKey = '40442533-4b6791bab363289733298af78';

  const params = new URLSearchParams({
    key: ApiKey,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });

  try {
    const resp = await axios.get(`${BaseApiUrl}`, {
      params,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!resp.status) {
      throw new Error(resp.status || resp.statusText);
    }

    return resp.data;
  } catch (error) {
    console.error(error.message);
  }
}
