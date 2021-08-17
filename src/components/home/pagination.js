import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

const queryString = require("query-string");

function Pages({ query, totalPages }) {
  //Create history reference
  let history = useHistory();

  let { page } = query;

  const [pageButtonsState, setPageButtonsState] = useState(null);
  const [svgButtonsState, setSvgButtonsState] = useState(null);

  const setSVGButtons = useCallback((svgArray, pageButtonArray) => {
    if(totalPages < 5) {
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
    return svgArray
  }, [totalPages]);


  const pageContainerClick = (e) => {
    let pageButtons = JSON.parse(JSON.stringify(pageButtonsState));
    let svgButtons = JSON.parse(JSON.stringify(svgButtonsState));
    let location = parseInt(e.target.innerHTML);

    const setPageButtons = (direction) => {
      pageButtons[4].page = totalPages;
      pageButtons[3].page = "...";
      pageButtons[3].className = "no-hover";
      for (let i = 0; i < 3; i++) {
        direction === "backwards" ?
        pageButtons[i].page = pageButtons[i].page - 1
        : pageButtons[i].page = pageButtons[i].page + 1
        if (pageButtons[i].page === page) {
          pageButtons[i].className = "current-page";
        } else {
          pageButtons[i].className = "";
        }
      }
    }

    if (
      e.target.nodeName === "BUTTON" &&
      e.target.innerHTML !== "..." &&
      location !== page
    ) {
      query.page = location;
      history.push({
        pathname: "/",
        search: queryString.stringify(query),
      });
    } else if (e.target.nodeName === "svg" || e.target.nodeName === "path") {
      if (
        e.target.id === "forewords" &&
        svgButtons[1].className !== "disable-button"
      ) {
        if (pageButtons[0].page < totalPages - 5) {
          setPageButtons("forewords")
        } else {
          for (let i = 0; i < 5; i++) {
            pageButtons[4 - i].page = totalPages - i;
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
          setPageButtons("backwards")
        }
      }
    }

    setPageButtonsState(pageButtons);
    setSvgButtonsState(setSVGButtons(svgButtons, pageButtons));
  };

  useEffect(() => {
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

    if (totalPages <= 5) {
      for (let i = 0; i < 5; i++) {
        if (i < totalPages) {
          pageButtons[i].page = i + 1;
          pageButtons[i].className = "";
          if (i + 1 === page) {
            pageButtons[i].className = "current-page";
          }
        } else {
          pageButtons[i].className = "hide-button";
        }
      }
    } else {
      if (page < totalPages - 4) {
        for (let i = 0; i < 5; i++) {
          let value;
          if (i === 3) value = "...";
          else if (i === 4) value = totalPages;
          else value = page + i;
          pageButtons[i].page = value;
          if(i === 3) pageButtons[i].className = "no-hover";
          else pageButtons[i].className = "";
        }
        pageButtons[0].className = "current-page";
      } else {
        for (let i = 0; i < 5; i++) {
          pageButtons[4 - i].page = totalPages - i;
          pageButtons[4 - i].className = "";
          if (pageButtons[4 - i].page === page) {
            pageButtons[4 - i].className = "current-page";
          }
        }
      }
    }
    setPageButtonsState(pageButtons);
    setSvgButtonsState(setSVGButtons(svgButtons, pageButtons));
  }, [setPageButtonsState, page, totalPages, setSvgButtonsState, setSVGButtons]);

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

  if (pageButtonsState === null || totalPages <= 1) {
    return null;
  } else {
    return (
      <div onClick={(e) => pageContainerClick(e)} className="buttons-container">
        {createSVG(svgButtonsState[0].className, svgButtonsState[0].id)}
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
