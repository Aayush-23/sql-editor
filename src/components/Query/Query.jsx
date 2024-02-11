import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import styles from "./Query.module.scss";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SaveQuery from "../SaveQuery";

const Query = ({
  enableFullScreen,
  runQuery,
  addQuerytoHistory,
  addQuerytoCollections,
}) => {
  const DEFAULT_QUERY = "select * from products";
  const [showSaveQuery, setShowSaveQuery] = useState(false);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [queryParams, setQueryParams] = useSearchParams();
  const queryInputRef = useRef(null);

  const urlQuery = queryParams.get("query");

  useEffect(() => {
    if (urlQuery && urlQuery.trim().length > 0) {
      const decodedQuery = atob(urlQuery);
      setQuery(decodedQuery);
      queryInputRef.current.focus();
    }
  }, [urlQuery]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSaveQuery = (queryTitle) => {
    const newQuery = {
      query,
      title: queryTitle,
      id: crypto.randomUUID(),
      date: Date.now(),
    };
    addQuerytoCollections(newQuery);
  };

  const handleRunQuery = () => {
    runQuery(query);
    setQueryParams(`query=${btoa(query)}`);
    addQuerytoHistory(query);
  };

  const handleKeyPress = (event) => {
    if (query.trim().length === 0) {
      return;
    }
    if (event.key === "Enter" && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      handleRunQuery();
    } else if ((event.metaKey || event.ctrlKey) && event.key === "s") {
      event.preventDefault();
      setShowSaveQuery(true);
    }
  };

  const disabled = query.trim().length === 0;

  return (
    <div
      className={`${styles.query_container} ${
        enableFullScreen ? styles.hide_query : ""
      }`}
    >
      <TextareaAutosize
        className={styles.query_textarea}
        value={query}
        maxRows={5}
        autoFocus
        ref={queryInputRef}
        onChange={handleQueryChange}
        onKeyDown={handleKeyPress}
        placeholder="Enter Query"
      />
      <div className={styles.query_actions}>
        <Button
          variant="outlined"
          size="small"
          disabled={disabled}
          onClick={() => setShowSaveQuery(true)}
        >
          Save Query
        </Button>
        <Button
          variant="contained"
          size="small"
          disabled={disabled}
          onClick={handleRunQuery}
        >
          Run Query
        </Button>
      </div>
      {showSaveQuery && (
        <SaveQuery
          query={query}
          onClose={() => setShowSaveQuery(false)}
          onSave={handleSaveQuery}
        />
      )}
    </div>
  );
};

export default Query;
