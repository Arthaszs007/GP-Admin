"use client";
import { action_SearchGames } from "@/Lib/action/Search/search_games";
import React, { useEffect, useState } from "react";

const ModalCreateRanked = () => {
  //storage the input gameID
  const [gameID, setGameID] = useState("");
  // games waitList
  const [waitList, setWaitList] = useState<string[]>();

  //open the modal page
  const ModalOpen = () => {
    const modal = document.getElementById(
      "rank_create"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
      modal.scrollTop = 0;
    } else {
      console.error("Modal element not found");
    }
  };

  // get the input value of game id
  const HandleInputGameID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameID(e.target.value);
  };

  useEffect(() => {
    console.log(waitList);
  }, [waitList]);

  //add game with search action, if successfully, return the game data
  async function AddGame() {
    const res = await action_SearchGames("id", gameID);

    setWaitList([...(waitList || []), res?.data[0].id]); //type assertion for the arrary
  }

  return (
    <div>
      <button className="btn btn-sm btn-accent mr-10" onClick={ModalOpen}>
        Create
      </button>
      <dialog id="rank_create" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-lg">Create Ranked Top</h3>
          <form id="create_rank">
            <div className="flex flex-row">
              <label className="flex form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Rank ID</span>
                </div>
                <input
                  type="text"
                  name="id"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </label>
              <label className="flex form-control w-full max-w-xs ml-5">
                <div className="label">
                  <span className="label-text">Rank Name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs input-sm"
                />
              </label>
            </div>
            <div className="my-3 flex flex-row">
              <label className="flex form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Game ID</span>
                </div>
                <input
                  type="search"
                  name="gameid"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs input-sm"
                  onChange={HandleInputGameID}
                />
              </label>
              <button
                className="btn btn-active btn-link pl-10 pt-12"
                type="button"
                onClick={AddGame}
              >
                Add
              </button>
            </div>
            <div className="mt-3">
              {waitList &&
                waitList.map((item, index) => (
                  <BadgeButton key={index} name={item} />
                ))}
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ModalCreateRanked;
// badge tag with a game name,click will be remove from  current ranked
export const BadgeButton = ({ name }: { name: string }) => {
  return (
    <div
      className="badge badge-success gap-2 mx-3"
      onClick={() => {
        console.log(111);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block w-4 h-4 stroke-current"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
      name
    </div>
  );
};
