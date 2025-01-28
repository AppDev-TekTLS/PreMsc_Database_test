import User from "./User";

class UserFactory {
    _users = [];

    addUser(socketId) {
        this._users.push(new User(socketId, `user${this._users.length + 1}`));
    }

    getAllUsers() {
        return this._users.map(user => user.username);
    }

    getUserBySocketId(socketId) {
        const userFilters = this._users.filter((user) => user.socketId === socketId);

        if (this._users.length === 0) {
            return null;
        }

        return userFilters[0];
    }

    getUserByUsername(username) {
        const userFilters = this._users.filter((user) => user.username === username);

        if (this._users.length === 0) {
            return null;
        }

        return userFilters[0];
    }

    changeUsernameOfUser(socketId, username) {
        const index = this._users.findIndex((user) => user.socketId === socketId);
        if (index !== -1)
            this._users[index].username = username;
    }

    removeUser(socketId) {
        if (this._users.length == 0)
            return [];
        if (this._users.length == 1) {
            this._users.pop();
            return [];
        }
        const index = this._users.map(o => o.socketId).indexOf(socketId);
        this._users.splice(index, 1);

        return this._users.map(user => user.username);
    }
}

export default UserFactory;