import "./Poses.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import {
  poses,
  poseLevels,
  flows,
  flowDuration,
  formatTime,
} from "../../common/poses";
import PrimaryButton1 from "../../components/PrimaryButton1/PrimaryButton1";

const levelFilters = ["all", ...Object.values(poseLevels)];

function Poses() {
  const navigate = useNavigate();
  const [level, setLevel] = useState("all");
  const [search, setSearch] = useState("");

  const term = search.trim().toLowerCase();
  const visiblePoses = poses.filter(
    (pose) =>
      (level === "all" || pose.level === level) &&
      (term === "" ||
        pose.name.toLowerCase().includes(term) ||
        pose.sanskrit.toLowerCase().includes(term) ||
        pose.category.toLowerCase().includes(term))
  );

  return (
    <Box className="Poses">
      <Typography variant="h4" mb="20px">
        Guided Flows
      </Typography>
      <Typography mb="30px" color="#6b6b6b">
        Pick a sequence and the timer will walk you through each pose.
      </Typography>
      <div className="flow-grid">
        {flows.map((flow) => (
          <div className="flow-card" key={flow.id}>
            <Typography variant="h6">{flow.name}</Typography>
            <Stack direction="row" gap="8px" my="8px">
              <Chip label={flow.level} size="small" className="level-chip" />
              <Chip
                label={`${formatTime(flowDuration(flow))} min`}
                size="small"
              />
              <Chip label={`${flow.steps.length} poses`} size="small" />
            </Stack>
            <Typography variant="body2" mb="16px" color="#6b6b6b">
              {flow.description}
            </Typography>
            <PrimaryButton1
              text="Start flow"
              on={() => navigate(`/flows/${flow.id}`)}
            />
          </div>
        ))}
      </div>

      <Typography variant="h4" mt="80px" mb="20px">
        Pose Library
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap="16px"
        mb="30px"
        alignItems={{ sm: "center" }}
      >
        <TextField
          size="small"
          label="Search poses"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Stack direction="row" gap="8px" flexWrap="wrap">
          {levelFilters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              clickable
              onClick={() => setLevel(filter)}
              className={level === filter ? "filter-chip active" : "filter-chip"}
            />
          ))}
        </Stack>
      </Stack>

      <div className="pose-grid">
        {visiblePoses.map((pose) => (
          <div className="pose-card" key={pose.id}>
            <Typography variant="h6">{pose.name}</Typography>
            <Typography className="sanskrit">{pose.sanskrit}</Typography>
            <Stack direction="row" gap="8px" my="10px">
              <Chip label={pose.level} size="small" className="level-chip" />
              <Chip label={pose.category} size="small" />
            </Stack>
            <ul className="benefits">
              {pose.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
        {visiblePoses.length === 0 && (
          <Typography color="#6b6b6b">No poses match your search.</Typography>
        )}
      </div>
    </Box>
  );
}

export default Poses;
