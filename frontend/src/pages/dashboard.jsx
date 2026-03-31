import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const token = localStorage.getItem("token");

  // Protect route
  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    } else {
      fetchCustomers();
    }
  }, []);

  // Fetch customers
  const fetchCustomers = async () => {
    const res = await API.get("/customers", {
      headers: { Authorization: token },
    });
    setCustomers(res.data);
  };

  // Add customer
  const addCustomer = async () => {
    await API.post(
      "/customers",
      { name, email, phone },
      { headers: { Authorization: token } }
    );
    fetchCustomers();
  };

  // Delete customer
  const deleteCustomer = async (id) => {
    await API.delete(`/customers/${id}`, {
      headers: { Authorization: token },
    });
    fetchCustomers();
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>
        Logout
      </button>

      <h3>Add Customer</h3>

      <input placeholder="Name" onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="Phone" onChange={(e)=>setPhone(e.target.value)} />

      <button onClick={addCustomer}>Add</button>

      <h3>Customer List</h3>

      {customers.map((c) => (
        <div key={c._id}>
          <p>{c.name} - {c.email} - {c.phone}</p>
          <button onClick={() => deleteCustomer(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}