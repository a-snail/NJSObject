'use strict';

document.title = 'njs.Object v' + njs.Object.version + ' - ' + document.title;

QUnit.module('read', njs.Object);

QUnit.test('njs.Object.version', function(assert) {
    assert.ok(
        (/^(\d+\.)(\d+\.)(\d+)$/).test(njs.Object.version),
        'The version information format is correct.'
    );
});

QUnit.test('njs.Object.bind()', function(assert) {
    var foo = {
        name: 'SampleObject'
    };
    var bar = function() {
        if (this && this.name) {
            return this.name;
        }
        else {
            return null;
        }
    };
    var fnc = njs.Object.bind(bar, foo);

    assert.equal(fnc(), foo.name, 'The specified method called using the target object.');
});

QUnit.test('njs.Object.copy()', function(assert) {
    var foo = {
        name: 'SomeObject',
        deep: {
            deepProp: 'SomeDeepProperty'
        },
        prop: 'SomeProperty'
    };
    var bar = njs.Object.copy(foo);

    assert.deepEqual(foo, bar, 'All properties of the original object have been copied.');

    bar.name          = 'OtherObject';
    bar.deep.deepProp = 'OtherDeepProperty';

    assert.notDeepEqual(
        foo,
        bar,
        'Changing the properties of the copied object does not change the properties of the original object.'
    );
    assert.notEqual(
        foo.name,
        bar.name,
        'The properties of the copied object may differ from properties of the original object.'
    );
    assert.equal(
        foo.deep.deepProp,
        bar.deep.deepProp,
        'The object properties inside the copied object are same from object properties inside the original object.'
    );
});

QUnit.test('njs.Object.deepCopy()', function(assert) {
    var foo = {
        name: 'SomeObject',
        deep: {
            deepProp: 'SomeDeepProperty'
        },
        prop: 'SomeProperty'
    };
    var bar = njs.Object.deepCopy(foo);

    assert.deepEqual(foo, bar, 'All properties of the original object have been copied.');

    bar.name          = 'OtherObject';
    bar.deep.deepProp = 'OtherDeepProperty';

    assert.notDeepEqual(
        foo,
        bar,
        'Changing the properties of the copied object does not change the properties of the original object.'
    );
    assert.notEqual(
        foo.name,
        bar.name,
        'The properties of the copied object may differ from properties of the original object.'
    );
    assert.notEqual(
        foo.deep.deepProp,
        bar.deep.deepProp,
        'The object properties inside the copied object may differ from object properties inside the original object.'
    );
});

QUnit.test('njs.Object.each()', function(assert) {
    var foo = {
        a: 80,
        b: 70,
        c: 60,
        d: 50
    };
    var bar = function(prop, value) {
        this[prop] = value + 10;
    };

    njs.Object.each(foo, bar);
    assert.deepEqual(foo, {a: 90, b: 80, c: 70, d: 60}, 'The function was successfully executed for each property.');
});

QUnit.test('njs.Object.extend()', function(assert) {
    var foo, bar, baz, pop, res;

    foo = {a: 1, b: 2};
    bar = {c: 3, d: 4};
    res = {a: 1, b: 2, c: 3, d: 4};
    assert.deepEqual(
        njs.Object.extend(foo, bar),
        res,
        'The original object has been successfully extended using the properties of the target object.'
    );

    foo = {a: 1, b: 2};
    bar = {b: 3, c: 4};
    res = {a: 1, b: 2, c: 4};
    assert.deepEqual(
        njs.Object.extend(foo, bar),
        res,
        'If the property of the target object already exists in the original object, it is not extended.'
    );

    foo = {a: 1, b: 2};
    bar = {b: 3, c: 4};
    res = {a: 1, b: 3, c: 4};
    assert.deepEqual(
        njs.Object.extend(foo, bar, true),
        res,
        'Even properties that already exist in the original object will be overwritten using the `overwrite` argument.'
    );

    foo = {a: 1, b: 2};
    bar = {b: 3, c: 4};
    baz = {a: 'a', z: 'z'};
    res = {a: 1, b: 2, c: 4, z: 'z'};
    assert.deepEqual(
        njs.Object.extend(foo, bar, baz),
        res,
        'Successfully extended with one or more target objects.'
    );

    foo = {a: 1, b: 2};
    bar = {b: 3, c: 4};
    baz = {a: 'a', z: 'z'};
    res = {a: 'a', b: 3, c: 4, z: 'z'};
    assert.deepEqual(
        njs.Object.extend(foo, bar, baz, true),
        res,
        'Overwriting is possible even if extending with one or more target object.'
    );

    foo = {a: 1, b: 2};
    bar = {b: 3, c: 4};
    baz = {a: 'a', z: 'z'};
    pop = {a: true};
    res = {a: 'a', b: 2};
    assert.deepEqual(
        njs.Object.extend(foo, bar, baz, true, pop),
        res,
        'Only the specified properties of the target objects are extended.'
    );
});

QUnit.test('njs.Object.isArray()', function(assert) {
    assert.equal(njs.Object.isArray([]), true, '`[]` is an `Array` type.');
    assert.equal(njs.Object.isArray({}), false, '`{}` is not an `Array` type.');
});

QUnit.test('njs.Object.isObject()', function(assert) {
    assert.equal(njs.Object.isObject({}), true, '`{}` is an `Object` type.');
    assert.equal(njs.Object.isObject([]), false, '`[]` is not an `Object` type.');
    assert.equal(njs.Object.isObject(''), false, '`""` is not an `Object` type.');
    assert.equal(njs.Object.isObject(0), false, '`0` is not an `Object` type.');
    assert.equal(njs.Object.isObject(document), false, '`document` is not an `Object` type.');
});

QUnit.test('njs.Object.toString()', function(assert) {
    assert.ok(
        (/^\[class\snjs\.Object]\sv\d+\.\d+\.\d+$/).test(njs.Object.toString()),
        'The class information string format is correct.'
    );
});
