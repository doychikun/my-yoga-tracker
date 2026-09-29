import "./YogiPractices.css";
import { useState, useEffect } from "react";
import { fetchYoutubeData } from "../../services/fetchYoutubeData";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { yogaTypes } from "../../common/yoga.types";
import PrimaryButton1 from "../../components/PrimaryButton1/PrimaryButton1"
import YogiPracticesVideos from "../../components/YogiPracticesVideos/YogiPracticesVideos"
import Pagination from "@mui/material/Pagination";
import Loader from "../../components/Loader/Loader";

function YogiPractices() {
  const [practiceType, setPracticeType] = useState(yogaTypes.DEFAULT_VINYASA_FLOW_YOGA);
  const [practiceVideos, setPracticeVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [practicesPerPage] = useState(8);
  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };
  const indexOfLastPractice = currentPage * practicesPerPage;
  const indexOfFirstPractice = indexOfLastPractice - practicesPerPage;
  const currentPracticeVideos = practiceVideos.slice(
    indexOfFirstPractice,
    indexOfLastPractice
  );
  const pageCount = Math.ceil(practiceVideos.length / practicesPerPage);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPracticesData = async () => {
      setIsLoading(true);
      setError(null);
      setPracticeVideos([]);
      try {
        const practiceVideosData = await fetchYoutubeData(practiceType, {
          signal: controller.signal,
        });
        // the search can also return channels and playlists, keep only videos
        const videos = (practiceVideosData?.contents || []).filter(
          (item) => item.video?.videoId
        );
        setPracticeVideos(videos);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
        setError("We couldn't load the practice videos. Please try again.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchPracticesData();
    return () => controller.abort();
  }, [practiceType, reloadKey]);

  return (
    <Box
      className="YogiPractices"
      sx={{ mt: { lg: "100px" } }}
    >
      <Typography variant="h4" mb="60px">
        Yogi Practices created by our team
      </Typography>
      <PrimaryButton1 text="Vinyasa Flow"
      on={() => {
        setPracticeType(yogaTypes.DEFAULT_VINYASA_FLOW_YOGA);
        setCurrentPage(1);
        window.scrollTo({ top: 400, behavior: "smooth" });
      }} />
      <PrimaryButton1 text="Hatha Yoga"
      on={() => {
        setPracticeType(yogaTypes.HATHA_YOGA);
        setCurrentPage(1);
        window.scrollTo({ top: 400, behavior: "smooth" });
      }}/>
      <PrimaryButton1
        text="Ashtanga Yoga"
        on={() => {
          setPracticeType(yogaTypes.ASHTANGA_YOGA);
          setCurrentPage(1);
          window.scrollTo({ top: 400, behavior: "smooth" });
        }}
      />
      <PrimaryButton1
        text="Yin Yoga"
        on={() => {
          setPracticeType(yogaTypes.YIN_YOGA);
          setCurrentPage(1);
          window.scrollTo({ top: 400, behavior: "smooth" });
        }}
      />
      <PrimaryButton1
        text="Mindfulness Yoga"
        on={() => {
          setPracticeType(yogaTypes.MINDFULNESS_YOGA);
          setCurrentPage(1);
          window.scrollTo({ top: 400, behavior: "smooth" });
        }}
      />      
      {isLoading && <Loader />}

      {!isLoading && error && (
        <Alert
          severity="error"
          sx={{ mt: "60px", maxWidth: "600px" }}
          action={
            <Button color="inherit" size="small" onClick={() => setReloadKey((key) => key + 1)}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {!isLoading && !error && !practiceVideos.length && (
        <Typography mt="60px">No practice videos found for this style yet.</Typography>
      )}

      {!isLoading && !error && (
        <YogiPracticesVideos practiceVideos={currentPracticeVideos} />
      )}

      {!isLoading && !error && pageCount > 1 && (
        <Stack mt="100px" alignItems="center">
          <Pagination
            color="standard"
            count={pageCount}
            page={currentPage}
            onChange={paginate}
            // shape='rounded'
            // size='large'
          />
        </Stack>
      )}
    </Box>
  );
}

export default YogiPractices;
