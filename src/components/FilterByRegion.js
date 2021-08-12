import React from 'react';
import CustomSelect from "./CustomSelect";

function FilterByRegion() {
  const selectOptions = {
    id: "filter-by-region",
    placeholder: 'Filter by region',
    options: ['Africa', 'America', 'Asia', 'Europe', 'Oceania', 'Show All']
  }

  return (
    <CustomSelect selectOptions={selectOptions}/>
    );
}
  
export default FilterByRegion;