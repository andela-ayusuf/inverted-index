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
  for (var i = 0; i < booksArr.length; i++) {
    for (var j in booksArr[i]) {

      // tokenisation of json file contents
      var arrToken = booksArr[i][j].split(' ');
      for (var k = 0; k < arrToken.length; k++) {
        var strToken = arrToken[k].toLowerCase().replace(/[^\w\s]/g, '');

        // building the index from the tokenized words
        if (indexObj.hasOwnProperty(strToken)) {
          var objKey = indexObj[strToken];
          if (parseInt(i)) {
            var arrObj = parseInt(i);
            if (objKey.indexOf(arrObj) < 0) {
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
  this.indexObj = indexObj; 
  return indexObj;
};

// method to get the index of a word
Index.prototype.getIndex = function () {
  return this.indexObj; 
};

// method to search the index for specific word(s)
Index.prototype.searchIndex = function (terms) {
  var searchArr = [];
  for (var l in arguments) {
    var params = arguments[l],
        indices = this.indexObj;
    if (indices.hasOwnProperty(params)) {
      searchArr.push(indices[params]);
    }
    else {
      searchArr.push('Word Not Found!');
    }
  }
  return searchArr;
};

