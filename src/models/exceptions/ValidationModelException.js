export default class ValidationModelException extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationModelException";
    }
}