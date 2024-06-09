"use client";
import React, { useEffect, useState } from "react";
import { EErrorType, EGenre } from "@/Lib/enum";
import { useFormState, useFormStatus } from "react-dom";
import { action_CreateGame } from "@/Lib/action/CreateGame";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setRefresh } from "@/redux/feathers/listRefresh_slice";
import { setPage } from "@/redux/feathers/collectionCount_slice";

const ModalCreateGame = () => {
  //get the create function from aciton
  const [errorMessage, dispatch] = useFormState(action_CreateGame, undefined);
  //to receive the messgae from the creategame result
  const [curError, setCurError] = useState<string | undefined>("");
  //get dispatch from the redux store
  const reduxDispatch = useDispatch<AppDispatch>();
  // to check the modal wether is exist, if ture, open it
  const OpenModal = () => {
    const modal = document.getElementById(
      "game_details"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
      modal.scrollTop = 0;
    } else {
      console.error("Modal element not found");
    }
  };
  // closed the modal with the ID.
  const CloseModal = () => {
    reduxDispatch(setRefresh({ toRefresh: true }));
    reduxDispatch(setPage({ toRefresh: true }));
    //get the modal with "id" to close it
    const modal = document.getElementById(
      "game_details"
    ) as HTMLDialogElement | null;
    // get form form "id" and clean it when user close the modal and reset the error feedback
    if (modal) {
      const form = document.getElementById("create_game") as
        | HTMLFormElement
        | undefined;
      if (form) form.reset();
      setCurError("");
      modal.close();
    } else {
      console.error("Modal element not found");
    }
  };
  // only use for close button ,won't re load list
  const CloseModal_normal = () => {
    const modal = document.getElementById(
      "game_details"
    ) as HTMLDialogElement | null;
    // get form form "id" and clean it when user close the modal and reset the error feedback
    if (modal) {
      const form = document.getElementById("create_game") as
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
    if (errorMessage?.code === EErrorType.NO_ERROR) CloseModal();
  }, [errorMessage]);

  return (
    <div>
      <button className="btn btn-sm btn-accent mr-10" onClick={OpenModal}>
        Create
      </button>
      <dialog id="game_details" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-lg">Add Game</h3>
          <form id="create_game" action={dispatch}>
            <div className="flex flex-row">
              <label className="flex form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Game ID</span>
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
                  <span className="label-text">Game Name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs input-sm"
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
                />
              </label>
              <label className="form-control w-full max-w-xs ml-5">
                <div className="label">
                  <span className="label-text">Pick the Genre</span>
                </div>
                <select
                  className="select select-sm select-bordered"
                  name="genre"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Pick one
                  </option>
                  <option>{EGenre.Adventure}</option>
                  <option>{EGenre.Action}</option>
                  <option>{EGenre.Educational}</option>
                  <option>{EGenre.Fighting}</option>
                  <option>{EGenre.Horror}</option>
                  <option>{EGenre.Platformer}</option>
                  <option>{EGenre.Puzzle}</option>
                  <option>{EGenre.Racing}</option>
                  <option>{EGenre.Sandbox}</option>
                  <option>{EGenre.Shooter}</option>
                  <option>{EGenre.Simulation}</option>
                  <option>{EGenre.Sports}</option>
                  <option>{EGenre.Strategy}</option>
                  <option>{EGenre.Survival}</option>
                  <option>{EGenre.playing}</option>
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
// interface type for the button

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
        Submit
      </button>
    </>
  );
};

export default ModalCreateGame;
