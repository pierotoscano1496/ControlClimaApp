export default class BadGatewayException extends Error {
    constructor(message) {
        super(message);
        this.name = "BadGatewayException";
    }
}