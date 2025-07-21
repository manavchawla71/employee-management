// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const cors = require("cors");
const app = express();
let employeesdata = [];
app.use(express.json());
app.use(cors());

app.delete("/deleteemployee/:id", (req, res) => {
  const employeeid = parseInt(req.params.id); // ensure it's a number
  employeesdata = employeesdata.filter(
    (employee) => employee.id !== employeeid
  );
  res.status(200).json(employeesdata); // return updated list
});

app.put("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, designation, yoe, phno } = req.body;

  employeesdata = employeesdata.map((emp) => {
    if (emp && emp.id === id) {
      return { ...emp, name, designation, yoe, phno };
    }
    return emp;
  });

  // Filter out any accidental nulls
  const filtered = employeesdata.filter(Boolean);
  res.status(200).json(filtered);
});

app.post("/addemployee", (req, res) => {
  const { name, designation, yoe, phno } = req.body;
  if (!name || !designation || !yoe || !phno) {
    return res.status(400).json({ message: "Enter all valid fields" }); // ⛔ return here
  }
  employeesdata.push({
    id: employeesdata.length + 1,
    name,
    designation,
    yoe,
    phno,
  });
  res.status(200).json(employeesdata);
});

app.get("/", (req, res) => {
  res.json(employeesdata);
});
app.get("/employees", (req, res) => {
  res.status(200).json(employeesdata);
});
// eslint-disable-next-line no-undef
module.exports = { app };
app.listen(3000, () => {
  console.log("server is listening");
});
