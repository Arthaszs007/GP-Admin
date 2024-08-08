"use client";
import { action_GetConfig } from "@/Lib/action/GetConfig";
import React, { useEffect, useState } from "react";

const Config = () => {
  const [config, setConfig] = useState<Config[]>();

  async function GetConfig() {
    const res = await action_GetConfig();
    setConfig(res?.data);
  }

  //initial data
  useEffect(() => {
    GetConfig();
  }, []);

  return (
    <div className=" w-[60rem] space-y-5 ">
      <p className="my-10 text-2xl font-bold">Web Default Config</p>
      <div className="flex flex-row gap-10">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pop</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs input-sm"
            defaultValue={config && config[0].pop}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Editors</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs input-sm"
            defaultValue={config && config[0].editors}
          />
        </label>
      </div>
      <div className="flex flex-row gap-10">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Upcoming</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs input-sm"
            defaultValue={config && config[0].upcome}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">News</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs input-sm"
            defaultValue={config && config[0].news}
          />
        </label>
      </div>
      <div className="flex flex-row gap-10">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Release</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs input-sm"
            defaultValue={config && config[0].release}
          />
        </label>
      </div>
      <div className="flex justify-center">
        <button className="btn btn-accent mt-[10rem] ml-[20rem]">Update</button>
      </div>
    </div>
  );
};

export default Config;
