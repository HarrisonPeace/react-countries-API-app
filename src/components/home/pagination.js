import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

const queryString = require("query-string");

function Pages({ query, totalPages }) {
  //Create history reference
  let history = useHistory();

  //Create "current" page variable from query
  let { page } = query;

  //set state
  const [pageButtonsState, setPageButtonsState] = useState(null);
  const [svgButtonsState, setSvgButtonsState] = useState(null);

  /**
   * @description sets weather the arrow SVG(s) should be disabled/hidden or shown depending on the current page numbers shown
   * @useCallBack is used so that the component is not re-rendered on every mount causing an infinite loop, only updates when total Pages changes
   * @param svgArray = copy of the svgButtonsState array
   * @param pageButtonArray = copy of the pageButtonsState array
   * @Return svgArray
   */
  const setSVGButtons = useCallback(
    (svgArray, pageButtonArray) => {
      if (totalPages < 5) {
        svgArray[0].className = "disable-button";
        svgArray[1].className = "disable-button";
      } else if (pageButtonArray[0].page === 1) {
        svgArray[0].className = "disable-button";
        svgArray[1].className = "none";
      } else if (pageButtonArray[3].page !== "...") {
        svgArray[0].className = "none";
        svgArray[1].className = "disable-button";
      } else {
        svgArray[0].className = "";
        svgArray[1].className = "";
      }
      return svgArray;
    },
    [totalPages]
  );

  /**
   * @description sets pagination buttons and svg buttons on update / mount
   */
  useEffect(() => {
    //create pagination button array
    let pageButtons = [
      {
        id: "page-button-0",
        className: {},
        page,
      },
      {
        id: "page-button-1",
        className: {},
        page,
      },
      {
        id: "page-button-2",
        className: {},
        page,
      },
      {
        id: "page-button-3",
        className: {},
        page,
      },
      {
        id: "page-button-4",
        className: {},
        page,
      },
    ];

    //create svg button array
    let svgButtons = [
      {
        id: "backwards",
        className: {},
      },
      {
        id: "forewords",
        className: {},
      },
    ];

    //if there is less then 5 pages (show each page)
    if (totalPages <= 5) {
      //loop through all buttons and set there page number
      for (let i = 0; i < 5; i++) {
        if (i < totalPages) {
          pageButtons[i].page = i + 1;
          pageButtons[i].className = "";
          if (i + 1 === page) {
            //set current page class
            pageButtons[i].className = "current-page";
          }
        } else {
          //if no page hide the button
          pageButtons[i].className = "hide-button";
        }
      }
    } else {
      //if there is more then 5 pages and the current page is not in the top 4 pages
      if (page < totalPages - 4) {
        //set second last button to ""..."" and remove hover state
        pageButtons[3].page = "...";
        pageButtons[3].className = "no-hover";
        //set last button to the last page
        pageButtons[4].page = totalPages;
        //loop through remaining buttons setting the current page as item 0 and up from there
        for (let i = 0; i < 3; i++) {
          pageButtons[i].page = page + i;
          pageButtons[i].className = "";
        }
        //set button 0 as current page
        pageButtons[0].className = "current-page";
      } else {
        //if there is more then 5 pages and the current page is in the top 4 pages
        //loop through all buttons and set there page number going backwards from the last page
        for (let i = 0; i < 5; i++) {
          pageButtons[4 - i].page = totalPages - i;
          pageButtons[4 - i].className = "";
          //set button of current page
          if (pageButtons[4 - i].page === page) {
            pageButtons[4 - i].className = "current-page";
          }
        }
      }
    }
    //finally update state to be rendered to the page
    setPageButtonsState(pageButtons);
    setSvgButtonsState(setSVGButtons(svgButtons, pageButtons));
  }, [
    setPageButtonsState,
    page,
    totalPages,
    setSvgButtonsState,
    setSVGButtons,
  ]);

  /**
   * @description awaits for button container to be clicked and then sets state to update the component
   * @param e = event object
   */
  const pageContainerClick = (e) => {
    //create a deep copy of each array object
    let pageButtons = JSON.parse(JSON.stringify(pageButtonsState));
    let svgButtons = JSON.parse(JSON.stringify(svgButtonsState));

    //set page number clicked (if button and not SVG click)
    let location = parseInt(e.target.innerHTML);

    /**
     * @description sets the page buttons to be shown *in most cases
     * @param direction = either forewords or backwards depending on which svg is clicked
     */
    const setPageButtons = (direction) => {
      //set last button to last page
      pageButtons[4].page = totalPages;
      //set second last button to "..." and remove hover state
      pageButtons[3].page = "...";
      pageButtons[3].className = "no-hover";
      //loop through remaining buttons setting the current page as item 0 and up from there
      for (let i = 0; i < 3; i++) {
        //if backwards change all buttons by -1 others change all buttons by +1
        direction === "backwards"
          ? (pageButtons[i].page = pageButtons[i].page - 1)
          : (pageButtons[i].page = pageButtons[i].page + 1);
        //set button of current page if visible
        if (pageButtons[i].page === page) {
          pageButtons[i].className = "current-page";
        } else {
          pageButtons[i].className = "";
        }
      }
    };

    //only run on button click that isn't the current page or "..."
    if (
      e.target.nodeName === "BUTTON" &&
      e.target.innerHTML !== "..." &&
      location !== page
    ) {
      //push new page into history and update components
      query.page = location;
      history.push({
        pathname: "/",
        search: queryString.stringify(query),
      });
    } else if (e.target.nodeName === "svg" || e.target.nodeName === "path") {
      //else if svg or svg path click
      if (
        e.target.id === "forewords" &&
        svgButtons[1].className !== "disable-button"
      ) {
        if (pageButtons[0].page < totalPages - 5) {
          //if pages are not the top 5 pages run setPageButtons function
          setPageButtons("forewords");
        } else {
          //loop through all buttons setting the last page as the last button and going backwards from there
          for (let i = 0; i < 5; i++) {
            pageButtons[4 - i].page = totalPages - i;
            //set button of current page if visible
            if (pageButtons[4 - i].page === page) {
              pageButtons[4 - i].className = "current-page";
            } else {
              pageButtons[4 - i].className = "";
            }
          }
        }
      } else if (
        e.target.id === "backwards" &&
        svgButtons[0].className !== "disable-button"
      ) {
        if (pageButtons[0].page < totalPages - 3) {
          //if pages are not the top 3 pages run setPageButtons function
          setPageButtons("backwards");
        }
      }
    }

    //finally update state to update component
    setPageButtonsState(pageButtons);
    setSvgButtonsState(setSVGButtons(svgButtons, pageButtons));
  };

  /**
   * @description creates SVG element
   * @param className = any CSS classes to be added to the svg
   * @param id = a ID & key to be added to the svg
   * @return SVG
   */
  const createSVG = (className, id) => (
    <svg
      className={className}
      id={id}
      key={id}
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
  );

  //if there is only 1 page return (render)nothing
  if (pageButtonsState === null || totalPages <= 1) {
    return null;
  } else {
    return (
      <div onClick={(e) => pageContainerClick(e)} className="buttons-container">
        {createSVG(svgButtonsState[0].className, svgButtonsState[0].id)}
        {/* Loop through buttons array and create a jsx element for each*/}
        {pageButtonsState.map((pageButton) => (
          <button className={pageButton.className} key={pageButton.id}>
            {pageButton.page}
          </button>
        ))}
        {createSVG(svgButtonsState[1].className, svgButtonsState[1].id)}
      </div>
    );
  }
}

export default Pages;
