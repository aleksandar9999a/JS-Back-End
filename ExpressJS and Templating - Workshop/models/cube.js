const fs = require('fs');
const path = require('path');

class CubeModel {
    constructor() {
        this.data = require('../config/database');
    }

    _write(newData, resolveData){
        return new Promise((res, rej) => {
            fs.writeFile(path.resolve('config/database.json'), JSON.stringify(newData), (err) => {
                if (err) { rej(err);  return; }

                this.data = newData;
                res(resolveData)
            })
        })
    }

    insert(newCube) {
        const newIndex = this.data.lastIndex + 1;
        newCube = { id: newIndex, ...newCube };
        const newData = {
            lastIndex: newIndex,
            entities: this.data.entities.concat(newCube)
        };

        return this._write(newData, newCube);
    }

    update(currId, updates) {
        const entityIndex = this.data.entities.findIndex(({ id }) => id === currId);
        const entity = this.data.entities[entityIndex];
        const updatedEntity = { ...entity, ...updates };
        const newData = {
            lastIndex: this.data.lastIndex,
            entities: [...this.data.entities.slice(0, entityIndex), updatedEntity, ...this.data.entities.slice(entityIndex + 1)]
        }

        return this._write(newData, updatedEntity);
    }

    delete(id) {
        const deletedEntity = this.getOne(id);

        const newData = {
            lastIndex: this.data.lastIndex,
            entities: this.data.entities.filter(({id: i}) => i !== id)
        };


        return this._write(newData, deletedEntity);
    }

    getOne(id) {
        return Promise.resolve(this.data.entities.find(({id: i}) => i === id));
    }

    getAll() {
        return Promise.resolve(this.data.entities);
    }
}

module.exports = new CubeModel();