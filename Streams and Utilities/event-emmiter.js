class EventEmmiter {
    constructor() {
        this.subscribtions = {};
    }

    on(eventName, cb) {
        this.subscribtions[eventName] = (this.subscribtions[eventName] || []).concat(cb);
        const cbIndex = this.subscribtions[eventName].length;
        return () => {
            this.subscribtions[eventName] = [
                ...this.subscribtions[eventName].slice(0, cbIndex),
                ...this.subscribtions[eventName].slice(cbIndex + 1)
            ];
        }
    }

    once(eventName, cb) {
        const unsub = this.on(eventName, (data) => {
            cb(data);
            unsub();
        })
    }

    emit(eventName, data) {
        (this.subscribtions[eventName] || []).forEach(cb => {
            cb(data)
        });
    }
}

const emitter = new EventEmmiter();
//const unsub = emitter.subscribe('getData', console.log);
// emitter.subscribe('getData', console.log);
// emitter.subscribe('getData', console.log);

emitter.emit('getData', 'Testing...');
//unsub();
//console.log('-----------------');
emitter.once('getData', console.log);
emitter.emit('getData', 'Testing...');
