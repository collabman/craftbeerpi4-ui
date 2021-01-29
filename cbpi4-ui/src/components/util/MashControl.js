import { Button } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import StopIcon from "@material-ui/icons/Stop";
import { default as React, useEffect, useState } from "react";
import { useCBPi } from "../data";
import { stepapi } from "../data/stepapi";
import SkipNextIcon from '@material-ui/icons/SkipNext';

const MashControl = () => {
  const { state } = useCBPi();
  const [stop, setStop] = useState(null);
  const [reset, setReset] = useState(null);
  const [start, setStart] = useState(null);
  const [next, setNext] = useState(null);

  useEffect(() => {
    if (state.mashProfile.filter((item) => item.status === "D").length === state.mashProfile.length) {
      setStop(false);
      setReset(true);
      setStart(false);
      setNext(false);
      return;
    }
    if (state.mashProfile.filter((item) => item.status === "I").length === state.mashProfile.length) {
      setStop(false);
      setReset(false);
      setStart(true);
      setNext(false);
      return;
    }
    if (state.mashProfile.find((item) => item.status === "A")) {
      setStop(true);
      setReset(false);
      setStart(false);
      setNext(true);
    } else {
      setStop(false);
      setReset(true);
      setStart(true);
      setNext(true);
    }
  }, [state.mashProfile]);

  return (
    <>
      {start ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            stepapi.start();
          }}
          startIcon={<PlayCircleOutlineIcon />}
        >
          Start
        </Button>
      ) : null}

      {next ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            stepapi.next();
          }}
          startIcon={<SkipNextIcon />}
        >
          Next
        </Button>
      ) : null}

      {stop ? (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<StopIcon />}
          onClick={() => {
            stepapi.stop();
          }}
        >
          Stop
        </Button>
      ) : null}

      {reset ? (
        <Button startIcon={<RotateLeftIcon />} variant="contained" color="secondary" onClick={() => stepapi.reset()}>
          Reset
        </Button>
      ) : null}
    </>
  );
};

export default MashControl;
