export class IdBasedReactAdminDocument {
    constructor(obj) {
        Object.assign(this, obj, {
            originId: obj.id,
            id: obj['id'],
        });
    }
    /**
     * @return {string}
     */
    toString() {
        return `[object ${this.id}]`;
    }
}
