/**
 * @description formats data into page format - determined by page length and page number
 * @param filteredData = data received from the country API which has been passed through the filter-results function (array)
 * @param setTotalPages = function to set the TotalPages of the document - found by dividing filteredData length by results to show per page (function)
 * @param resultsPP = total results (countries) to show on each page of the website
 * @Return formatted data
 */
function formatResults(filteredData, setTotalPages, resultsPP) {
  let TotalPages = Math.ceil(filteredData.length / resultsPP);
  let formattedData = [];

  //loop through data a split into pages
  for (let i = 0; i < TotalPages; i++) {
    let startSlice = i * resultsPP;
    let endSlice = (i + 1) * resultsPP;
    let tempData = filteredData.slice(startSlice, endSlice);
    formattedData.push(tempData);
  }

  setTotalPages(TotalPages);

  return formattedData;
}

export default formatResults;
