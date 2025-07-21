// eslint-disable-next-line no-undef
const request = require("supertest");
// eslint-disable-next-line no-undef
const { app } = require("../index"); // Make sure this path is correct!
// eslint-disable-next-line no-undef
const { describe, it, expect, beforeEach } = require("@jest/globals");

describe("Employee API", () => {
  beforeEach(() => {
    // Reset the employeesdata array before each test if you can access it
    // Or restart app state clean if needed
  });

  it("should add an employee", async () => {
    const res = await request(app).post("/addemployee").send({
      name: "John",
      designation: "Dev",
      yoe: "2",
      phno: "9999999999",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should fail to add with missing fields", async () => {
    const res = await request(app).post("/addemployee").send({
      name: "",
      designation: "",
      yoe: "",
      phno: "",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Enter all valid fields");
  });

  it("should return employee list", async () => {
    const res = await request(app).get("/employees");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update an employee", async () => {
    // First, add an employee to update
    await request(app).post("/addemployee").send({
      name: "Jane",
      designation: "Designer",
      yoe: "3",
      phno: "8888888888",
    });

    // Then update that employee
    const res = await request(app).put("/update/1").send({
      name: "Jane Updated",
      designation: "Senior Designer",
      yoe: "4",
      phno: "7777777777",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.find((emp) => emp.id === 1).name).toBe("Jane Updated");
  });

  it("should delete an employee", async () => {
    // First, add an employee to delete
    await request(app).post("/addemployee").send({
      name: "Mark",
      designation: "Tester",
      yoe: "1",
      phno: "6666666666",
    });

    const res = await request(app).delete("/deleteemployee/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.find((emp) => emp.id === 1)).toBeUndefined();
  });
});
