const userCtrl = {};

userCtrl.getUsers = (req, res) => res.send("user routes");

userCtrl.createUser = (req, res) => res.send("user routes");

userCtrl.deleteUser = (req, res) => res.send("user routes");

module.exports = userCtrl;