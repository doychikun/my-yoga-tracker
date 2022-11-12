// connection with Rapid API

export const fetchYoutubeData = async (practiceType) => {
  const response = await fetch(`https://youtube-search-and-download.p.rapidapi.com/search?query=${practiceType}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
      "X-RapidAPI-Key": "9d9e9b1e13msh93f8225b4adc944p1e1550jsn951ef8fa2be4",
    },
  });
  const data = await response.json();

  return data;
};
