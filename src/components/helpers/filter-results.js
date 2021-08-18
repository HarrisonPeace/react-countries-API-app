/**
 * @description Filters data by a given search term and/or a region.
 * @param data = data received from the country API in (array)
 * @param search = search term provided by search from and query string (string)
 * @param region = region (asia, america etc) provided by region custome select and query string (string)
 * @Return filtered data
 */
function filterResults(data, search, region) {
  let filteredData;
  if (region && search) {
    filteredData = data
      .filter((country) => country.region.toLowerCase().includes(region))
      .filter((country) => country.name.toLowerCase().includes(search));
  } else if (region) {
    filteredData = data.filter((country) =>
      country.region.toLowerCase().includes(region)
    );
  } else if (search) {
    filteredData = data.filter((country) =>
      country.name.toLowerCase().includes(search)
    );
  } else {
    return data;
  }
  return filteredData;
}

export default filterResults;
