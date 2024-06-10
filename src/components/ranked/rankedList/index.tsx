"use client";
import { action_GetRank } from "@/Lib/action/GetRank";
import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import ModalViewRanked from "../modalViewRanked";
import { action_ViewRank } from "@/Lib/action/ViewRank";

const RankedList = () => {
  //  data as Rank type to be storage
  const [data, setData] = useState<Rank[] | undefined>();

  //to storage the ranked children data as name and genre
  const [children, setChildren] = useState<Rankchildren>();

  // get the current number to refresh page
  const page = useAppSelector((state) => state.collectionCount_slice.curPage);

  // invoke action to get children name and genre
  async function GetRankedChildren(ids: string) {
    const res = await action_ViewRank(ids);
    setChildren(res?.data);
  }
  // open the modal function, receive a param as ids string type
  const OpenModal = (ids: string) => {
    GetRankedChildren(ids);
  };
  //minitor the children , if it got data, open the modal
  useEffect(() => {
    const modal = document.getElementById(
      "rank_view"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
      modal.scrollTop = 0;
    }
  }, [children]);

  // re-load the data on this page
  async function ListLoadling() {
    const res = await action_GetRank(page);
    setData(res?.data);
  }

  //minitor the the Current page,if change , reload data
  useEffect(() => {
    ListLoadling();
  }, [page]);
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra border-collapse border border-slate-400">
        {/* head */}
        <thead>
          <tr>
            <th className="w-40 border border-slate-300">ID</th>
            <th className="w-80 border border-slate-300">Name</th>
            <th className="w-40 border border-slate-300">Description</th>
            <th className="w-40 border border-slate-300">Operation</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td className="w-40 border border-slate-300">{item.id}</td>
                <td className="w-80 border border-slate-300">{item.name}</td>
                <td className="w-40 border border-slate-300">
                  {item.description}
                </td>
                <td className=" w-40 border border-slate-300 ">
                  <div className="flex flex-row">
                    <button
                      className="btn btn-ghost btn-xs text-blue-500 "
                      onClick={() => OpenModal(item.children)}
                    >
                      View
                    </button>
                    <ModalViewRanked name={item.name} games={children} />
                    <button
                      className="btn btn-ghost btn-xs text-blue-500 "
                      // onClick={() => OpenModal(item.id)}
                    >
                      Modify
                    </button>
                    {/* {game && <ModalEditGame game={game} />} */}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankedList;
