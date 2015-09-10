function getBooks(filePath) {
  var arrObject;
  $.ajax({
    async: false,
    url: './books.json',
    dataType: 'json',
    success: function(data) {
      arrObject = data;
    }
  });
  return arrObject;
}
var books = getBooks();

function Index(){}

var objZero = books[0].title + ' ' + books[0].text;
var objOne = books[1].title + ' ' + books[1].text;
var tokenZero = objZero.toLowerCase().replace('.', '').split(' ');
var tokenOne = objOne.toLowerCase().replace(/[:,.]/g, '').split(' ');

Index.prototype.createIndex = function(filepath) {
  var invertedIndex = {};
  for(var i in tokenZero) 
    invertedIndex[tokenZero[i]] = [0];
  for(var j in tokenOne) 
    invertedIndex[tokenOne[j]] = [1];
  return invertedIndex; 
};

var arrIndex = new Index();
var getIndex = arrIndex.createIndex();

Index.prototype.searchIndex = function(terms){
  if(tokenZero.indexOf(terms) >= 0 && tokenOne.indexOf(terms) >= 0) {
    return [0, 1];
  }
  else if (tokenZero.indexOf(terms) >= 0 && tokenOne.indexOf(terms) <= 0) {
    return [0];
  }
  else if (tokenZero.indexOf(terms) <= 0 && tokenOne.indexOf(terms) >= 0) {
    return [1];
  }
  else if (tokenZero.indexOf(terms) <= 0 && tokenOne.indexOf(terms) <= 0) {
    return 'Not In Any Document';
  }
};
