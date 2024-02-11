import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./Filters.module.scss";
import { useState } from "react";

const Filters = ({
  headers,
  setShowFilters,
  initialFilters = [],
  applyFilters,
}) => {
  const [filters, setFilters] = useState(initialFilters);

  const onClose = () => {
    setShowFilters(false);
  };

  const onSubmit = () => {
    applyFilters(filters);
  };

  const handleAddFilter = () => {
    setFilters([...filters, { id: crypto.randomUUID() }]);
  };

  const handleRemoveFilter = (id) => () => {
    setFilters(filters.filter((data) => data.id !== id));
  };

  const handleFilterChange = (id, key, value) => {
    const updatedFilters = filters.map((filter) => {
      if (filter.id === id) {
        return { ...filter, [key]: value };
      }
      return filter;
    });
    setFilters(updatedFilters);
  };

  const columns = Object.keys(headers || {});

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle className={styles.modal_header}>Filter Data</DialogTitle>
      <DialogContent>
        <div className={styles.columns_modal}>
          <Button
            className={styles.add_filter__button}
            variant="outlined"
            onClick={handleAddFilter}
          >
            Add Filter
          </Button>
          {filters.map((filter) => (
            <div key={filter.id} className={styles.filter_container}>
              <Autocomplete
                options={columns}
                size="small"
                className={styles.column_select}
                value={filter.column || ""}
                onChange={(event, value) =>
                  handleFilterChange(filter.id, "column", value)
                }
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Select Column" />
                )}
              />
              <TextField
                label="Search Value"
                size="small"
                value={filter.value}
                className={styles.filter_input}
                onChange={(e) =>
                  handleFilterChange(filter.id, "value", e.target.value)
                }
              />
              <Button
                onClick={handleRemoveFilter(filter.id)}
                variant="outlined"
                color="error"
              >
                <RemoveIcon fontSize="medium" />
              </Button>
            </div>
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
export default Filters;
