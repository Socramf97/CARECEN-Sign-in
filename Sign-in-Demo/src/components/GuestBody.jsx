import { useState } from "react";
import { LanguageSwitch } from "./LanguageSwitch";
import { GuestAddForm } from "./AddGuestForm";

function GuestBody(){
    const [isSpanish, setIsSpanish] = useState(false);

    return (
      <main className="mx-auto max-w-6xl w-full p-6 flex flex-col gap-8">
        <div className="flex justify-center">
          <LanguageSwitch isSpanish={isSpanish} onChange={setIsSpanish} />
        </div>
        <GuestAddForm isSpanish={isSpanish} />
      </main>
    )
  };
    export  {GuestBody};
