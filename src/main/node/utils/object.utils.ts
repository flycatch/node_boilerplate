/**
 * This method uses javascript proxy to achieve a lazy intialization of a class.
 * ie an object is instantiated only when its properties are accessed
 *
 * @param instantiator this function returns the object that should be created.
 * @returns a proxy wrapping the created object
 */
export const lazy = <T extends object>(instantiator: () => T, init?: T) => {
    const handler = {
        instance: undefined as any,
        get(target: T, prop: string | symbol | number, reciever: any) {
            if (!this.instance) {
                this.instance = instantiator();
            }
            return Reflect.get(this.instance, prop, reciever);
        },
        set(target: T, p: string | symbol, value: any, receiver: any) {
            if (!this.instance) {
                this.instance = instantiator();
            }
            return Reflect.set(this.instance, p, value, receiver);
        },
    };
    return new Proxy(init || {} as T, handler);
};
