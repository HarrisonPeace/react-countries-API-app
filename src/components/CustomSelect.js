import React, { useRef } from "react";

function CustomSelect({ selectOptions, selectedAction }) {

  const customSelect = useRef(null);
  const selectedContainer = useRef(null);
  const optionsContainer = useRef(null);

  window.addEventListener('click', (e) => {
    if(!e.target.closest(`#${selectOptions.id}`)) {
      if(optionsContainer.current !== null) {
        optionsContainer.current.classList.add("select-hide");
      }
    } else {
      return
    }
  });

      const optionClicked = (e) => {
        selectedContainer.current.innerHTML = e.target.innerHTML;
        optionsContainer.current.classList.add("select-hide");
        if(selectedAction) {
          selectedAction(e.target.innerHTML)
        }
      }

      const selectedContainerClick = (e) => {
        optionsContainer.current.classList.toggle("select-hide");
      }

  return (
    <div className="custom-select" ref={customSelect} id={selectOptions.id}>
      <div ref={selectedContainer} className="select-selected" onClick={e => selectedContainerClick(e)}>
        {selectOptions.placeholder}
      </div>
      <div ref={optionsContainer} className="select-items select-hide">
           {selectOptions.options.map((option) => (
           <div key={option} onClick={e => optionClicked(e)}>{option}</div>
         ))}
      </div>
    </div>
  );
}

export default CustomSelect;
