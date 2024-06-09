"use client";
import { action_GetRank } from "@/Lib/action/GetRank";
import { useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import ModalViewRanked from "../modalViewRanked";

const RankedList = () => {
  const [data, setData] = useState<Rank[] | undefined>();
  const page = useAppSelector((state) => state.collectionCount_slice.curPage);
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
                <td className="w-40 border border-slate-300">
                  <button
                    className="btn btn-ghost btn-xs text-blue-500"
                    // onClick={() => OpenModal(item.id)}
                  >
                    View
                  </button>
                  <ModalViewRanked name={item.name} games={} />
                  <button
                    className="btn btn-ghost btn-xs text-blue-500"
                    // onClick={() => OpenModal(item.id)}
                  >
                    Modify
                  </button>
                  {/* {game && <ModalEditGame game={game} />} */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankedList;
