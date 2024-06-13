// import React from "react";

// const ModalEditRanked = () => {
//   return (
//     <dialog id="rank_create" className="modal">
//       <div className="modal-box w-11/12 max-w-3xl">
//         <h3 className="font-bold text-lg">Create Ranked Top</h3>
//         <form id="create_rank" action={dispatch}>
//           <div className="flex flex-row">
//             <label className="flex form-control w-full max-w-xs">
//               <div className="label">
//                 <span className="label-text">Rank ID</span>
//               </div>
//               <input
//                 type="text"
//                 name="id"
//                 placeholder="Type here"
//                 className="input input-bordered w-full max-w-xs input-sm"
//               />
//             </label>
//             <label className="flex form-control w-full max-w-xs ml-5">
//               <div className="label">
//                 <span className="label-text">Rank Name</span>
//               </div>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Type here"
//                 className="input input-bordered w-full max-w-xs input-sm"
//               />
//             </label>
//           </div>
//           {/* hidden data, just get ids and submit */}
//           <input type="hidden" name="children" value={ids} />
//           <div className="my-3 flex flex-row">
//             <label className="flex form-control w-full max-w-xs">
//               <div className="label">
//                 <span className="label-text">Game ID</span>
//               </div>
//               <input
//                 type="search"
//                 placeholder="Type here"
//                 className="input input-bordered w-full max-w-xs input-sm"
//                 onChange={HandleInputGameID}
//               />
//             </label>
//             <button
//               className="btn btn-active btn-link pl-10 pt-12"
//               type="button"
//               onClick={AddGame}
//             >
//               Add
//             </button>
//           </div>
//           <div className="mt-3 flex flex-row flex-wrap">
//             {waitList &&
//               waitList.map((item, index) => (
//                 <div key={index} onClick={() => RemoveBadge(item)}>
//                   <BadgeButton game={item} />
//                 </div>
//               ))}
//           </div>

//           <div className="modal-action mt-4">
//             {formError && (
//               <>
//                 <p className="text-sm text-red-500 pt-5">{messageError}</p>
//               </>
//             )}
//             <SubmitButton />
//             <button type="button" className="btn" onClick={ModalClose}>
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </dialog>
//   );
// };

// export default ModalEditRanked;

// //submit button
// export const SubmitButton = () => {
//   const { pending } = useFormStatus();
//   return (
//     <>
//       <button
//         type="submit"
//         className="btn btn-accent mr-2 "
//         aria-disabled={pending}
//       >
//         Submit
//       </button>
//     </>
//   );
// };

// export const DeleteButton = () => {};
