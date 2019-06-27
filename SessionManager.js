var UserManager = require('./UserManager');


class SessionManager {
    constructor() {
        this.sessions = {};
        this.users = new UserManager();
    }

    getUser(sessionId) {
        var userId = this.sessions[sessionId];
        return this.users.getUser(userId);
    }

    newUser(userId) {
        for (var i in this.sessions) {
            if (this.sessions[i] == userId) {
                this.deleteUser(i);
            }
        }

        var sessionId = this.randomId(32);
        this.sessions[sessionId] = userId;
        this.users.newUser(userId);
        return sessionId;
    }

    deleteUser(sessionId) {
        var userId = this.sessions[sessionId];
        this.users.deleteUser(userId);
        delete this.sessions[sessionId];
    }

    randomId(length) {
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = chars.length;
        var id = '';
        for (var i = 0; i < length; i++) {
            id += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return id;
    }

    state() {
        for (var i in this.sessions) {
            console.log("(" + i + "," + this.sessions[i] + ")");
            console.log(this.getUser(i));
        }
    }

}

module.exports = SessionManager;
