import { useEffect, useState } from "react";
import { NewCustomerModal } from "~/components/CustomerForms/NewForm";
import Modal from "~/components/Modal";
import { api } from "~/utils/api";

import { TbTrashFilled } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { DeleteCustomerModal } from "~/components/CustomerForms/DeleteForm";
import { EditCustomerModal } from "~/components/CustomerForms/EditForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Table from "~/components/Table";
import { makeData } from "~/utils/fakeData";

const AllCustomersPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    sessionData?.user ? void router.push("/customers") : void router.push("/");
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const handleToggle = () => setOpen((prev) => !prev);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const handleDeleteToggle = () => setOpenDeleteModal((prev) => !prev);

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const handleEditToggle = () => setOpenEditModal((prev) => !prev);

  const { data: customers, refetch: refetchCustomers } =
    api.customer.getAll.useQuery(undefined);

  const [data] = useState(makeData(25));
  console.log("🚀 ~ file: index.tsx:36 ~ AllCustomersPage ~ data:", data);

  const createCustomer = api.customer.create.useMutation({
    onSuccess: () => {
      void refetchCustomers();
    },
  });

  const updateCustomer = api.customer.update.useMutation({
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
    <div className=" my-1 mx-4 lg:my-5 lg:mx-20">
      <div className="mb-4 flex justify-between lg:mb-8">
        <h1 className="text-3xl">Customers</h1>
        <div>
          <div className="btn mr-2 hidden lg:inline-flex">Import</div>
          <div className="btn-primary btn " onClick={handleToggle}>
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
        <Table data={data} rowsPerPage={10} />
      </div>
    </div>
  );
};

export default AllCustomersPage;
