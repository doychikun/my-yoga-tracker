import "./YogiPractices.css";
import { useState, useEffect } from "react";
import { fetchYoutubeData } from "../../services/fetchYoutubeData";
import { Box, Stack, Typography } from "@mui/material";
import { yogaTypes } from "../../common/yoga.types";
import PrimaryButton1 from "../../components/PrimaryButton1/PrimaryButton1"
import YogiPracticesVideos from "../../components/YogiPracticesVideos/YogiPracticesVideos"
import Pagination from "@mui/material/Pagination";

function YogiPractices() {
  const [practiceType, setPracticeType] = useState(yogaTypes.DEFAULT_VINYASA_FLOW_YOGA);
  const [practiceVideos, setPracticeVideos] = useState([]);

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

  useEffect(() => {
    const fetchPracticesData = async () => {
      const practiceVideosData = await fetchYoutubeData(practiceType);
      setPracticeVideos(practiceVideosData.contents);
    };

    fetchPracticesData();
  }, [practiceType]);

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
      <YogiPracticesVideos practiceVideos={currentPracticeVideos} />
      
      <Stack mt="100px" alignItems="center">
        <Pagination
          color="standard"
          count={3}
          page={currentPage}
          onChange={paginate}
          // shape='rounded'
          // size='large'
        />
      </Stack>
    </Box>
  );
}

export default YogiPractices;
