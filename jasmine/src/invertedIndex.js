// index constructor
var Index = function(){};

// method to retrieve the json file contents
Index.prototype.getBooks = function(filePath) {
  var booksJson;
  $.ajax({
    async: false,
    url: filePath,
    dataType: 'json',
    success: function(response) {
      booksJson = response;
    }
  });
  return booksJson;
};

// method to create the index from the json file contents
Index.prototype.createIndex = function(filePath) {
  var indexObj = {},
  booksArr = this.getBooks(filePath);
  for ( var i = 0; i < booksArr.length; i++ ) {
    for ( var j in booksArr[i] ) {

      // tokenisation of json file contents
      var arrToken = booksArr[i][j].split(' ');
      for ( var k = 0; k < arrToken.length; k++ ) {
        var strToken = arrToken[k].toLowerCase().replace(/[^\w\s]/g, '');

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

// method to search the index for specific word(s)
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

// new instance of Index
var indexChild = new Index();
var getIndex = indexChild.createIndex('books.json');
