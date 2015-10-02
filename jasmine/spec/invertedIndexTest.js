var indexChild = new Index();
 
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

  it('should ensure the array is not empty', function() {
    expect(books.length).not.toEqual(0);
  });
});

describe('Populate Index', function() {
  indexChild.createIndex('books.json');
  var indexObj = indexChild.getIndex();

  it('should verify that the index is created once the JSON file has been read', function() {
    expect(indexObj).toBeDefined();
  });

  it('should ensure that index is correct', function() {
    expect(indexObj['rabbit']).toEqual([0]);
  });

  it('should ensure that index is correct', function() {
    expect(indexObj['man']).toEqual([1]);
  });
});

describe('Search Index', function() {
  it('should return an array of index of the correct objects that contain the searched word', function() {
    expect(indexChild.searchIndex('and')).toEqual([[0, 1]]);
  });

  it('should return an array of the index of the correct object that contain the searched word', function() {
    expect(indexChild.searchIndex('alice')).toEqual([[0]]);
  });

  it('should return an appropriate message if searched word is not in the book', function() {
    expect(indexChild.searchIndex('andela')).toEqual(['Word Not Found!']);
  });

  it('should take an array of search terms and return the correct indices of each word', function() {
    expect(indexChild.searchIndex('hole', 'andela', 'of')).toEqual([[0], 'Word Not Found!', [0, 1]]);
  });
});
