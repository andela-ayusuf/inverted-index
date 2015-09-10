describe('Read book data', function() {

  it('should be truthy', function() {
    expect(books).toBeTruthy();
  });

  it('should ensure books.json exists', function() {
    expect(books).toBeDefined();
  });

  it('should have a data-type of object', function() {
    expect(books).toEqual(jasmine.any(Object));
  });

});

describe('Read book data', function() {

  it('should confirm that the array has the correct index number', function() {
    expect(books.length).toEqual(2);
  });

  it('should match index[0] to the first element/object in the array', function() {
    expect(books[0]).toEqual(jasmine.objectContaining({ 
      "title": "Alice in Wonderland",
      "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    }));
  });

  it('should match index[1] to the second element/object in the array', function() {
    expect(books[1]).toEqual(jasmine.objectContaining({ 
      "title": "The Lord of the Rings: The Fellowship of the Ring.",
      "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }));
  });

  it('should maps the string keys to the correct objects in the JSON array', function() {
    expect(books[0].title).toEqual("Alice in Wonderland");
  });

  it('should maps the string keys to the correct objects in the JSON array', function() {
    expect(books[1].text).toEqual("An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.");
  });

});

describe('Search index', function() {
  
  it('should return an array of indices of the correct objects that contain the searched words', function() {
    expect(Index.prototype.searchIndex('and')).toEqual([0, 1]);
  });

  it('should return an array of the index of the correct object that contain the searched word', function() {
    expect(Index.prototype.searchIndex('alice')).toEqual([0]);
  });

  it('should return an array of the index of the correct object that contain the searched word', function() {
    expect(Index.prototype.searchIndex('lord')).toEqual([1]);
  });

  it('should not return an array of indices if the word is not found', function() {
    expect(Index.prototype.searchIndex('andela')).toEqual('Not In Any Document');
  });

});
