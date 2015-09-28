describe('Read book data', function() {
  var books = indexChild.getBooks('books.json');

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

describe('Populate Index', function() {
  var getIndex = indexChild.createIndex('books.json'),
  books = indexChild.getBooks('books.json');

  it('should verify that the index is created once the JSON file has been read', function() {
    expect(getIndex).toBeDefined();
  });

  it('should ensure that index is correct', function() {
    expect(getIndex.rabbit).toEqual([0]);
  });

  it('should ensure that index is correct', function() {
    expect(getIndex.man).toEqual([1]);
  });

  it('should maps the string keys to the correct objects in the JSON array', function() {
    expect(books[0].title).toEqual('Alice in Wonderland');
  });
});

describe('Search Index', function() {
  it('should return an array of indices of the correct objects that contain the searched words', function() {
    expect(Index.prototype.searchIndex(['and'])).toEqual([ [ 0, 1 ] ]);
  });

  it('should return an array of the index of the correct object that contain the searched word', function() {
    expect(Index.prototype.searchIndex(['alice'])).toEqual([ [ 0 ] ]);
  });

  it('should return an appropriate message if searched word is not in the book', function() {
    expect(Index.prototype.searchIndex(['andela'])).toEqual([ 'Word Not Found!' ]);
  });

  it('should take an array of search terms and return the correct indices of each word', function() {
    expect(Index.prototype.searchIndex(['hole', 'andela', 'of'])).toEqual([ [ 0 ], 'Word Not Found!', [ 0, 1 ] ]);
  });
});
