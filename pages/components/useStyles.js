import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(.1),
        },
    position: 'relative',
    bottom: '-2vw',
    left: '0vw',
    width: '5vw',
    },
    input: {
        display: 'none',
    },
  }));

export {useStyles};