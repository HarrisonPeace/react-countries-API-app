function formatResults( filteredData, setTotalPages, resultsPP ) {

  let TotalPages = Math.ceil(filteredData.length / resultsPP);
  let formattedData = [];

  for (let i = 0; i < TotalPages; i++) {
    let startSlice = i * resultsPP;
    let endSlice = (i + 1) * resultsPP;
    let tempData = filteredData.slice(startSlice, endSlice);
    formattedData.push(tempData);
  }

  setTotalPages(TotalPages)
  return formattedData

}

export default formatResults;