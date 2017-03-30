/**
 * @author milkmidi
 * @version 1.0.1
 */
function getElementIndex(array, searchElement) {
    for (let i = 0, l = array.length; i < l; i++) {
        if (searchElement === array[i]) {
            return i;
        }
    }
    return -1;
}

export class Command {
    /**
     * @param {function} execute
     * @param {function?} interrupt
     */
    constructor(execute, interrupt) {
        this._parent;
        this._execute = execute;
        this._interrupt = interrupt;
        this._data;
    }
    execute() {
        this._data = this._execute.call(this);
    }
    executeComplete() {
        if (this._parent) this._parent.execute();
    }
    interrupt() {
        if (this._interrupt) this._interrupt.call(this);
    }
    /**
     * @param {CommandList} parent
     */
    set parent(parent) {
        this._parent = parent;
    }
    /**
     * @return {CommandList}
     */
    get parent() {
        return this._parent;
    }
    set data(value) {
        this._data = value;
    }
    get data() {
        return this._data;
    }
    toString() {
        return '[Command]';
    }
}

class Fun extends Command {
    constructor(f) {
        super(f);
    }
    execute() {
        super.execute();
        this.executeComplete();
    }
}
class Wait extends Command {
    constructor(time) {
        super(() => this.timeoutID = setTimeout(() => this.executeComplete(), this.time));
        this.time = time;
        this.timeoutID = -1;
    }
    interrupt() {
        if (this.timeoutID != -1) {
            clearTimeout(this.timeoutID);
            this.timeoutID = -1;
        }
    }
}

class CommandList extends Command {
    constructor() {
        super();
        this._commandList = [];
        this._currentCmd;
        this._position = 0;
    }
    add(...arg) {
        arg.forEach((command) => {
            let cmd = command;
            if (typeof command === 'number') {
                cmd = new Wait(command);
            } else if (typeof command === 'function') {
                cmd = new Fun(command);
            }
            cmd.parent = this;
            this._commandList.push(cmd);
        });
    }
    remove(command) {
        if (command.parent == this) {
            const index = getElementIndex(this._commandList, command);
            if (index != -1) {
                this._commandList.splice(index, 0);
            }
        }
    }
    atHasNextCommand() {
        return this._position < this._commandList.length;
    }
    atGetNextCommand() {
        const cmd = this._commandList[this._position];
        this._position++;
        return cmd;
    }
    get length() {
        return this._commandList.length;
    }
    get position() {
        return this._position;
    }
    toString() {
        return `[CommandList size:${this._commandList.length}]`;
    }
}

export class SerialList extends CommandList {
    constructor(...arg) {
        super();
        this.add.apply(this, arg);
    }
    execute() {
        if (this._currentCmd != null) {
            this.data = this._currentCmd.data;
        }
        if (this.atHasNextCommand()) {
            this._currentCmd = this.atGetNextCommand();
            if (this._currentCmd == null) {
                this.execute();
            } else {
                this._currentCmd.data = this.data;
                this._currentCmd.execute();
            }
        } else {
            this.executeComplete();
        }
    }
    toString() {
        return `[SerialList position:${this._position}/${this.length}]`;
    }
}
