import React from "react";

// receive the ranked name and the children games info
const ModalViewRanked = ({
  name,
  games,
}: {
  name: string;
  games: Rankchildren | undefined;
}) => {
  return (
    <div>
      <dialog id="rank_view" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{name}</h3>
          <table className="table table-zebra border-collapse border border-slate-400">
            {/* head */}
            <thead>
              <tr>
                <th className="w-40 border border-slate-300">Rank</th>
                <th className="w-80 border border-slate-300">Name</th>
                <th className="w-40 border border-slate-300">Genre</th>
              </tr>
            </thead>
            <tbody>
              {games &&
                games.map((item, index) => (
                  <tr key={index}>
                    <td className="w-40 border border-slate-300">
                      {index + 1}
                    </td>
                    <td className="w-80 border border-slate-300">
                      {item.name}
                    </td>
                    <td className="w-40 border border-slate-300">
                      {item.genre}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </dialog>
    </div>
  );
};

export default ModalViewRanked;
