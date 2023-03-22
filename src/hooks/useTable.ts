import { useState, useEffect } from "react";
import { RouterOutputs } from "~/utils/api";

type Customer = RouterOutputs["customer"]["getAll"][0];

const calculateRange = (data: Customer[] | undefined, rowsPerPage: number) => {
  const range = [];
  if (data) {
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
  }
  return range;
};

const sliceData = (
  data: Customer[] | undefined,
  page: number,
  rowsPerPage: number
) => {
  return data?.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const useTable = (
  data: Customer[] | undefined,
  page: number,
  rowsPerPage: number
) => {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [slice, setSlice] = useState<Customer[]>([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    slice && setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  return { slice, range: tableRange };
};

export default useTable;
