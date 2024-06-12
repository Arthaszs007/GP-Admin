"use client";
import { action_CreateRanke } from "@/Lib/action/CreateRank";
import { action_SearchGames } from "@/Lib/action/Search/search_games";
import { EErrorType } from "@/Lib/enum";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const ModalCreateRanked = () => {
  //get the error from submitted form
  const [formError, dispatch] = useFormState(action_CreateRanke, undefined);

  //storage the input gameID
  const [gameID, setGameID] = useState("");

  // games waitList to display as badge label
  const [waitList, setWaitList] = useState<Games>([]);

  //storage the error to display
  const [messageError, setMessageError] = useState<string | undefined>();

  // get the ids from waitlist items and combin as string to submit
  const [ids, setIds] = useState<string>();

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
  // dymanic to storage the ids based on waitlist
  useEffect(() => {
    CombineIds();
  }, [waitList]);

  //dynamic to set the errormessage to display on screen, if no error, close the modal
  useEffect(() => {
    setMessageError(formError?.error);
    if (formError?.code === EErrorType.NO_ERROR) {
    }
  }, [formError]);
  //add game with search action, if successfully, return the game data
  async function AddGame() {
    const res = await action_SearchGames("id", gameID);

    if (res && res.data.length > 0) {
      //check whether exist same in din the waitlist
      const exist = waitList?.some((item) => item.id === res.data[0].id);

      // if the check result is false, it means no same id, and will do under
      if (!exist) {
        setWaitList([...(waitList || []), res.data[0]]); //type assertion for the arrary
        setMessageError(""); // reset error feedback
      }
      //else it means same id in waitlist, so print the error
      else setMessageError("Already in list");
    } else setMessageError("This id didn't exist"); //id exist will return a error to display
  }
  //combine the game id from waitlist
  const CombineIds = () => {
    const idsString = waitList?.map((item) => item.id).join("/"); // combin with "/" between every element
    setIds(idsString);
  };

  // when user click a badge , will remove from the waitlist based on its name,should pass to badge component to invoke by click
  const RemoveBadge = (game: Game) => {
    setWaitList(waitList?.filter((item) => item.id !== game.id));
  };

  return (
    <div>
      <button className="btn btn-sm btn-accent mr-10" onClick={ModalOpen}>
        Create
      </button>
      <dialog id="rank_create" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-lg">Create Ranked Top</h3>
          <form id="create_rank" action={dispatch}>
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
            {/* hidden data, just get ids and submit */}
            <input type="hidden" name="children" value={ids} />
            <div className="my-3 flex flex-row">
              <label className="flex form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Game ID</span>
                </div>
                <input
                  type="search"
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
            <div className="mt-3 flex flex-row flex-wrap">
              {waitList &&
                waitList.map((item, index) => (
                  <div key={index} onClick={() => RemoveBadge(item)}>
                    <BadgeButton game={item} />
                  </div>
                ))}
            </div>

            <div className="modal-action mt-4">
              {formError && (
                <>
                  <p className="text-sm text-red-500 pt-5">{messageError}</p>
                </>
              )}
              <SubmitButton />
              <button type="button" className="btn">
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ModalCreateRanked;
// badge tag with a game name,click will be remove from  current ranked
export const BadgeButton = ({ game }: { game: Game }) => {
  return (
    <div className="badge badge-success gap-2 mx-3">
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
      {game.name}
    </div>
  );
};

//submit button
export const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        type="submit"
        className="btn btn-accent mr-2 "
        aria-disabled={pending}
      >
        Submit
      </button>
    </>
  );
};
