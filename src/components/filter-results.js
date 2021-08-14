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
