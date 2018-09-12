const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');

class FileRepository {
    getByStatusAndTitle(status, title) {
        const normalizedData = this._getAll();

        const tasks = Object.keys(normalizedData)
            .map(id => normalizedTasks[id])
            .filter(task => {
                return includesPredicate(() => task.title, title) &&
                    includesPredicate(() => task.status, status);
            });

        return tasks;
    }

    get(id) {
        const normalizedData = this._getAll();
        return normalizedData[id];
    }

    insert(data) {
        const normalizedData = this._getAll();
        const id = uuidv4();

        const createdTask = { id, ...data };

        normalizedData[id] = createdTask;

        this._save(normalizedData);

        return createdTask;
    }

    update(id, data) {
        const normalizedData = this._getAll();

        const task = normalizedData[id];

        if (!task) {
            throw new Error('Task doesnt exist');
        }

        const updatedTask = { ...task, ...data };

        normalizedData[id] = updatedTask;
        /// intentionnaly not saved

        return updatedTask;

    }

    delete(id) {
        const normalizedData = this._getAll();

        delete normalizedData[id];

        this._save(normalizedData);
    }

    _getAll() {
        const rawData = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
        return JSON.parse(rawData);
    }

    _save(fullData) {
        fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(fullData), { encoding: 'utf8' });
    }

}

const includesPredicate = (topic, attribute) => {
    if (attribute && attribute !== '') {
        return topic().includes(attribute);
    }
    return true;
}

module.exports = new FileRepository();