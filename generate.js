import { faker } from "@faker-js/faker";
import mysql from "mysql2/promise";

const total = 500_000; // jumlah row
const batchSize = 5000; // insert per batch

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root", // sesuaikan user
  password: "", // sesuaikan password
  database: "financial_dashboard",
});

// Dummy options
const branches = ["Branch 1", "Branch 2", "Branch 3", "Branch 4", "Branch 5"];
const mainBranches = ["Region A", "Region B"];
const officers = ["Officer 1", "Officer 2", "Officer 3"];
const categories = ["Savings"];
const types = ["A", "B", "C"];

console.log("Start generating data...");

for (let i = 0; i < total; i += batchSize) {
  const rows = [];

  for (let j = 0; j < batchSize; j++) {
    rows.push([
      faker.person.fullName(),
      faker.internet.email(),
      faker.location.streetAddress(),
      faker.phone.number(),
      branches[Math.floor(Math.random() * branches.length)],
      mainBranches[Math.floor(Math.random() * mainBranches.length)],
      officers[Math.floor(Math.random() * officers.length)],
      categories[0],
      types[Math.floor(Math.random() * types.length)],
      faker.date.past(),
    ]);
  }

  await connection.query(
    `INSERT INTO customers 
     (name, email, address, phone, branch, main_branch, officer, category, type, created_at) 
     VALUES ?`,
    [rows]
  );

  console.log(`Inserted ${i + batchSize} rows...`);
}

console.log("All data inserted!");
await connection.end();
