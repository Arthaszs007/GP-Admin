"use client";
import { action_GetGame } from "@/Lib/action/GetGame";
import { AppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import ModalEditGame from "../ModalEditGame";
import { action_SearchGames } from "@/Lib/action/Search/search_games";
import { useDispatch } from "react-redux";
import { setRefresh } from "@/redux/feathers/listRefresh_slice";

const GameList = () => {
  // const [page, setPage] = useState(1);
  const page = useAppSelector((state) => state.collectionCount_slice.curPage);
  //to save and display on page with the data
  const [data, setData] = useState<Games | undefined>(undefined);
  // to storage the game from click button
  const [game, setGame] = useState<Game>();
  //to save the state of reload list
  const reload = useAppSelector((state) => state.listRefresh_slice.toRefresh);
  //get dispatch from the redux store
  const dispatch = useDispatch<AppDispatch>();

  //invoke action to get data of current page
  async function ListLoading() {
    const res = await action_GetGame(page);
    setData(res?.data);
  }
  //invoke action to get data by click id
  async function InitialModal(gameid: string) {
    const res = await action_SearchGames("id", gameid);
    setGame(res?.data[0]);
  }
  //minitor the state to re-load the gamelist
  useEffect(() => {
    if (reload) {
      dispatch(setRefresh({ toRefresh: false }));
      ListLoading();
    }
  }, [reload]);
  //minitor the curPage ,if changed, reload data
  useEffect(() => {
    ListLoading();
  }, [page]);
  //minitor the game data,if ready to open modal
  useEffect(() => {
    const modal = document.getElementById(
      "game_edit"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
      modal.scrollTop = 0;
    }
  }, [game]);
  //open th modal
  const OpenModal = (gameid: string) => {
    InitialModal(gameid);
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra border-collapse border border-slate-400">
        {/* head */}
        <thead>
          <tr>
            <th className="w-40 border border-slate-300">ID</th>
            <th className="w-80 border border-slate-300">Name</th>
            <th className="w-40 border border-slate-300">Scores</th>
            <th className="w-40 border border-slate-300">Operation</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td className="w-40 border border-slate-300">{item.id}</td>
                <td className="w-80 border border-slate-300">{item.name}</td>
                <td className="w-40 border border-slate-300">{item.scores}</td>
                <td className="w-40 border border-slate-300">
                  <button
                    className="btn btn-ghost btn-xs text-blue-500"
                    onClick={() => OpenModal(item.id)}
                  >
                    Modify
                  </button>
                  {game && <ModalEditGame game={game} />}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameList;
