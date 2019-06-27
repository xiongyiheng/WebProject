class User {
    constructor(userId) {
        this.userId = userId;
        this.userName = null;
    }

    getUserId() {
        return this.userId;
    }

    setUserName(name) {
        this.userName = name;
    }

    getUserName() {
        return this.userName;
    }
}

module.exports = User;
