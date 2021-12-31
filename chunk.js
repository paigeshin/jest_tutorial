const chunkArray = (arr, len) => {
  // init chunked arr
  const chunkedArr = [];

  // Loop through arr
  arr.forEach((element) => {
    // Get last element
    const last = chunkedArr[chunkedArr.length - 1];

    // Check if last and if last length is equal to the chunk len
    if (!last || last.length === len) {
      chunkedArr.push([element]);
    } else {
      last.push(element);
    }
  });

  return chunkedArr;
};

module.exports = chunkArray;
