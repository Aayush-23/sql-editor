import {
  Drawer,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import styles from "./PastQueries.module.scss";
import { useMemo, useState } from "react";
import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSearchParams } from "react-router-dom";

const PastQueries = ({
  history = [],
  collections = [],
  setShowPastQueries,
}) => {
  const [queryParams, setQueryParams] = useSearchParams();
  const [currentTab, setCurrentTab] = useState("collections");
  const [searchQuery, setSearchQuery] = useState("");

  const handleClose = () => {
    setShowPastQueries(false);
  };

  const handleSetQuery = (query) => () => {
    setQueryParams(`query=${btoa(query)}`);
    handleClose();
  };

  const getQueries = () => {
    if (currentTab === "history") {
      return history.filter(
        (queryData) =>
          queryData.query.toLowerCase().search(searchQuery.toLowerCase()) > -1
      );
    }

    return collections.filter(
      (queryData) =>
        queryData.query.toLowerCase().search(searchQuery.toLowerCase()) > -1 ||
        queryData.title.toLowerCase().search(searchQuery.toLowerCase()) > -1
    );
  };

  const queries = getQueries();
  return (
    <Drawer open anchor="right" onClose={handleClose}>
      <div className={styles.drawer}>
        <div className={styles.drawer_header}>
          <div className={styles.header}>
            <h3 className={styles.drawer_title}>Past Queries</h3>
            <CloseOutlined
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={styles.search_input}>
            <TextField
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              placeholder="Search Query"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <ToggleButtonGroup
            color="primary"
            value={currentTab}
            exclusive
            onChange={(_, value) => {
              setCurrentTab(value);
            }}
            size="small"
            className={styles.tabs}
          >
            <ToggleButton value="history">History</ToggleButton>
            <ToggleButton value="collections">Collections</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className={styles.queries}>
          {queries.map((queryData) => (
            <div
              key={queryData.id}
              className={styles.query}
              onClick={handleSetQuery(queryData.query)}
            >
              {currentTab === "collections" && queryData.title && (
                <div className={styles.query_title}>{queryData.title}</div>
              )}
              <div className={styles.sql_query}>{queryData.query}</div>
              <div className={styles.query_time}>
                {new Date(queryData.date).toLocaleString()}
              </div>
            </div>
          ))}
          {queries.length === 0 && (
            <div className={styles.error}>
              <ErrorOutlineIcon fontSize="large" />
              <div>No Queries Found</div>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default PastQueries;
