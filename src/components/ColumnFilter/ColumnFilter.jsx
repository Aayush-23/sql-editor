import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import styles from "./ColumnFilter.module.scss";
import { useState } from "react";

const ColumnFilter = ({ headers, setShowColumnFilter, setHeaders }) => {
  const [columns, setColumns] = useState(headers);

  const onClose = () => {
    setShowColumnFilter(false);
  };

  const onSubmit = () => {
    setHeaders(columns);
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle className={styles.modal_header}>Filter Columns</DialogTitle>
      <DialogContent>
        <div className={styles.columns_modal}>
          {Object.keys(columns).map((key) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={columns[key]}
                  onChange={(_, value) => {
                    setColumns({ ...columns, [key]: value });
                  }}
                />
              }
              label={key}
              key={key}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions className={styles.modal_footer} onClick={onClose}>
        <Button variant="outlined" color="error">
          Cancel
        </Button>
        <Button variant="outlined" color="primary" onClick={onSubmit}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColumnFilter;
