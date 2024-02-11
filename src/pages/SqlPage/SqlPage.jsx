import { useMemo, useRef, useState } from "react";
import { stringify } from "csv-stringify/browser/esm/sync";
import Query from "../../components/Query";
import Table from "../../components/Table";
import styles from "./SqlPage.module.scss";
import { COLLECTIONS, HISTORY, getResults } from "../../data/dataSource";
import { Button, CircularProgress } from "@mui/material";
import ColumnFilter from "../../components/ColumnFilter";
import PastQueries from "../../components/PastQueries";
import { ErrorOutlineOutlined } from "@mui/icons-material";
import Filters from "../../components/Filters";
import TableToolbar from "../../components/TableToolbar";
import { downloadFile } from "../../utility/commons";

const SqlPage = () => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState({});
  const [showColumnFilter, setShowColumnFilter] = useState(false);
  const [showPastQueries, setShowPastQueries] = useState(false);
  const [collections, setCollections] = useState(COLLECTIONS);
  const [history, setHistory] = useState(HISTORY);
  const [showFilters, setShowFilters] = useState(false);
  const filters = useRef([]);
  const dataRef = useRef([]);

  const columns = useMemo(
    () =>
      Object.entries(headers)
        .filter(([_, value]) => value.visible)
        .map(([key, value]) => ({
          label: key,
          dataKey: key,
          width: value.maxWidth,
        })),
    [headers]
  );

  const runQuery = async (query) => {
    try {
      setLoading(true);
      const tableNameMatch = query.match(/\bfrom\s+(\w+)\b/i);
      const limitMatch = query.match(/\blimit\s+(\d+)\b/i);
      const tableName = (tableNameMatch && tableNameMatch[1]) || "default";
      const limit = (limitMatch && parseInt(limitMatch[1])) || 10000;
      const { rows, headers: updatedHeaders } = await getResults(
        tableName,
        limit
      );
      dataRef.current = rows;
      setRows(rows);
      setHeaders(updatedHeaders);
      filters.current = [];
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addQuerytoHistory = (query) => {
    const queryData = {
      date: Date.now(),
      query,
    };
    setHistory([queryData, ...history]);
  };
  const addQuerytoCollections = (queryData) => {
    setCollections([queryData, ...collections]);
  };
  const applyFilters = (filterValues) => {
    const updatedData = dataRef.current.filter((row) => {
      return filterValues.every((filter) => {
        const fieldValue = row[filter.column];

        const filterValueLowerCase = String(filter.value).toLowerCase();

        const fieldValueString = String(fieldValue);

        return fieldValueString.toLowerCase().includes(filterValueLowerCase);
      });
    });
    filters.current = filterValues;
    setRows(updatedData);
  };

  const downloadData = (format = "csv") => {
    try {
      if (format === "json") {
        const jsonData = rows.map((row) =>
          columns.reduce((prevValue, header) => ({
            ...prevValue,
            [header.dataKey]: row[header.dataKey],
          }))
        );
        downloadFile(Date.now(), JSON.stringify(jsonData), format);
      } else {
        const csvRows = rows.map((row) =>
          columns.map((header) => row[header.dataKey])
        );
        const csvHeaders = columns.map((header) => header.label);
        const csvRecords = stringify([csvHeaders, ...csvRows]);
        downloadFile(Date.now(), csvRecords, format);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h2>SQL Editor</h2>
        <Button variant="outlined" onClick={() => setShowPastQueries(true)}>
          Past Queries
        </Button>
      </div>
      <Query
        runQuery={runQuery}
        addQuerytoHistory={addQuerytoHistory}
        addQuerytoCollections={addQuerytoCollections}
      />
      <div className={styles.table_container}>
        {!loading && (
          <>
            {dataRef.current.length > 0 && (
              <TableToolbar
                setShowColumnFilter={setShowColumnFilter}
                setShowFilters={setShowFilters}
                downloadData={downloadData}
                size={rows.length}
              />
            )}
            {rows.length > 0 && <Table rows={rows} columns={columns} />}
            {rows.length === 0 && (
              <div
                className={`${styles.no_data_found} ${
                  filters.current.length === 0 ? styles.initial_no_data : ""
                }`}
              >
                <ErrorOutlineOutlined fontSize="large" />
                {filters.current.length > 0 && <div>No Data Found</div>}
                {filters.current.length === 0 && (
                  <div>Please run the query to see the results</div>
                )}
              </div>
            )}
          </>
        )}
        {loading && (
          <div className={styles.loader}>
            <CircularProgress />
          </div>
        )}
      </div>
      {showColumnFilter && (
        <ColumnFilter
          setShowColumnFilter={setShowColumnFilter}
          headers={headers}
          setHeaders={setHeaders}
        />
      )}
      {showPastQueries && (
        <PastQueries
          setShowPastQueries={setShowPastQueries}
          collections={collections}
          history={history}
        />
      )}
      {showFilters && (
        <Filters
          setShowFilters={setShowFilters}
          applyFilters={applyFilters}
          headers={headers}
          initialFilters={filters.current}
        />
      )}
    </div>
  );
};

export default SqlPage;
