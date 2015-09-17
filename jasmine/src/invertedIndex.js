// get the json file contents
var getBooks = function() {
  var booksJson;
  $.ajax({
    async: false,
    url: 'books.json',
    dataType: 'json',
    success: function(response) {
      booksJson = response;
    }
  });
  return booksJson;
};
var books = getBooks();

var Index = function(){
  this.books = books;
};

Index.prototype.createIndex = function() {
  var indexObj = {},
  filePath = this.books;
  for ( var i = 0; i < filePath.length; i++ ) {
    for ( var j in filePath[i] ) {

      // tokenisation of json file contents
      var arrToken = filePath[i][j].split(' ');
      for ( var k = 0; k < arrToken.length; k++ ) {
        var strToken = arrToken[k].toLowerCase().replace(/[:,.]/g, '');

        // building the index from the tokenized words
        if ( indexObj.hasOwnProperty(strToken) ) {
          var objKey = indexObj[strToken];
          if ( parseInt(i) ) {
            var arrObj = parseInt(i);
            if ( objKey.indexOf(arrObj) < 0 ) {
              objKey.push(arrObj);
              indexObj[strToken] = objKey;
            }
          }
        } 
        else {
          indexObj[strToken] = [parseInt(i)];
        }
      }
    }
  }
  return indexObj;
};

var indexChild = new Index();
var getIndex = indexChild.createIndex();

Index.prototype.searchIndex = function(terms) {
  var searchArr = [];

  // looping through the arguments to allow for multiple words search
  for ( var i = 0; i < terms.length; i++ ) {
    if ( getIndex.hasOwnProperty(terms[i]) ) {
      searchArr.push(getIndex[terms[i]]);
    } 
    else {
      searchArr.push('Word Not Found!');
    }
  }
  return searchArr;
};
