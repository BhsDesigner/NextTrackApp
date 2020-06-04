export class SyliusReactAdminDocument {
    constructor(obj) {
        Object.assign(this, obj, {
            originId: obj.code,
            id: obj['code'],
        });
    }

    /**
     * @return {string}
     */
    toString() {
        return `[object ${this.id}]`;
    }
}
