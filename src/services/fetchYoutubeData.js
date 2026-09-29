// connection with Rapid API

const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

export const fetchYoutubeData = async (practiceType, { signal } = {}) => {
  if (!RAPIDAPI_KEY) {
    throw new Error("Missing REACT_APP_RAPIDAPI_KEY. Add it to your .env.local file.");
  }

  const response = await fetch(
    `https://youtube-search-and-download.p.rapidapi.com/search?query=${encodeURIComponent(practiceType)}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
        "X-RapidAPI-Key": RAPIDAPI_KEY,
      },
      signal,
    }
  );

  if (!response.ok) {
    throw new Error(`Video search failed with status ${response.status}`);
  }

  return response.json();
};
