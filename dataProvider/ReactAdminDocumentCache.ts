class ReactAdminDocumentCache {
    private static cache: Map<string,any>;

    static getCache(): Map<string,any> {
        if (!this.cache) {
            this.cache = new Map();
        }

        return this.cache;
    }

    static set(key: string, value: any): void {
        this.getCache().set(key,value);
    }

    static get(key: string): any {
        this.getCache().get(key);
    }

    static has(key: string): any {
        this.getCache().has(key);
    }
}

export default ReactAdminDocumentCache;
