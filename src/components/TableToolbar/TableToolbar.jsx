import { FilterList } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";
import styles from "./TableToolbar.module.scss";

const TableToolbar = ({
  setShowFilters,
  setShowColumnFilter,
  downloadData,
  size,
}) => {
  return (
    <div className={styles.table_toolbar}>
      <h3 className={styles.table_size}>Total Results - {size}</h3>
      <div className={styles.table_actions}>
        <Button variant="outlined" onClick={() => setShowFilters(true)}>
          <FilterList />
        </Button>
        <Button variant="outlined" onClick={() => setShowColumnFilter(true)}>
          Columns
        </Button>
        <ButtonGroup>
          <Button onClick={() => downloadData("csv")}>CSV</Button>
          <Button onClick={() => downloadData("json")}>JSON</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TableToolbar;
