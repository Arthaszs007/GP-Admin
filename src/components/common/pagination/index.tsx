"use client";

import { action_GetCollectionCount } from "@/Lib/action/GetCollectionCount";
import { setPage } from "@/redux/feathers/collectionCount_slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Pagination = ({
  collectionName,
  pageCut,
}: {
  collectionName: string;
  pageCut: number;
}) => {
  const [totalPages, setTotalPages] = useState(0); // save and set the number of total pages to display
  const [cruPage, setCurPage] = useState(1); //to save the crupage
  const CurPage = useAppSelector(
    (state) => state.collectionCount_slice.curPage
  );
  const dispatch = useDispatch<AppDispatch>(); // define a dispatch and get from the store
  const reload = useAppSelector(
    (state) => state.collectionCount_slice.toRefresh
  ); // use to minitor re-load list
  //invoke the action and get to set totalpage
  async function GetCollectionCount() {
    const res = await action_GetCollectionCount(collectionName, pageCut);
    // setCurPage(1); // reset curPage

    //if pages didn't get, will give a default number as 0
    setTotalPages(res?.pages || 0);
  }
  const ClickButton = (page: number) => {
    // setCurPage(page); // set selected page number to save
    dispatch(setPage({ curPage: page })); // save to redux the current page
  };
  // minitor the pageCount and refresh it
  useEffect(() => {
    GetCollectionCount();
  }, []);

  // minitor to re-load the pagination display
  useEffect(() => {
    if (reload) {
      dispatch(setPage({ toRefresh: false }));
      dispatch(setPage({ curPage: 1 }));
      GetCollectionCount();
    }
  }, [reload]);

  return (
    <div className="join ">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`join-item btn btn-sm ${
            CurPage === index + 1 ? "btn-active" : "" //dymanic to give the selected state on button,use index+1 to match the curpage
          }`}
          onClick={() => ClickButton(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
