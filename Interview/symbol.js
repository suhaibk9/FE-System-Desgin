const user = { name: "Alice" };

const mySecretId = Symbol("id");
const theirSecretId = Symbol("id");

// Both properties can exist on the exact same object without overlapping
user[mySecretId] = 12345;
user[theirSecretId] = "Database_ID_99";

console.log(user);
