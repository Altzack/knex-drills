require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

function searchByName(searchTerm) {
  knexInstance
    .select("*")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then((result) => {
      console.log("SEARCH");
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}
searchByName("tofu");

function paginate(page) {
  const perPage = 6;
  const offset = perPage * (page - 1);
  knexInstance
    .select("*")
    .from("shopping_list")
    .limit(perPage)
    .offset(offset)
    .then((result) => {
      console.log("PAGINATE");
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}
paginate(2);

function productsAddedDaysAgo(daysAgo) {
  knexInstance
    .select("*")
    .from("shopping_list")
    .where(
      "date_added",
      ">",
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then((result) => {
      console.log("DAYS AGO");
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}
productsAddedDaysAgo(6);

function costPerCategory() {
  knexInstance
    .select("category")
    .sum("price as total")
    .from("shopping_list")
    .groupBy("category")
    .then((result) => {
      console.log("COST PER CATEGORY");
      console.log(result);
    });
}
costPerCategory();
