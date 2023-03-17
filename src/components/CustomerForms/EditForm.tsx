import React, { useState } from "react";

type Props = {
  onSave: (customer: {
    customerId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  }) => void;
  onClose(): void;
  id: number;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
};
export const EditCustomerModal = ({ onSave, onClose, id, customer }: Props) => {
  const [firstName, setFirstName] = useState<string>(customer.firstName);
  const [lastName, setLastName] = useState<string>(customer.lastName);
  const [email, setEmail] = useState<string>(customer.email);
  const [phone, setPhone] = useState<string | null>(customer.phone);
  const [address, setAddress] = useState<string>(customer.address);
  const [city, setCity] = useState<string>(customer.city);
  const [state, setState] = useState<string>(customer.state);
  const [postalCode, setPostalCode] = useState<string>(customer.postalCode);

  const handleSave = () => {
    onSave({
      customerId: id,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      postalCode,
    });
    onClose();
  };
  return (
    <>
      <h3 className="text-lg font-bold">New Customer</h3>
      <div className="flex gap-4">
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">First Name:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input-bordered input w-full max-w-xs"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Last Name:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input-bordered input w-full max-w-xs"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input-bordered input w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Phone Number:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input-bordered input w-full max-w-xs"
              value={phone ? phone : ""}
              onChange={(e) => setPhone(e.currentTarget.value)}
            />
          </div>
        </div>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Address:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input-bordered input w-full max-w-xs"
              value={address}
              onChange={(e) => setAddress(e.currentTarget.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">City:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input-bordered input w-full max-w-xs"
              value={city}
              onChange={(e) => setCity(e.currentTarget.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">State:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input-bordered input w-full max-w-xs"
              value={state}
              onChange={(e) => setState(e.currentTarget.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Postal Code:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input-bordered input w-full max-w-xs"
              value={postalCode}
              onChange={(e) => setPostalCode(e.currentTarget.value)}
            />
          </div>
        </div>
      </div>
      <div className="modal-action">
        <label className="btn-error btn" onClick={onClose}>
          Close
        </label>
        <label className="btn-primary btn" onClick={handleSave}>
          Create Customer
        </label>
      </div>
    </>
  );
};
