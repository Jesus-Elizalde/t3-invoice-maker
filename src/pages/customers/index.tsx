import { useState } from "react";
import { NewCustomerModal } from "~/components/CustomerForms/NewForm";
import Modal from "~/components/Modal";
import { api } from "~/utils/api";

import { TbTrashFilled } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { DeleteCustomerModal } from "~/components/CustomerForms/DeleteForm";

const AllCustomersPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleToggle = () => setOpen((prev) => !prev);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const handleDeleleToggle = () => setOpenDeleteModal((prev) => !prev);

  const { data: customers, refetch: refetchCustomers } =
    api.customer.getAll.useQuery(undefined);

  const createCustomer = api.customer.create.useMutation({
    onSuccess: () => {
      void refetchCustomers();
    },
  });

  const deleteCustomer = api.customer.delete.useMutation({
    onSuccess: () => {
      void refetchCustomers();
    },
  });

  return (
    <div className="my-5 mx-20">
      <div className="mb-14 flex justify-between">
        <h1 className="text-3xl">Customers</h1>
        <div>
          <div className="btn">Import</div>
          <div className="btn-primary btn" onClick={handleToggle}>
            + Add Cusomter
          </div>
          <Modal
            open={open}
            // onClose={handleToggle}
          >
            <NewCustomerModal
              onSave={({
                firstName,
                lastName,
                email,
                phone,
                address,
                city,
                state,
                postalCode,
              }) => {
                void createCustomer.mutate({
                  firstName,
                  lastName,
                  email,
                  phone,
                  address,
                  city,
                  state,
                  postalCode,
                });
              }}
              onClose={handleToggle}
            />
          </Modal>
          {/* <NewCustomerModal /> */}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Status</th>
              <th>Address</th>
              <th>Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {customers?.map((customer) => (
              <tr key={customer.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  {customer.firstName} {customer.lastName}
                </td>
                <td>
                  {customer.status === "ACTIVE" ? (
                    <span className="badge-success badge">active</span>
                  ) : (
                    <span className="badge-error badge">inactive</span>
                  )}
                </td>
                <td>
                  {customer.address} {customer.city} {customer.state}{" "}
                  {customer.postalCode}
                </td>
                <td>{customer.phone}</td>
                <td>
                  <div className="flex">
                    <span
                      // onClick={() =>
                      //   void deleteCustomer.mutate({ id: `${customer.id}` })
                      // }
                      onClick={handleDeleleToggle}
                    >
                      <TbTrashFilled />
                    </span>
                    <span>
                      <TbEdit />
                    </span>
                  </div>
                </td>
                <Modal open={openDeleteModal}>
                  <DeleteCustomerModal
                    onClose={handleDeleleToggle}
                    onDelete={() =>
                      void deleteCustomer.mutate({ id: `${customer.id}` })
                    }
                  />
                </Modal>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCustomersPage;
