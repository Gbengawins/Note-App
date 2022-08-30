import { makeStyles } from "@mui/material/styles";

export const useListStyles = makeStyles(theme => ({
  noteBooksContainer: {
    backgroundColor: "#f6f6f6",
    minHeight: "100%"
  },
  noteBookList: {
    cursor: "pointer"
  },
  active: {
    backgroundColor: "#ccc"
  }
}));