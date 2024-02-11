import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import styles from "./SaveQuery.module.scss";
import { useState } from "react";
const SaveQuery = ({ query, onClose, onSave }) => {
  const [queryName, setQueryName] = useState("");
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle className={styles.modal_header}>Save Query</DialogTitle>
      <DialogContent>
        <div className={styles.save_form}>
          <div className={styles.query_label}>{query}</div>
          <TextField
            placeholder="Query Name"
            onChange={(e) => setQueryName(e.target.value)}
            size="small"
          />
        </div>
      </DialogContent>
      <DialogActions className={styles.modal_footer}>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            onSave(queryName);
            onClose();
          }}
          disabled={queryName.trim().length == 0}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveQuery;
