import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useStateValue } from "../statemanagement";
import LocalStorage from "../Utils/localStorage";
import ReactMarkdown from "react-markdown/with-html";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function ShowModal() {
  const [{ showModal, show }, dispatch] = useStateValue();
  const [state, setState] = React.useState({
    category: "",
    message: "",
    title: ""
  });

  const handleClose = () => {
    dispatch({ type: "showMessage", showModal: false });
  };

  React.useEffect(() => {
    const rowExists = LocalStorage.findId(show);
    if (rowExists.length > 0) {
      setState(rowExists[0]);
    }
  }, [show]);

  React.useEffect(() => {
    return () => {
      setState({ category: "", message: "", title: "" });
    };
  }, [show]);

  return (
    <React.Fragment>
      {state !== undefined && (
        <Dialog
          fullWidth
          open={showModal}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{state.title}</DialogTitle>
          <DialogContent>
            <Typography color={"primary"} variant="caption">
              category : {state.category}
            </Typography>
            <Divider />
            <ReactMarkdown source={state.message} escapeHtml={false} />
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
}