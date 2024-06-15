"use client";
import { action_DeleteRank } from "@/Lib/action/DeleteRank";
import { action_EditRank } from "@/Lib/action/EditRank";
import { action_SearchGames } from "@/Lib/action/Search/search_games";
import { action_ViewRank } from "@/Lib/action/ViewRank";
import { EErrorType } from "@/Lib/enum";
import { setPage } from "@/redux/feathers/collectionCount_slice";
import { setRefresh } from "@/redux/feathers/listRefresh_slice";
import { AppDispatch } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useDispatch } from "react-redux";

const ModalEditRanked = ({ rank }: { rank: Rank }) => {
  //get the error from submitted form
  const [formError, dispatch] = useFormState(action_EditRank, undefined);

  //storage the input gameID
  const [gameID, setGameID] = useState("");

  //get redux dispatch
  const reduxDispatch = useDispatch<AppDispatch>();

  // games waitList to display as badge label
  const [waitList, setWaitList] = useState<Games>([]);

  //storage the error to display
  const [messageError, setMessageError] = useState<string | undefined>();

  // get the ids from waitlist items and combin as string to submit
  const [ids, setIds] = useState<string>("");

  //close the modal and reset the error message and form input
  const ModalClose = () => {
    //active the refresh on pagination and data list
    reduxDispatch(setRefresh({ toRefresh: true }));
    reduxDispatch(setPage({ toRefresh: true }));

    const modal = document.getElementById(
      "rank_edit"
    ) as HTMLDialogElement | null;
    // get form form "id" and clean it when user close the modal and reset the error feedback
    if (modal) {
      const form = document.getElementById("edit_rank") as
        | HTMLFormElement
        | undefined;
      if (form) form.reset();
      setMessageError("");
      setWaitList([]);
      modal.close();
    } else {
      console.error("Modal element not found");
    }
  };

  // get the input value of game id
  const HandleInputGameID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameID(e.target.value);
  };

  // initial the data from the params
  useEffect(() => {
    setIds(rank.children); //pass the data to ids
    IdstoWaitList(); // based on rank.children , get the data and push to the waitlist
  }, [rank]);

  // dymanic to storage the ids based on waitlist
  useEffect(() => {
    CombineIds();
  }, [waitList]);

  //dynamic to set the errormessage to display on screen, if no error, close the modal
  useEffect(() => {
    setMessageError(formError?.error);
    if (formError?.code === EErrorType.NO_ERROR) {
      ModalClose();
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

  // set waitlist from the ids
  async function IdstoWaitList() {
    const res = await action_ViewRank(rank.children);
    setWaitList(res?.data);
  }

  // when user click a badge , will remove from the waitlist based on its name,should pass to badge component to invoke by click
  const RemoveBadge = (game: Game) => {
    setWaitList(waitList?.filter((item) => item.id !== game.id));
  };

  return (
    <dialog id="rank_edit" className="modal">
      <div className="modal-box w-11/12 max-w-3xl">
        <h3 className="font-bold text-lg">Edit Ranked Top</h3>
        <form id="edit_rank" action={dispatch}>
          <div className="flex flex-row">
            <label className="flex form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Rank ID</span>
              </div>
              <input
                type="text"
                name="id"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs input-sm bg-gray-200"
                defaultValue={rank && rank.id}
                readOnly
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
                defaultValue={rank && rank.name}
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
            <DeleteButton rankid={rank.id} />
            <UpdateButton />
            <button type="button" className="btn" onClick={ModalClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalEditRanked;

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
export const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        type="submit"
        className="btn btn-accent mr-2 "
        aria-disabled={pending}
      >
        Update
      </button>
    </>
  );
};

export const DeleteButton = ({ rankid }: { rankid: string }) => {
  //get dispatch from the redux store
  const reduxDispatch = useDispatch<AppDispatch>();
  // use for delete data and close modal
  const DeleteGame = async () => {
    const message = await action_DeleteRank(rankid);
    if (message?.code === EErrorType.NO_ERROR) {
      //get the modal with "id" to close it
      const modal = document.getElementById(
        "rank_edit"
      ) as HTMLDialogElement | null;

      // get form form "id" and clean it when user close the modal and reset the error feedback
      if (modal) {
        reduxDispatch(setPage({ toRefresh: true }));
        reduxDispatch(setRefresh({ toRefresh: true }));
        const form = document.getElementById("edit_rank") as
          | HTMLFormElement
          | undefined;
        if (form) form.reset();

        modal.close();
      }
    }
  };
  const { pending } = useFormStatus();
  return (
    <>
      <button
        type="button"
        className="btn btn-warning mr-2 "
        aria-disabled={pending}
        onClick={DeleteGame}
      >
        Delete
      </button>
    </>
  );
};
