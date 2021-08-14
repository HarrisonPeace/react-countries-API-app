import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

const queryString = require("query-string");

function Pages({ query, totalPages }) {
  //Create history reference
  let history = useHistory();

  let { page } = query;

  const [pageButtonsState, setPageButtonsState] = useState(null);
  const [svgButtonsState, setSvgButtonsState] = useState(null);

  // const setButtons = () => {
  //   if (totalPages <= 5) {
  //     for (let i = 0; i < 5; i++) {
  //       if (i <= totalPages) {
  //         pageButtons[i].page = i + 1;
  //         pageButtons[i].className = "";
  //         if (i + 1 === page) {
  //           pageButtons[i].className = "current-page";
  //         }
  //       } else {
  //         pageButtons[i].className = "hide-button";
  //       }
  //       svgButtons[0].className = "disable-button";
  //       svgButtons[1].className = "disable-button";
  //     }
  //   } else {
  //     if (page < totalPages - 2) {
  //       for (let i = 0; i < 5; i++) {
  //         let value;
  //         if (i === 3) value = "...";
  //         else if (i === 4) value = totalPages;
  //         else value = page + i;
  //         pageButtons[i].page = value;
  //         pageButtons[i].className = "";
  //       }
  //       pageButtons[0].className = "current-page";
  //       if (page === 1) {
  //         svgButtons[0].className = "disable-button";
  //         svgButtons[1].className = "";
  //       } else {
  //         svgButtons[0].className = "";
  //         svgButtons[1].className = "";
  //       }
  //     } else {
  //       for (let i = 0; i < 5; i++) {
  //         let value;
  //         if (i === 3) value = "...";
  //         else if (i === 4) value = 1;
  //         else value = 25 - i;
  //         pageButtons[4 - i].page = value;
  //         pageButtons[4 - i].className = "";
  //         if (pageButtons[4 - i].page === page) {
  //           pageButtons[4 - i].className = "current-page";
  //         }
  //       }
  //       svgButtons[0].className = "";
  //       svgButtons[1].className = "disable-button";
  //     }
  //   }
  // };

  const pageContainerClick = (e) => {
    let pageButtons = JSON.parse(JSON.stringify(pageButtonsState));
    let svgButtons = JSON.parse(JSON.stringify(svgButtonsState));
    let location = parseInt(e.target.innerHTML);
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
    } else if (
      e.target.nodeName === "svg" || e.target.nodeName === "path"
    ) {
      if (e.target.id === "forewords" && svgButtons[1].className !== "disable-button") {
        if (pageButtons[0].page < totalPages - 2) {
          for (let i = 0; i < 3; i++) {
              pageButtons[i].page = pageButtons[i].page + 1;
              if(pageButtons[i].page === page) {
                pageButtons[i].className = "current-page";
              } else {
                pageButtons[i].className = "";
              }
          }
        }
      } else if (svgButtons[0].className !== "disable-button"){
        if (pageButtons[0].page < totalPages - 2) {
          for (let i = 0; i < 3; i++) {
              pageButtons[i].page = pageButtons[i].page - 1;
              if(pageButtons[i].page === page) {
                pageButtons[i].className = "current-page";
              } else {
                pageButtons[i].className = "";
              }
          }
        }
      }
    }

    if(pageButtons[0].page === 1) {
      svgButtons[0].className = "disable-button";
    } else {
      svgButtons[0].className = "none";
    }

    if(pageButtons[1].page === '...') {
      svgButtons[1].className = "disable-button";
    } else {
      svgButtons[1].className = "none";
    }

    setPageButtonsState(pageButtons)
    setSvgButtonsState(svgButtons)
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
        if (i <= totalPages) {
          pageButtons[i].page = i + 1;
          pageButtons[i].className = "";
          if (i + 1 === page) {
            pageButtons[i].className = "current-page";
          }
        } else {
          pageButtons[i].className = "hide-button";
        }
        svgButtons[0].className = "disable-button";
        svgButtons[1].className = "disable-button";
      }
    } else {
      if (page < totalPages - 2) {
        for (let i = 0; i < 5; i++) {
          let value;
          if (i === 3) value = "...";
          else if (i === 4) value = totalPages;
          else value = page + i;
          pageButtons[i].page = value;
          pageButtons[i].className = "";
        }
        pageButtons[0].className = "current-page";
        if (page === 1) {
          svgButtons[0].className = "disable-button";
          svgButtons[1].className = "none";
        } else {
          svgButtons[0].className = "none";
          svgButtons[1].className = "none";
        }
      } else {
        for (let i = 0; i < 5; i++) {
          let value;
          if (i === 3) value = "...";
          else if (i === 4) value = 1;
          else value = 25 - i;
          pageButtons[4 - i].page = value;
          pageButtons[4 - i].className = "";
          if (pageButtons[4 - i].page === page) {
            pageButtons[4 - i].className = "current-page";
          }
        }
        svgButtons[0].className = "none";
        svgButtons[1].className = "disable-button";
      }
    }
    setPageButtonsState(pageButtons)
    setSvgButtonsState(svgButtons)
  }, [setPageButtonsState, page, totalPages, setSvgButtonsState]);

  if (pageButtonsState === null) {
    return null
  } else {
    return (
      <div onClick={(e) => pageContainerClick(e)} className="buttons-container">
        <svg
          className={svgButtonsState[0].className}
          id={svgButtonsState[0].id}
          key={svgButtonsState[0].id}
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
  
        <button className={pageButtonsState[0].className} key={pageButtonsState[0].id}>
          {pageButtonsState[0].page}
        </button>
        <button className={pageButtonsState[1].className} key={pageButtonsState[1].id}>
          {pageButtonsState[1].page}
        </button>
        <button className={pageButtonsState[2].className} key={pageButtonsState[2].id}>
          {pageButtonsState[2].page}
        </button>
        <button className={pageButtonsState[3].className} key={pageButtonsState[3].id}>
          {pageButtonsState[3].page}
        </button>
        <button className={pageButtonsState[4].className} key={pageButtonsState[4].id}>
          {pageButtonsState[4].page}
        </button>
  
        <svg
          className={svgButtonsState[1].className}
          id={svgButtonsState[1].id}
          key={svgButtonsState[1].id}
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
      </div>
    );
  }

}

export default Pages;
