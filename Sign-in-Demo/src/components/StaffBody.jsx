import { useState } from "react";
import { StaffTable } from "./StaffTable";

function StaffBody(){
    return (
      <main className="mx-auto max-w-6xl w-full p-6 flex flex-col gap-8">
        <StaffTable/>
      </main>
    )
  };
    export  {StaffBody};