import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "../../styles/Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }: { data: []; rowsPerPage: number }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>First Name</th>
            <th className={styles.tableHeader}>Last Name</th>
            <th className={styles.tableHeader}>Email</th>
            <th className={styles.tableHeader}>Phone</th>
            <th className={styles.tableHeader}>Status</th>
            <th className={styles.tableHeader}></th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.id}>
              <td className={styles.tableCell}>{el.firstName}</td>
              <td className={styles.tableCell}>{el.lastName}</td>
              <td className={styles.tableCell}>{el.email}</td>
              <td className={styles.tableCell}>{el.phone}</td>
              <td className={styles.tableCell}>{el.status}</td>
              <td className={styles.tableCell}>X Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
