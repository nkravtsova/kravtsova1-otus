describe("getPath should return string with body", function() {

  it("getPath should not return empty string", function() {
    expect(getPath('#elem')).not.toBe('');
  });
  it("getPath found Element in body", function() {
    expect(getPath('#elem')).toContain('body');
  });

});
