import Link from "next/link";
import React from "react";

const SideBar = () => {
  return (
    <ul className="menu bg-base-200 w-56 mb-20">
      <li>
        <details open>
          <summary>Dashboard</summary>
          <ul>
            <li>
              <Link href="/pages/dashboard/dashboard-main">Overview</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details open>
          <summary>Game</summary>
          <ul>
            <li>
              <Link href="/pages/game/inventory">Inventory</Link>
            </li>
            <li>
              <Link href="/pages/game/game-list">List</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details open>
          <summary>Rank</summary>
          <ul>
            <li>
              <Link href="/pages/rank/rank-main">Overview</Link>
            </li>
            <li>
              <Link href="/pages/rank/rank-manage">Manage</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details open>
          <summary>News</summary>
          <ul>
            <li>
              <Link href="/pages/news/news-main">Overview</Link>
            </li>
            <li>
              <Link href="/pages/news/news-list">List</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details open>
          <summary>User</summary>
          <ul>
            <li>
              <Link href="/pages/user/user-main">Overview</Link>
            </li>
            <li>
              <Link href="/pages/user/user-manage">Manage</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details open>
          <summary>Notice</summary>
          <ul>
            <li>
              <Link href="/pages/notice/notice-list">List</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details open>
          <summary>Roots</summary>
          <ul>
            <li>
              <Link href="/pages/roots/roots-main">Overview</Link>
            </li>
            <li>
              <Link href="/pages/roots/roots-list">List</Link>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default SideBar;
