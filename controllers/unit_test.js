import { request } from "supertest";
import app from "../server";

describe("/api/v1/product", () => {
  it("should return a list of all products", async () => {
    const response = await request(app).get("/api/v1/product");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "All products",
      products: [
        {
          name: "Product 1",
          description: "This is product 1.",
          price: 100,
        },
        {
          name: "Product 2",
          description: "This is product 2.",
          price: 200,
        }
      ]
    });
  });
});

describe("/api/v1/product/:id", () => {
  it("should return a single product by its ID", async () => {
    const response = await request(app).get("/api/v1/product/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "single product fetched ",
      product: {
        name: "Product 1",
        description: "This is product 1.",
        price: 100,
      }
    });
  });

  it("should return a 404 Not Found error if the product ID does not exist", async () => {
    const response = await request(app).get("/api/v1/product/1000");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: "Product not found",
    });
  });
});

describe("/api/v1/product/create", () => {
  it("should create a new product", async () => {
    const product = {
      name: "Product 3",
      description: "This is product 3.",
      price: 300,
    };

    const response = await request(app).post("/api/v1/product/create", product);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: "Product Created Successfully",
      product: product,
    });
  });
});

describe("/api/v1/product/update", () => {
  it("should update an existing product", async () => {
    const product = {
      name: "Product 3",
      description: "This is product 3.",
      price: 300,
    };

    await ProductModel.insertOne(product);

    const updatedProduct = {
      name: "Product 4",
      description: "This is product 4.",
      price: 400,
    };

    const response = await request(app).put("/api/v1/product/update", updatedProduct);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: "Product updated Successfully",
      product: updatedProduct,
    });
  });
});
