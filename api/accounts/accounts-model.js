const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where("id", id).first();
};

const create = (account) => {
  return db("accounts").insert(account);
};

const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  const updatedAccount = await getById(id);
  return updatedAccount;
};

const deleteById = async (id) => {
  const accountToDelete = await getById(id);
  await db("accounts").where("id", id).delete();
  return accountToDelete;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
