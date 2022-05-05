export default class ResourceNotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "ResourceNotFoundException";
    }
}