/* eslint-env node, mocha */
const { assert } = require('chai');

describe('utils', () => {
    const { isIdentityInTaiwan, isEmail } = require('../src/js/util/validate.js');
    it('isIdentityInTaiwan', () => {
        assert.isTrue(isIdentityInTaiwan('a123456789'));
        assert.isTrue(isIdentityInTaiwan('A102795683'));
        assert.isTrue(isIdentityInTaiwan('A189062449'));
        assert.isTrue(isIdentityInTaiwan('a123456789'));
        assert.isTrue(isIdentityInTaiwan('A163470343'));
        assert.isTrue(isIdentityInTaiwan('K141374967'));
        assert.isTrue(isIdentityInTaiwan('F125251223'));
        assert.isTrue(isIdentityInTaiwan('U120175800'));
        assert.isTrue(isIdentityInTaiwan('R223167630'));
        assert.isTrue(isIdentityInTaiwan('N279184664'));
        assert.isTrue(isIdentityInTaiwan('N294257793'));
        assert.isTrue(isIdentityInTaiwan('F284390945'));
        assert.isTrue(isIdentityInTaiwan('Z269128930'));
        assert.isTrue(isIdentityInTaiwan('N224511193'));

        assert.isFalse(isIdentityInTaiwan('D120891731'));
        assert.isFalse(isIdentityInTaiwan('a123456780'));
        assert.isFalse(isIdentityInTaiwan('F125251229'));
        assert.isFalse(isIdentityInTaiwan('N224511191'));
        assert.isFalse(isIdentityInTaiwan('N224511192'));
        assert.isFalse(isIdentityInTaiwan(''));
        assert.isFalse(isIdentityInTaiwan('1234567'));
        assert.isFalse(isIdentityInTaiwan('o123456789'));
        assert.isFalse(isIdentityInTaiwan());
    });

    it('isEmail', () => {
        assert.isTrue(isEmail('milkmidi@gmail.com'));
        assert.isTrue(isEmail('milkmidi.test@gmail.com'));
        assert.isTrue(isEmail('milkmidi+jp@gmail.com'));

        assert.isFalse(isEmail('milkmidigmail.com'));
        assert.isFalse(isEmail('milkmidigmail'));
        assert.isFalse(isEmail());
    });
});


describe('Command', () => {
    const { Command, SerialList } = require('../src/js/milkmidi/Command.js');

    it('SerialList', (done) => {
        let cmds = new SerialList();
        assert.strictEqual(cmds.length, 0);

        const cmd = new Command(function () {
            console.log('cmd1');
            this.executeComplete();
            return 'cmd1';
        });


        cmds = new SerialList(() => {
            console.log('fun1');
        }, cmd, () => {
            console.log('fun3');
        }, 2, () => {
            done();
        });
        assert.strictEqual(cmds.length, 5);
        cmds.execute();
    });
});
