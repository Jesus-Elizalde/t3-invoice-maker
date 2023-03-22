import React, { useEffect } from "react";
import { RouterOutputs } from "~/utils/api";

import styles from "../../../styles/TableFooter.module.css";

type Customer = RouterOutputs["customer"]["getAll"][0];

const TableFooter = ({
  range,
  setPage,
  page,
  slice,
}: {
  range: number[];
  setPage: (num: number) => void;
  page: number;
  slice: Customer[];
}) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="flex justify-center rounded-b-2xl bg-base-200 py-2">
      {range.map((el, index) => (
        <button
          key={index}
          className={` btn mx-2 py-1 px-3 ${page === el ? "btn-active" : ""}`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;
