const userCtrl = {};

const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users)
};

userCtrl.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({
        username
    });
    await newUser.save();

    res.send("user routes");
};

userCtrl.deleteUser = async (req, res) => {
    await User.findOneAndDelete(req.params.id);
    res.send({ message: "Usuario borrado" });
};

userCtrl.updateUsername = async (req, res) => {
    const { username } = req.body;
    await User.findOneAndUpdate(req.params.id, {
        username
    });

    res.send({ message: "Usuario actualizado" });
}
module.exports = userCtrl;