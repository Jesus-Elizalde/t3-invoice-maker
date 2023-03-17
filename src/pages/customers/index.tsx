import { useState } from "react";
import { NewCustomerModal } from "~/components/CustomerForms/NewForm";
import Modal from "~/components/Modal";
import { api } from "~/utils/api";

const AllCustomersPage = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);

  const { data: customers, refetch: refetchCustomers } =
    api.customer.getAll.useQuery(undefined);
  console.log(customers);

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
          <Modal open={open} onClose={handleToggle} disableClickOutside>
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
                <td>{customer.status}</td>
                <td>
                  {customer.address} {customer.city} {customer.state}{" "}
                  {customer.postalCode}
                </td>
                <td>{customer.phone}</td>
                <td>
                  <div
                    onClick={() =>
                      void deleteCustomer.mutate({ id: `${customer.id}` })
                    }
                  >
                    X
                  </div>{" "}
                  Edit
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCustomersPage;
