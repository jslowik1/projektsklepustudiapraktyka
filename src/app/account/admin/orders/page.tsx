"use client"
import IconButton from "@/app/components/inputs/IconButton";
import { translateStatus } from "@/app/tools/Tools";
import { useState } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import "./admin-orders.scss";

const mockOrders = [
  { id: "A1001", user: "jan.kowalski@example.com", date: new Date(), total: "199.00", status: translateStatus("new") },
  { id: "A1002", user: "anna.nowak@example.com", date: new Date(), total: "59.99", status: translateStatus("paid") },
  { id: "A1003", user: "piotr.z@example.com", date: new Date(), total: "349.50", status: translateStatus("shipped") },
];

const AllAdminOrders: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="admin-orders">
      <header className="admin-orders_header">
        <h1>Wszystkie zamówienia</h1>
        <div className="controls">
          <input className="search" placeholder="Szukaj po ID lub e-mailu" value={query} onChange={e => setQuery(e.target.value)} />
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">Wszystkie</option>
            <option value="new">Nowe</option>
            <option value="paid">Opłacone</option>
            <option value="shipped">Wysłane</option>
            <option value="cancelled">Anulowane</option>
          </select>
          <div className="bulk-actions">
            <button className="btn" disabled>Oznacz jako wysłane</button>
            <button className="btn outline" disabled>Usuń</button>
          </div>
        </div>
      </header>

      <section className="admin-orders_table">
        <div className="table-scroll">
          <table className="orders-table">
            <thead>
              <tr>
                <th style={{ width: 24 }}><input type="checkbox" disabled /></th>
                <th>ID</th>
                <th>Użytkownik</th>
                <th>Data</th>
                <th>Ilość</th>
                <th>Wartość</th>
                <th>Status</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((o) => (
                <tr key={o.id} className={selected.includes(o.id) ? 'selected' : ''}>
                  <td><input type="checkbox" checked={selected.includes(o.id)} onChange={() => {
                    setSelected(s => s.includes(o.id) ? s.filter(x=>x!==o.id) : [...s, o.id]);
                  }} /></td>
                  <td>{o.id}</td>
                  <td>{o.user}</td>
                  <td>{o.date.toLocaleString()}</td>
                  <td>--</td>
                  <td>{o.total} zł</td>
                  <td><span className={`badge ${o.status}`}>{o.status}</span></td>
                  <td className="actions">
                    <IconButton Icon={FaEye} size={16} onClick={() => { /* preview modal - skeleton only */ }} />
                    <IconButton Icon={FaEdit} size={16} onClick={() => { /* edit modal - skeleton only */ }} />
                    <IconButton Icon={FaTrashAlt} size={16} onClick={() => { /* delete - skeleton only */ }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div>Wyświetlono {mockOrders.length} zamówień</div>
          <div className="pagination">
            <button className="btn outline" disabled>«</button>
            <button className="btn" disabled>1</button>
            <button className="btn outline" disabled>»</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AllAdminOrders;