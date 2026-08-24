import { useState } from "react";
import { StaffAddForm } from "./AddStaffForm";

function StaffBody(){
    return (
      <main className="mx-auto max-w-6xl w-full p-6 flex flex-col gap-8">
        <StaffAddForm/>
      </main>
    )
  };
    export  {StaffBody};