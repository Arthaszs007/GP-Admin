import GameList from "@/components/games/gameList";
import Pagination from "@/components/common/pagination";
import React from "react";
import ModalCreateGame from "@/components/games/ModalCreateGame";
import SearchBar from "@/components/games/searchbar";

const GameInventory = () => {
  return (
    <div className="flex flex-col h-screen container mx-auto">
      {/* Add button and search bar*/}
      <div className="my-3 flex flex-row justify-between">
        {/* button to open the modal to create game */}
        <ModalCreateGame />
        <SearchBar />
      </div>
      <div className="flex">
        <GameList />
      </div>
      <div className="flex mb-20 mt-3 justify-center">
        <Pagination collectionName={"games"} pageCut={10} />
      </div>
    </div>
  );
};

export default GameInventory;
