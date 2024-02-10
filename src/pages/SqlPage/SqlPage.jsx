import { useEffect, useMemo, useRef, useState } from "react";
import Query from "../../components/Query";
import Table from "../../components/Table";
import styles from "./SqlPage.module.scss";
import { COLLECTIONS, HISTORY, getResults } from "../../data/dataSource";
import { Button, ButtonGroup } from "@mui/material";
import ColumnFilter from "../../components/ColumnFilter";
import PastQueries from "../../components/PastQueries";
import { ErrorOutlineOutlined, FilterList } from "@mui/icons-material";
import Filters from "../../components/Filters";

const SqlPage = () => {
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState({});
  const [showColumnFilter, setShowColumnFilter] = useState(false);
  const [showPastQueries, setShowPastQueries] = useState(false);
  const [collections, setCollections] = useState(COLLECTIONS);
  const [history, setHistory] = useState(HISTORY);
  const [showFilters, setShowFilters] = useState(false);
  const filters = useRef([]);
  const dataRef = useRef([]);

  useEffect(() => {}, []);

  const columns = useMemo(
    () =>
      Object.entries(headers)
        .filter(([_, value]) => value)
        .map(([key, _]) => ({ label: key, dataKey: key })),
    [headers]
  );

  const processData = (data) => {
    const columns = data.reduce((prevVal, row) => {
      const rowHeaders = Object.keys(row).reduce(
        (temp, header) => ({ ...temp, [header]: true }),
        []
      );
      return { ...prevVal, ...rowHeaders };
    }, {});

    setHeaders(columns);
    setRows(data);
  };

  const runQuery = (query) => {
    const tableNameMatch = query.match(/\bfrom\s+(\w+)\b/i);
    const tableName = (tableNameMatch && tableNameMatch[1]) || "default";
    const results = getResults(tableName);
    dataRef.current = results;
    processData(results);
  };

  const addQuerytoHistory = (query) => {
    const queryData = {
      date: Date.now(),
      query,
    };
    setHistory([queryData, ...history]);
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

  return (
    <div className={styles.body}>
      <Query runQuery={runQuery} addQuerytoHistory={addQuerytoHistory} />
      <div className={styles.table_container}>
        <div className={styles.table_toolbar}>
          <Button variant="outlined" onClick={() => setShowFilters(true)}>
            <FilterList />
          </Button>
          <Button variant="outlined" onClick={() => setShowColumnFilter(true)}>
            Columns
          </Button>
          <ButtonGroup>
            <Button>CSV</Button>
            <Button>JSON</Button>
          </ButtonGroup>
        </div>
        {rows.length > 0 && <Table rows={rows} columns={columns} />}
        {rows.length === 0 && (
          <div className={styles.no_data_found}>
            <ErrorOutlineOutlined fontSize="large" />
            {filters.current.length > 0 && <div>No Data Found</div>}
            {filters.current.length === 0 && (
              <div>Please run the query to see the results</div>
            )}
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
