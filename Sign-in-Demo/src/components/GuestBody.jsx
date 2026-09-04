import { useState } from "react";
import { LanguageSwitch } from "./LanguageSwitch";
import { GuestAddForm } from "./AddGuestForm";

function GuestBody(){
    const [isSpanish, setIsSpanish] = useState(false);

    return (
      <main className="mx-auto md:max-w-6xl w-full p-2 md:p-6 flex flex-col gap-6 md:gap-8">
        <div className="flex justify-center">
          <LanguageSwitch isSpanish={isSpanish} onChange={setIsSpanish} />
        </div>
        <GuestAddForm isSpanish={isSpanish} />
      </main>
    )
  };
    export  {GuestBody};
