type User = {
  readonly name: string;
};
type readonlyUser = Readonly<User>;
const userRO: readonlyUser = {
  name: "suhaib",
};
type FFIE<T> = (arr: T) => T;
type F = <T>(arr: T) => T | undefined;
type T = {
  readonly name: string;
};
const s="Suhaib" as const;
type Info=typeof s;