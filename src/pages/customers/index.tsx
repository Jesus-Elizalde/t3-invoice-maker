const AllCustomersPage = () => {
  return (
    <div className="my-5 mx-20">
      <div className="mb-14 flex justify-between">
        <h1 className="text-3xl">Customers</h1>
        <div>
          <div className="btn">Import</div>
          <div className="btn">Add Customer</div>
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
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>Cy Ganderton</td>
              <td>success</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCustomersPage;
