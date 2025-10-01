import React, { useEffect, useState } from "react";

// Layout & UI Components
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardDeck,
  CardTitle,
  Table,
  ListGroup,
  ListGroupItem,
  Button,
  CustomInput,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "./../../../components";

import { setupPage } from "./../../../components/Layout/setupPage";

// Shared Components
import { HeaderMain } from "../../components/HeaderMain";

// Financial Components
import { TrTableInvoices } from "../../components/Financial/TrTableInvoices";
import { TinyDonutChartBig } from "../../components/Financial/TinyDonutChartBig";
import { StackedAreaChart } from "../../components/Financial/StackedAreaChart";
import { TrTableRecentFundings } from "../../components/Financial/TrTableRecentFundings";

export default function Finance() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/customers?page=1&limit=50")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data dari API:", data); // cek di browser console
        setCustomers(data);
      })
      .catch((err) => console.error("Error fetching customers:", err));
  }, []);

  return (
    <div>
      <h1>Financial Dashboard</h1>
      <h2>Showing {customers.length} customers</h2>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Main Branch</th>
            <th>Officer</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.branch}</td>
              <td>{c.main_branch}</td>
              <td>{c.officer}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
