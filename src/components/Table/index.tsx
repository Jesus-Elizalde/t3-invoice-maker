import React, { useState } from "react";
import { RouterOutputs } from "~/utils/api";

import useTable from "../../hooks/useTable";
import styles from "../../styles/Table.module.css";
import TableFooter from "./TableFooter";

type Customer = RouterOutputs["customer"]["getAll"][0];

const Table = ({
  data,
  rowsPerPage,
}: {
  data: Customer[] | undefined;
  rowsPerPage: number;
}) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className="table-compact table w-full">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Status</th>
            <th>Phone</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr key={el.id}>
              <td>{el.firstName}</td>
              <td>{el.lastName}</td>
              <td>
                {el.status === "ACTIVE" ? (
                  <span className="badge-success badge w-20">active</span>
                ) : (
                  <span className="badge-error badge w-20">inactive</span>
                )}
              </td>
              <td>{el.phone}</td>
              <td>{el.email}</td>
              <td>X Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
