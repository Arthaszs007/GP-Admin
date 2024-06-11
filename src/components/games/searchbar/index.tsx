"use client";
import { action_SearchGames } from "@/Lib/action/Search/search_games";
import ModalEditGame from "@/components/games/ModalEditGame";
import React, { useEffect, useState } from "react";

// main component ,receive 1 action to execute the logical
const SearchBar = () => {
  const [result, setResult] = useState<Game[]>([]); // to save the games info
  const [visible, setVisible] = useState(false); // to control the pad whether
  const [value, setValue] = useState(""); // handle and storage the input value
  const [key, setKey] = useState("id"); // handle and storage the key for search
  //invoke the async action
  async function GetResult() {
    // const res = await action(key, value);
    const res = await action_SearchGames(key, value);
    setResult(res?.data);
  }
  //minitor the receive data to set into result
  useEffect(() => {
    GetResult();
  }, [key, value]);

  //minitor the result value to set visible on resultpad
  useEffect(() => {
    if (result) setVisible(true);
    else setVisible(false);

    if (!value) setVisible(false);
  }, [result]);

  return (
    <div>
      <InputArea setValue={setValue} setKey={setKey} setVisible={setVisible} />
      {/* pass the result , key words, and isvisible to resultpad */}

      <ResultPad result={result} key={key} isVisible={visible} />
    </div>
  );
};
//search input area components, receive 2 function as set value and key
const InputArea = ({
  setValue,
  setKey,
  setVisible,
}: {
  setValue: any;
  setKey: any;
  setVisible: any;
}) => {
  //get the key value from the option changed
  const HandleKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKey(e.target.value);
  };
  // get the input value from the input area
  const HandleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  // close th result pad  after click item or click outside of input erea
  const HandleBlur = () => {
    setTimeout(() => {
      setVisible(false);
    }, 200);
  };
  return (
    <div className="flex flex-row">
      <div className="flex">
        <select
          className="select select-primary w-full select-sm max-w-xs"
          defaultValue="id"
          onChange={HandleKeyChange}
        >
          <option value="id">id</option>
          <option>name</option>
        </select>
      </div>
      <div className="flex ml-5">
        <input
          type="search"
          placeholder="Type for search"
          className="input input-bordered w-full max-w-xs input-sm"
          onChange={HandleValueChange}
          onBlur={HandleBlur}
        />
      </div>
    </div>
  );
};
// result pad component  receive a array to display as list, and a boolean arg to set visible or not
const ResultPad = ({
  result,
  isVisible,
}: {
  result: Game[];
  isVisible: boolean;
}) => {
  // to storage the game from click button
  const [game, setGame] = useState<Game>();

  //open th modal
  const OpenModal = (game: Game) => {
    setGame(game);
  };

  //minitor the game data,if ready to open modal
  useEffect(() => {
    if (!game) return;
    const modal = document.getElementById(
      "game_edit"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
      modal.scrollTop = 0;
    }
  }, [game]);
  return (
    <div>
      {isVisible && (
        <div className="fixed z-10 bg-white w-80 rounded-lg mt-2 max-h-96 overflow-y-auto shadow-lg">
          {/* ternary conditioal */}
          {result?.length > 0 ? (
            result.map((item, index) => (
              <div
                className="px-5 rounded-sm my-3 hover:bg-indigo-100"
                key={index}
                onClick={() => OpenModal(item)}
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="px-5 rounded-sm my-3">unfound</div>
          )}
        </div>
      )}
      {game && <ModalEditGame game={game} />}
    </div>
  );
};

export default SearchBar;
