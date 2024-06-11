"use client";
import React from "react";

const ModalCreateRanked = () => {
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
  return (
    <div>
      <button className="btn btn-sm btn-accent mr-10" onClick={ModalOpen}>
        Create
      </button>
      <dialog id="rank_create" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-lg">Add Game</h3>
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
            <div className="mt-5">
              <BadgeButton />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ModalCreateRanked;

export const BadgeButton = () => {
  return (
    <div
      className="badge badge-success gap-2"
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
      success
    </div>
  );
};
