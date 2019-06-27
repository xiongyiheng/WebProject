var User = require("./User")

class UserManager {
    constructor() {
        this.storage = {};
    }

    getUser(userId) {
        return this.storage[userId];
    }

    newUser(userId) {
        var user = new User(userId);
        this.storage[userId] = user;
        return user;
    }

    deleteUser(userId) {
        delete this.storage[userId];
    }

    setUser(user) {
        this.storage[user.getUserId()] = user;
    }
}

module.exports = UserManager;
