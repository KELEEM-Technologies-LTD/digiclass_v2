import React from "react";
import { Backdrop, Fade, makeStyles, Modal } from "@mui/material";
// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));
function ModalBox({ content, open, handleClose }) {
  // const classes = useStyles();
  //   const [open, setOpen] = React.useState(openModal);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      // className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      // BackdropComponent={Backdrop}
      // BackdropProps={{
      //   timeout: 500,
      // }}
    >
      <Fade in={open}>{content}</Fade>
    </Modal>
  );
}

export default ModalBox;
