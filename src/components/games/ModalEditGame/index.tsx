"use client";
import React, { useEffect, useRef, useState } from "react";
import { EErrorType, EGenre } from "@/Lib/enum";
import { useFormState, useFormStatus } from "react-dom";
import { action_DeleteGame } from "@/Lib/action/DeleteGame";
import { action_EditGame } from "@/Lib/action/EditGame";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setPage } from "@/redux/feathers/collectionCount_slice";
import { setRefresh } from "@/redux/feathers/listRefresh_slice";

const ModalEditGame = ({ game }: { game: Game }) => {
  //get the create function from aciton
  const [errorMessage, dispatch] = useFormState(action_EditGame, undefined);

  //to receive the messgae from the creategame result
  const [curError, setCurError] = useState<string | undefined>("");
  // build a ref to receive selected option
  const selectRef = useRef<HTMLSelectElement>(null);

  //get dispatch from the redux store
  const reduxDispatch = useDispatch<AppDispatch>();

  // closed the modal with the ID.
  const CloseModal = () => {
    //get the modal with "id" to close it
    const modal = document.getElementById(
      "game_edit"
    ) as HTMLDialogElement | null;
    setCurError("");
    // get form form "id" and clean it when user close the modal and reset the error feedback
    if (modal) {
      reduxDispatch(setPage({ toRefresh: true }));
      reduxDispatch(setRefresh({ toRefresh: true }));
      const form = document.getElementById("edit_game") as
        | HTMLFormElement
        | undefined;
      if (form) form.reset();

      modal.close();
    }
  };
  // only use for close button ,won't re load list
  const CloseModal_normal = () => {
    const modal = document.getElementById(
      "game_edit"
    ) as HTMLDialogElement | null;
    // get form form "id" and clean it when user close the modal and reset the error feedback
    if (modal) {
      const form = document.getElementById("edit_game") as
        | HTMLFormElement
        | undefined;
      if (form) form.reset();
      setCurError("");
      modal.close();
    } else {
      console.error("Modal element not found");
    }
  };
  //minitor the code of errorMessage,if it noError, will close the modal
  useEffect(() => {
    setCurError(errorMessage?.error);
    if (errorMessage?.code === EErrorType.NO_ERROR) {
      CloseModal();
    }
  }, [errorMessage]);

  // use the ref to save data for initail set
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = game.genre || "";
    }
  }, [game]);
  return (
    <div>
      <dialog id="game_edit" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-lg">Edit Game</h3>
          <form id="edit_game" action={dispatch}>
            <div className="flex flex-row">
              <label className="flex form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Game ID</span>
                </div>
                <input
                  type="text"
                  name="id"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs input-sm bg-gray-200"
                  defaultValue={game && game.id}
                  readOnly
                />
              </label>
              <label className="flex form-control w-full max-w-xs ml-5">
                <div className="label">
                  <span className="label-text">Game Name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder={"Type here"}
                  className="input input-bordered w-full max-w-xs input-sm"
                  defaultValue={game && game.name}
                />
              </label>
            </div>
            <div className="flex flex-row">
              <label className="flex form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Game Developer</span>
                </div>
                <input
                  type="text"
                  name="developer"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs input-sm"
                  defaultValue={game && game.developer}
                />
              </label>
              <label className="flex form-control w-full max-w-xs ml-5">
                <div className="label">
                  <span className="label-text">Game Release</span>
                </div>
                <input
                  type="text"
                  name="release"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs input-sm"
                  defaultValue={game && game.release}
                />
              </label>
            </div>
            <div className="flex flex-row">
              <label className="flex form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Game Image</span>
                </div>
                <input
                  type="text"
                  name="images"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs input-sm"
                  defaultValue={game && game.images}
                />
              </label>
              <label className="flex form-control w-full max-w-xs ml-5">
                <div className="label">
                  <span className="label-text">Game Platform</span>
                </div>
                <input
                  type="text"
                  name="platform"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs input-sm"
                  defaultValue={game && game.platform}
                />
              </label>
            </div>
            <div className="flex flex-row">
              <label className="flex form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Game Scores</span>
                </div>
                <input
                  type="text"
                  name="scores"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs input-sm"
                  defaultValue={game && game.scores}
                />
              </label>
              <label className="form-control w-full max-w-xs ml-5">
                <div className="label">
                  <span className="label-text">Pick the Genre</span>
                </div>
                <select
                  className="select select-sm select-bordered"
                  name="genre"
                  // defaultValue="Horror"
                  ref={selectRef}
                >
                  <option value="" disabled>
                    Pick one
                  </option>
                  <option value="Adventure">{EGenre.Adventure}</option>
                  <option value="Action">{EGenre.Action}</option>
                  <option value="Educational">{EGenre.Educational}</option>
                  <option value="Fighting">{EGenre.Fighting}</option>
                  <option value="Horror">{EGenre.Horror}</option>
                  <option value="Platformer">{EGenre.Platformer}</option>
                  <option value="Puzzle">{EGenre.Puzzle}</option>
                  <option value="Racing">{EGenre.Racing}</option>
                  <option value="Sandbox">{EGenre.Sandbox}</option>
                  <option value="Shooter">{EGenre.Shooter}</option>
                  <option value="Simulation">{EGenre.Simulation}</option>
                  <option value="Sports">{EGenre.Sports}</option>
                  <option value="Strategy">{EGenre.Strategy}</option>
                  <option value="Survival">{EGenre.Survival}</option>
                  <option value="Role-playing">{EGenre.playing}</option>
                </select>
              </label>
            </div>
            {/* description */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Type here"
                name="description"
                defaultValue={game && game.description}
              ></textarea>
            </label>

            <div className="modal-action mt-4">
              {/* error message display area */}
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errorMessage && (
                  <>
                    <p className="text-sm text-red-500">{curError}</p>
                  </>
                )}
              </div>
              <DeleteButton gameid={game.id} />
              <SubmitButton />
              <button type="button" className="btn" onClick={CloseModal_normal}>
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

//the button component to submit in form
export const SubmitButton = () => {
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

export const DeleteButton = ({ gameid }: { gameid: string }) => {
  //get dispatch from the redux store
  const reduxDispatch = useDispatch<AppDispatch>();
  // use for delete data and close modal
  const DeleteGame = async () => {
    const message = await action_DeleteGame(gameid);
    if (message?.code === EErrorType.NO_ERROR) {
      //get the modal with "id" to close it
      const modal = document.getElementById(
        "game_edit"
      ) as HTMLDialogElement | null;

      // get form form "id" and clean it when user close the modal and reset the error feedback
      if (modal) {
        reduxDispatch(setPage({ toRefresh: true }));
        reduxDispatch(setRefresh({ toRefresh: true }));
        const form = document.getElementById("edit_game") as
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

export default ModalEditGame;
