import Dexie from "https://unpkg.com/dexie@4.0.8/dist/modern/dexie.mjs";

// ==========================================
// STEP 1: The Blueprint (Defining the Schema)
// ==========================================
// 1. Name your database
const db = new Dexie("MyStartupDB");

// 2. Define your schema (The Blueprint)
db.version(1).stores({
  friends: "++id, name, age",
});

// ==========================================
// STEP 3: Writing the Data (Create)
// ==========================================
document.getElementById("addFriendsBtn").addEventListener("click", async () => {
  // Add a single record
  await db.friends.add({
    name: "Akshay",
    age: 28,
    address: "London, UK",
    isDeveloper: true,
  });

  // Also Valid!
  await db.friends.add({
    name: "Chirag",
    age: 30,
    favoriteFood: "Pizza",
    pets: ["Dog", "Cat"],
  });
  await db.friends.bulkAdd([
    { name: "A", age: 30 },
    { name: "B", age: 52 },
    { name: "C", age: 16 },
  ]);
  console.log(`Success! Bulk operation completed.`);
});

// ==========================================
// STEP 4: Asking for it Back (Read & Query)
// ==========================================
document.getElementById("findAllBtn").addEventListener("click", async () => {
  const allFriends = await db.friends.toArray();
  console.log("All Friends in Database:", allFriends);
});

document.getElementById("findSpecBtn").addEventListener("click", async () => {
  const akshay = await db.friends.get(1);
  console.log("Found ID 1:", akshay);
});

document.getElementById("findOlderBtn").addEventListener("click", async () => {
  const olderFriends = await db.friends.where("age").above(25).toArray();
  console.log("Friends older than 25:", olderFriends);
});

document.getElementById("findStartsBtn").addEventListener("click", async () => {
  const aNames = await db.friends.where("name").startsWith("A").toArray();
  console.log('Friends whose name starts with "A":', aNames);
});

// ==========================================
// STEP 5: Updating and Deleting (Cleanup)
// ==========================================
document.getElementById("updateBtn").addEventListener("click", async () => {
  await db.friends.update(1, { age: 29 });
  console.log("Updated ID 1 to age 29!");
});

document.getElementById("deleteBtn").addEventListener("click", async () => {
  await db.friends.delete(2);
  console.log("Deleted ID 2 from the database.");
});

document.getElementById("bulkDeleteBtn").addEventListener("click", async () => {
  const deleteCount = await db.friends.where("age").below(18).delete();
  console.log(`Nuked ${deleteCount} friend(s) under 18.`);
});
