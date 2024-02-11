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
    onClose();
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
                  checked={columns[key].visible}
                  onChange={(_, value) => {
                    setColumns({
                      ...columns,
                      [key]: { ...columns[key], visible: value },
                    });
                  }}
                />
              }
              label={key}
              key={key}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions className={styles.modal_footer}>
        <Button variant="outlined" color="error" onClick={onClose}>
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
