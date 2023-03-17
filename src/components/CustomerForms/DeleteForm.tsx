import React from "react";

type Props = {
  onDelete: () => void;
  onClose(): void;
};

export const DeleteCustomerModal = ({ onDelete, onClose }: Props) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };
  return (
    <>
      <h3 className="text-lg font-bold">Delete Customer</h3>
      <p>Are you sure you want to delete this customer?</p>
      <div className="modal-action">
        <label className="btn-error btn" onClick={onClose}>
          Close
        </label>
        <label className="btn-primary btn" onClick={handleDelete}>
          Delete Customer
        </label>
      </div>
    </>
  );
};
