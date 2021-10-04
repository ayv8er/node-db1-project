const router = require("express").Router();
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");
const Accounts = require("./accounts-model");

router.get("/", (req, res, next) => {
  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(next);
});

router.get("/:id", checkAccountId, (req, res, next) => {
  res.status(200).json(req.acc);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    Accounts.create(req.body).then((newAccount) => {
      console.log(newAccount);
    });
  }
);

router.put("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then((deletedAccount) => {
      res.json(deletedAccount);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
