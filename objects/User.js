class User {
    _socketId;
    _username;

    constructor(socketId, username) {
        this._username = username;
        this._socketId = socketId;
    }

    get socketId() {
        return this._socketId;
    }

    set socketId(value) {
        this._socketId = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }
}

export default User;