import React from "react";

function GenderCheckbox() {
  return (
    <div className="flex">
      {/*Male checckbox*/}
      <div className="form-control">
        <label className={"label gap-2 cursor-pointer"}>
          <span className="label-text">Male</span>
          <input type="checkbox" className="checkbox border-slate-900" />
        </label>
      </div>

      {/*Female checckbox*/}
      <div className="form-control">
        <label className={"label gap-2 cursor-pointer"}>
          <span className="label-text">Female </span>
          <input type="checkbox" className="checkbox border-slate-900" />
        </label>
      </div>
    </div>
  );
}

export default GenderCheckbox;
