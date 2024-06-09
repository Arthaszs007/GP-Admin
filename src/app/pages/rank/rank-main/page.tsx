import Pagination from "@/components/common/pagination";
import SearchBar from "@/components/games/searchbar";
import RankedList from "@/components/ranked/rankedList";
import React from "react";

const RankMain = () => {
  return (
    <div className="mt-10">
      <div className="flex">
        <RankedList />
      </div>
      <div className="flex mb-20 mt-3 justify-center">
        <Pagination collectionName={"rank"} pageCut={10} />
      </div>
    </div>
  );
};

export default RankMain;
