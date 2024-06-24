export class UserNotFoundError extends Error {
    constructor() {
        super('User not found, please check the provided data')
    }
}