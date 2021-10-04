const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  next();
};

exports.checkAccountNameUnique = (req, res, next) => {
  next();
};

exports.checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
    .then((account) => {
      if (!account) {
        res.status(404).json({
          message: "Account ID does not exists",
        });
      } else {
        req.acc = account;
        next();
      }
    })
    .catch(next);
};
