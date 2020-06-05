const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash,
        email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        trx("users")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .returning("*")
          .then((user) => res.json(user[0]))
          .then(trx.commit)
          .catch(trx.rollback);
      });
  }).catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister,
};
