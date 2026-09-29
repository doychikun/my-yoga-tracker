import "./Poses.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Chip, LinearProgress, Typography } from "@mui/material";
import { getFlow, getPose, flowDuration, formatTime } from "../../common/poses";
import PrimaryButton1 from "../../components/PrimaryButton1/PrimaryButton1";

// `onComplete(summary)` fires once when the last pose finishes, so a practice
// log can record the session. summary: { flowId, flowName, level,
// durationSeconds, poseCount, completedAt }.
function FlowPlayer({ onComplete = () => {} }) {
  const { flowId } = useParams();
  const navigate = useNavigate();
  const flow = getFlow(flowId);

  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(flow ? flow.steps[0].seconds : 0);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setRemaining((r) => r - 1);
      setElapsed((e) => e + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  const goTo = (nextIndex) => {
    if (nextIndex >= flow.steps.length) {
      setRunning(false);
      setFinished(true);
      return;
    }
    setIndex(nextIndex);
    setRemaining(flow.steps[nextIndex].seconds);
  };

  useEffect(() => {
    if (running && remaining <= 0) goTo(index + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, running]);

  useEffect(() => {
    if (!finished || completedRef.current) return;
    completedRef.current = true;
    onComplete({
      flowId: flow.id,
      flowName: flow.name,
      level: flow.level,
      durationSeconds: elapsed,
      poseCount: flow.steps.length,
      completedAt: Date.now(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  if (!flow) {
    return (
      <Box className="FlowPlayer">
        <Typography variant="h5" mb="20px">
          We couldn't find that flow.
        </Typography>
        <PrimaryButton1 text="Back to poses" on={() => navigate("/poses")} />
      </Box>
    );
  }

  const restart = () => {
    completedRef.current = false;
    setFinished(false);
    setElapsed(0);
    setIndex(0);
    setRemaining(flow.steps[0].seconds);
    setStarted(true);
    setRunning(true);
  };

  if (finished) {
    return (
      <Box className="FlowPlayer">
        <div className="flow-stage">
          <Typography variant="h4" mb="12px">
            Namaste 🙏
          </Typography>
          <Typography mb="8px">You completed {flow.name}.</Typography>
          <Typography color="#6b6b6b">
            {flow.steps.length} poses in {formatTime(elapsed)} min
          </Typography>
          <div className="flow-controls">
            <PrimaryButton1 text="Practice again" on={restart} />
            <PrimaryButton1 text="Back to poses" on={() => navigate("/poses")} />
          </div>
        </div>
      </Box>
    );
  }

  const step = flow.steps[index];
  const pose = getPose(step.poseId);
  const nextStep = flow.steps[index + 1];
  const nextPose = nextStep && getPose(nextStep.poseId);
  const total = flowDuration(flow);
  const doneBefore = flow.steps
    .slice(0, index)
    .reduce((sum, s) => sum + s.seconds, 0);
  const progress = ((doneBefore + step.seconds - remaining) / total) * 100;

  return (
    <Box className="FlowPlayer">
      <Typography variant="h4" mb="8px">
        {flow.name}
      </Typography>
      <Typography color="#6b6b6b" mb="24px">
        Pose {index + 1} of {flow.steps.length}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          mb: "30px",
          backgroundColor: "#fdeccb",
          "& .MuiLinearProgress-bar": { backgroundColor: "#f8c55c" },
        }}
      />
      <div className="flow-stage">
        <Typography variant="h5">{pose.name}</Typography>
        <Typography className="sanskrit">{pose.sanskrit}</Typography>
        {step.side && (
          <Chip
            label={`${step.side} side`}
            size="small"
            className="level-chip"
            sx={{ mt: "10px" }}
          />
        )}
        <div className="flow-timer" data-testid="flow-timer">
          {formatTime(Math.max(remaining, 0))}
        </div>
        <Typography>{pose.cue}</Typography>
        <div className="flow-controls">
          <Button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            sx={{ color: "#3a1212" }}
          >
            Back
          </Button>
          {!started ? (
            <PrimaryButton1
              text="Start"
              on={() => {
                setStarted(true);
                setRunning(true);
              }}
            />
          ) : (
            <PrimaryButton1
              text={running ? "Pause" : "Resume"}
              on={() => setRunning(!running)}
            />
          )}
          <Button onClick={() => goTo(index + 1)} sx={{ color: "#3a1212" }}>
            Skip
          </Button>
        </div>
      </div>
      <Typography mt="24px" color="#6b6b6b">
        {nextPose
          ? `Next: ${nextPose.name}${nextStep.side ? ` (${nextStep.side})` : ""}`
          : "Last pose"}
      </Typography>
    </Box>
  );
}

export default FlowPlayer;
