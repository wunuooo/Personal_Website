// src/components/utils/ModelStore.js
export const modelStore = {
    potato: null,
    potatoes: [],
    subscribers: {
        potato: [],
        potatoes: []
    },
    setPotato(model) {
        this.potato = model;
        this.subscribers.potato.forEach(cb => cb(model));
    },
    setPotatoes(model) {
        this.potatoes.push(model);
        this.subscribers.potatoes.forEach(cb => cb(this.potatoes));
    },
    subscribe(type, callback) {
        if (!this.subscribers[type]) {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(callback);
    }
};