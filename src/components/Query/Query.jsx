import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import styles from "./Query.module.scss";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const Query = ({ runQuery, addQuerytoHistory }) => {
  const [query, setQuery] = useState("");
  const [queryParams, setQueryParams] = useSearchParams();

  const urlQuery = queryParams.get("query");

  useEffect(() => {
    if (urlQuery && urlQuery.trim().length > 0) {
      const decodedQuery = atob(urlQuery);
      setQuery(decodedQuery);
    }
  }, [urlQuery]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleRunQuery = () => {
    runQuery(query);
    setQueryParams(`query=${btoa(query)}`);
    addQuerytoHistory(query);
  };

  const disabled = query.trim().length === 0;

  return (
    <div className={styles.query_container}>
      <TextareaAutosize
        className={styles.query_textarea}
        value={query}
        maxRows={5}
        autoFocus
        onChange={handleQueryChange}
        placeholder="Enter Query"
      />
      <div className={styles.query_actions}>
        <Button variant="outlined" size="small" disabled={disabled}>
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
    </div>
  );
};

export default Query;
