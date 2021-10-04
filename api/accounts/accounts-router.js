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
    Accounts.create(req.body)
      .then((id) => {
        Accounts.getById(id).then((newAccount) => {
          res.status(201).json(newAccount);
        });
      })
      .catch(next);
  }
);

router.put("/:id", checkAccountId, checkAccountNameUnique, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body).then((updatedAccount) => {
    res.status(202).json(updatedAccount);
  });
});

router.delete("/:id", checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then((deletedAccount) => {
      res.status(200).json(deletedAccount);
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
