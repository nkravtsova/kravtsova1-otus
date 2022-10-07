const { expect } = require ('chai');
const { maxItemAssociation } = require("../build/maxItemAssociation");

describe("maxItemAssociation should works", () => {

	it("maxItemAssociation should return object", () => {
		expect(typeof maxItemAssociation([["q", "w", 'a'],["a", "b"],["a", "c"],["q", "e"],["q", "r"],])).to.be.equal('object');
	});

	it("maxItemAssociation([['q', 'w', 'a'],['a', 'b'],['a', 'c'],['q', 'e'],['q', 'r'],]) should return 7 items", () => {
		expect(maxItemAssociation([["q", "w", 'a'],["a", "b"],["a", "c"],["q", "e"],["q", "r"],]).length).to.be.equal(7);
	});

	it("maxItemAssociation() should return message", () => {
		expect(typeof maxItemAssociation()).to.be.equal('string');
	});
});