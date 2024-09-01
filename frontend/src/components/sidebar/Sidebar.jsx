import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

function Sidebar() {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      {/*Search Input*/}
      <SearchInput />

      {/*Divider*/}
      <div className="divider px-3"></div>

      {/*Conversations*/}
      <Conversations />

      {/*Logout Button*/}
      <LogoutButton />
    </div>
  );
}

export default Sidebar;
