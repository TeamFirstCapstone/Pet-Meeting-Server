import expressLoader from "./express";
import mysqlLoader from "./mysql";

export default async ({ expressApp }) => {
  // const mysqlConnection = await mysqlLoader();
  console.log("MySQL Intialized");

  await expressLoader({ app: expressApp });
  console.log("Express Intialized");

  return { mysqlConnection };
};
