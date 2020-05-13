class EventEmitter {
    constructor() {
        this.subscribtion = {};
    }

    on(eventName, cb) {
        if (!this.subscribtion[eventName]) {
            this.subscribtion[eventName] = [];
        }
        this.subscribtion[eventName].push(cb);
    }

    emit(eventName, data) {
        (this.subscribtion[eventName] || []).forEach(cb => cb(data));
    }

}

const ee = new EventEmitter();

ee.on("message", console.log);


ee.emit("message", 'I am 1!')

ee.emit("message", 'I am 2!')
ee.emit("message", 'I am 3!')
ee.emit("message", 'I am 4!')