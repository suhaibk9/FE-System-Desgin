import { faker } from "@faker-js/faker/locale/en";

try {
  const d = {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      material: faker.commerce.productMaterial(),
      description: faker.commerce.productDescription(),
      color: faker.color.rgb({ prefix: "#", casing: "lower" })
  };
  console.log("Success:", !!d.id);
} catch (e) {
  console.error("Error:", e.message);
}
