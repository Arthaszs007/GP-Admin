import Pagination from "@/components/common/pagination";
import SearchBar from "@/components/games/searchbar";
import ModalCreateRanked from "@/components/ranked/modalCreateRanked";
import RankedList from "@/components/ranked/rankedList";
import React from "react";

const RankMain = () => {
  return (
    <div className="mt-3">
      <div>
        <ModalCreateRanked />
      </div>
      <div className="flex mt-3">
        <RankedList />
      </div>
      <div className="flex mb-20 mt-3 justify-center">
        <Pagination collectionName={"rank"} pageCut={10} />
      </div>
    </div>
  );
};

export default RankMain;
