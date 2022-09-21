var expect = require('chai').expect;
var maxItemAssociation = require('../src/maxItemAssociation');
describe("maxItemAssociation should works", function () {
    it("maxItemAssociation should return object", function () {
        expect(typeof maxItemAssociation([["q", "w", 'a'], ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"],])).to.be.equal('object');
    });
    it("maxItemAssociation([['q', 'w', 'a'],['a', 'b'],['a', 'c'],['q', 'e'],['q', 'r'],]) should return 7 items", function () {
        expect(maxItemAssociation([["q", "w", 'a'], ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"],]).length).to.be.equal(7);
        ;
    });
    it("maxItemAssociation() should return message", function () {
        expect(typeof maxItemAssociation()).to.be.equal('string');
        ;
    });
});
