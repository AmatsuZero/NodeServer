/**
 * Created by 振华 on 2017/1/22.
 */
var fortune = require('../lib/fortune');
var expect = require('chai').expect;

suite('Fortune cookie tests', function () {
    test('getFortune() should retrun a fortune', function () {
        expect(typeof fortune.getFortune() === 'string');
    });
});