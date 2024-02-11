import { FilterList } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import styles from "./TableToolbar.module.scss";

const TableToolbar = ({
  setShowFilters,
  setShowColumnFilter,
  downloadData,
  size,
  enableFullScreen,
  setEnableFullScreen,
}) => {
  return (
    <div className={styles.table_toolbar}>
      <h3 className={styles.table_size}>Total Results - {size}</h3>
      <div className={styles.table_actions}>
        {enableFullScreen ? (
          <Button variant="outlined" onClick={() => setEnableFullScreen(false)}>
            <CloseFullscreenIcon />
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => setEnableFullScreen(true)}>
            <OpenInFullIcon />
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={() => setShowFilters(true)}
          title="Search data based on columns"
        >
          <FilterList />
        </Button>
        <Button
          variant="outlined"
          onClick={() => setShowColumnFilter(true)}
          title="Filter the columns which a user wants to see"
        >
          Columns
        </Button>
        <ButtonGroup>
          <Button
            onClick={() => downloadData("csv")}
            title="Download data in CSV format"
          >
            CSV
          </Button>
          <Button
            onClick={() => downloadData("json")}
            title="Download data in JSON format"
          >
            JSON
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TableToolbar;
