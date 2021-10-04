const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (!name || !budget) {
    next({ status: 400, message: "name and budget are required" });
  } else if (typeof name !== "string") {
    next({ status: 400, message: "name of account must be a string" });
  } else if (name.length < 3 || name.length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100" });
  } else if (typeof budget !== "number") {
    next({ status: 400, message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small",
    });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = (req, res, next) => {
  // const { name } = req.body;
  // Accounts.getAll()
  //   .then((accounts) => {
  //     let count = 0;
  //     for (let i = 0; i < accounts.length; i++) {
  //       if (name.trim() === accounts.name) {
  //         next({ status: 400, message: "that name is taken" });
  //       } else {
  //         count += 1
  //       }
  //     }
  //   })

  //   forEach((account) => {
  //     if (name.trim() === account.name) {
  //       next({ status: 400, message: "that name is taken" });
  //     } else {
  //       next();
  //     }
  //   });
  // })

  // .catch(next);

  next();
};

exports.checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
    .then((account) => {
      if (!account) {
        res.status(404).json({
          message: "account not found",
        });
      } else {
        req.acc = account;
        next();
      }
    })
    .catch(next);
};
