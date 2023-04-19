import React, { useState } from "react";
import { TbEdit, TbTrashFilled } from "react-icons/tb";
import { api, RouterOutputs } from "~/utils/api";

import useTable from "../../hooks/useTable";
import styles from "../../styles/Table.module.css";
import { DeleteCustomerModal } from "../CustomerForms/DeleteForm";
import Modal from "../Modal";
import TableFooter from "./TableFooter";

type Customer = RouterOutputs["customer"]["getAll"][0];

const Table = ({
  data,
  rowsPerPage,
  updateCustomers,
}: {
  data: Customer[] | undefined;
  rowsPerPage: number;
  updateCustomers: () => void;
}) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  console.log("🚀 ~ file: index.tsx:24 ~ openDeleteModal:", openDeleteModal);
  const handleDeleteToggle = () => setOpenDeleteModal((prev) => !prev);

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  console.log("🚀 ~ file: index.tsx:28 ~ openEditModal:", openEditModal);
  const handleEditToggle = () => setOpenEditModal((prev) => !prev);

  const updateCustomer = api.customer.update.useMutation({
    onSuccess: () => {
      void updateCustomers();
    },
  });

  const deleteCustomer = api.customer.delete.useMutation({
    onSuccess: () => {
      void updateCustomers();
    },
  });

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
              <td>
                <span className="flex">
                  <span onClick={handleDeleteToggle}>
                    <TbTrashFilled />
                  </span>
                  <span onClick={handleEditToggle}>
                    <TbEdit />
                  </span>
                </span>
              </td>
              <Modal open={openDeleteModal}>
                <DeleteCustomerModal
                  onDelete={({ id }) => {
                    void deleteCustomer.mutate({ id });
                  }}
                  onClose={handleDeleteToggle}
                  id={el.id}
                />
              </Modal>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
