"use client"
import IconButton from "@/app/components/inputs/IconButton";
import { Order } from "@/app/model/Order";
import { translateStatus } from "@/app/tools/Tools";
import { removeDocument as removeDocumentFromCollection } from "@/hooks/query/firebaseTools";
import { useGetAllAdminOrdersQuery } from "@/hooks/query/useAdminOrders";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import "../products/table.scss";
import "./admin-orders.scss";

const AllAdminOrders: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [fetchedOrders, setFetchedOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  const adminOrdersQuery = useGetAllAdminOrdersQuery();

  useEffect(() => {
    let orders = fetchedOrders;

    if (filter !== "all") {
      orders = orders.filter(o => o.status === filter);
    }
    if (query.trim() !== "") {
      orders = orders.filter(o => o.id?.toLowerCase().includes(query.toLowerCase()) || (typeof o.user !== "string" && o.user?.email && o.user.email.toLowerCase().includes(query.toLowerCase())));
    }
    setFilteredOrders(orders);
  },[query, filter, fetchedOrders])

  useEffect(() => {
    if (adminOrdersQuery.data) {
      setFetchedOrders(adminOrdersQuery.data);
    }
  }, [adminOrdersQuery.data])

  const queryClient = useQueryClient();

  const handleRemoveDocument = async (id: string): Promise<void> => {
    try {
      await removeDocumentFromCollection("orders", id);
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    } catch (err) {
      console.error("Failed to remove order:", err);
    }
  }

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
        <div className="table-scroll table-wrapper ">
          <table className="orders-table items-table">
            <thead className="table-header">
              <tr>
                <th style={{ width: 24 }}><input type="checkbox" disabled /></th>
                <th>ID</th>
                <th>Użytkownik</th>
                <th>Data</th>
                <th>Wartość</th>
                <th>Status</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredOrders.length > 0 && filteredOrders.filter(o => o.id).map((o) => {
                const id = o.id as string;
                return (
                  <tr key={id} className={selected.includes(id) ? 'selected' : ''}>
                    <td><input type="checkbox" checked={selected.includes(id)} onChange={() => {
                      setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
                    }} /></td>
                    <td>{id}</td>
                    <td>{o?.user?.displayName}</td>
                    <td>{o.orderDate.toLocaleString()}</td>
                    <td>{o.total} zł</td>
                    <td><span className={`badge ${o.status}`}>{translateStatus(o.status)}</span></td>
                    <td style={{padding: "10px 0px", justifyContent: "center"}} className="buttons">
                      <IconButton Icon={FaEye} size={16} onClick={() => { /* preview modal - skeleton only */ }} />
                      <IconButton Icon={FaEdit} size={16} onClick={() => { /* edit modal - skeleton only */ }} />
                      <IconButton Icon={FaTrashAlt} size={16} onClick={() => handleRemoveDocument(id)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <div>Wyświetlono {fetchedOrders.length} zamówień</div>
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