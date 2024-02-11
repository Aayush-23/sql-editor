import { TableVirtuoso } from "react-virtuoso";
import {
  Table as MuiTable,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import styles from "./Table.module.scss";

const Table = ({ columns = [], rows }) => {
  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            sx={{
              backgroundColor: "background.paper",
              fontWeight: "bold",
              width: `${column.width}ch`,
            }}
          >
            <div className={styles.header}>{column.label}</div>
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
            sx={{ overflowWrap: "break-word", width: `${column.width}ch` }}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  const TableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <MuiTable
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item, ...props }) => (
      <TableRow {...props} className={styles.row} />
    ),
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  return (
    <TableVirtuoso
      data={rows}
      overscan={2000}
      components={TableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={rowContent}
      className={styles.table}
      style={{ height: "calc(100% - 3.5rem)" }}
    />
  );
};

function areEqual(prevProps, nextProps) {
  console.log(
    prevProps.columns === nextProps.columns && prevProps.rows === nextProps.rows
  );
  // Check if columns and rows are equal
  return (
    prevProps.columns === nextProps.columns && prevProps.rows === nextProps.rows
  );
}

export default React.memo(Table, areEqual);
