/* 
-- Below code altered from w3schools
-- I didn't use a HTML "select" element as the base so code would need to be adapted to work in a form
-- @URL: https://www.w3schools.com/HOWTO/howto_custom_select.asp */

import React, { useRef } from "react";

/**
 * @description A react function to create a return a custom select HTML object
 * @param selectOptions = an object to become the select options @object {id, placeholder, options}
 * @param selectedAction = a function to be called when a new option has been selected
 * @returns react component
 */
function CustomSelect({ selectOptions, selectedAction }) {
  const customSelect = useRef(null);
  const selectedContainer = useRef(null);
  const optionsContainer = useRef(null);

  /**
   * @description Event listener to close the custom select when a click occurs anywhere outside of it
   * @param e = event object
   */
  window.addEventListener("click", (e) => {
    if (!e.target.closest(`#${selectOptions.id}`)) {
      if (optionsContainer.current !== null) {
        optionsContainer.current.classList.add("select-hide");
      }
    } else {
      return;
    }
  });

  /**
   * @description onClick function - sets the clicked option as the selected option
   * @param e = event object
   */
  const optionClicked = (e) => {
    selectedContainer.current.innerHTML = e.target.innerHTML;
    optionsContainer.current.classList.add("select-hide");
    if (selectedAction) {
      selectedAction(e.target.innerHTML);
    }
  };

  /**
   * @description onClick function - opens and closes the select options box
   * @param e = event object
   */
  const selectedContainerClick = (e) => {
    optionsContainer.current.classList.toggle("select-hide");
  };

  return (
    <div className="custom-select" ref={customSelect} id={selectOptions.id}>
      <div
        ref={selectedContainer}
        className="select-selected"
        onClick={(e) => selectedContainerClick(e)}
      >
        {selectOptions.placeholder}
      </div>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 487 487"
      >
        <path
          d="M397.7,376.1c20.4,20.4,53.6,20.4,74,0s20.4-53.6,0-74L280.5,110.9c-20.4-20.4-53.6-20.4-74,0L15.3,302.1
		c-20.4,20.4-20.4,53.6,0,74s53.6,20.4,74,0l154.2-154.2L397.7,376.1z"
        />
      </svg>

      <div ref={optionsContainer} className="select-items select-hide">
        {selectOptions.options.map((option) => (
          <div key={option} onClick={(e) => optionClicked(e)}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomSelect;
