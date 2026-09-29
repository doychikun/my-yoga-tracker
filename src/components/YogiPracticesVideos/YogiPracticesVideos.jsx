import "./YogiPracticesVideos.css";
import { Box, Stack, Typography } from "@mui/material";

const YogiPracticesVideos = ({ practiceVideos }) => {
  // console.log(practiceVideos);
  if (!practiceVideos.length) return null;

  return (
    <Box
      className="youtube-videos-wrapper"
      sx={{ marginTop: { lg: "60px", xs: "20px" } }}
    >
      {/* <Typography className="top-videos-text" variant="h4" mb="33px">
        Watch the best <span>Yogi practices</span> created by our team
      </Typography> */}
      <Stack
        className="youtube-videos-stack"
        sx={{
          flexDirection: { lg: "row" },
          gap: { lg: "110px", xs: "0" },
        }}
      >
        {practiceVideos?.map((item, index) => (
          <a
            key={index}
            className="practice-video"
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <img src={item.video.thumbnails[0].url} alt={item.video.title} />
            <Box>
              <Typography className="videos-title" variant="h6">
                {item.video.title}
              </Typography>
              <Typography className="videos-channel" variant="h6">
                {item.video.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default YogiPracticesVideos;
