import { useState, useEffect } from "react";
import { supabase } from "../../db/db.js";
import { Dialog, DialogPanel, DialogTitle, CloseButton } from "@headlessui/react";

const translations = {
    en: {
        title: "Sign in",
        lastName: "Last Name",
        firstName: "First Name",
        middleName: "Middle Name",
        phoneNumber: "Phone Number",
        email: "Email",
        department: "Department",
        selectDepartment: "-- Select Department --",
        submit: "Submit",
        departmentOptions: {
            None: "None",
            "Family Wellness": "Family Wellness",
            Communications: "Communications",
            Legal: "Legal",
            "Second Chance Tattoo Removal": "Second Chance Tattoo Removal",
        },
        success: "Thank you for signing in!"
    },
    es: {
        title: "Registracion",
        lastName: "Apellido",
        firstName: "Nombre",
        phoneNumber: "Número de Teléfono",
        email: "Correo Electrónico",
        department: "Departamento",
        selectDepartment: "-- Seleccione Departamento --",
        submit: "Enviar",
        departmentOptions: {
            None: "Ninguno",
            "Family Wellness": "Bienestar Familiar",
            Communications: "Comunicaciones",
            Legal: "Legal",
            "Second Chance Tatto Removal": "Programa de Tatuajes Segunda Oportunidad",
        },
        success: "Gracias por registrarse!"
    },
};


function GuestAddForm({ onSuccess, isSpanish }){
    const [guestLastName, setGuestLastName] = useState("");
    const [guestFirstName, setGuestFirstName] = useState("");
    const [departmentVisit, setDepartmentVisit] = useState("");
    const [guestPhoneNum, setGuestPhoneNum] = useState("");
    const [guestEmail, setGuestEmail] = useState("");
    const [showSuccess, setShowSuccess] = useState(false)
    const t = translations[isSpanish ? "es" : "en"];

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 5500);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);
   

    async function handleSubmit(e) {
        e.preventDefault();

        const guest = {
            visitorLastName: guestLastName,
            visitorFirstName: guestFirstName,
            department: departmentVisit,
            visitorPhoneNumber: guestPhoneNum,
            visitorEmail: guestEmail
        };

        const { error } = await supabase.from("Visitors").insert([guest]);

        if (error) {
            console.error(error);
            return;
        }

        setShowSuccess(true);


        // Optionally refresh parent table
        if (onSuccess) onSuccess();

        // Clear form fields
        setGuestLastName("");
        setGuestFirstName("");
        setDepartmentVisit("");
        setGuestPhoneNum("");
        setGuestEmail("");
    }

    const inputClasses = "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white";

    return (
        <div className="flex flex-1 items-center justify-center md:p-3 p-6">
            <div className="w-full rounded-lg border-2  bg-neutral-700 p-5 md:p-8">
                <h2 className="mb-6 text-xl md:text-2xl font-semibold text-white">{t.title}</h2>

                <form id='add-item-form' onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <fieldset className="flex flex-col gap-5">

                        <div className="flex flex-row gap-x-5">
                            <div className="flex flex-col flex-1">
                                <label className=" self-start text-md font-medium text-white" htmlFor='guest-last-name'>{t.lastName}</label>
                                <input className={inputClasses} type='text' id='input-last-name' value={guestLastName} onChange={e => setGuestLastName(e.target.value)}></input>
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="self-start text-md font-medium text-white" htmlFor='guest-first-name'>{t.firstName}</label>
                                <input className={inputClasses} type='text' id='input-first-name' value={guestFirstName} onChange={e => setGuestFirstName(e.target.value)}></input>
                            </div>
                        </div>

                        <div className="flex flex-col flex-1">
                            <label className="self-start text-md font-medium text-white" htmlFor='input-email'>{t.email}</label>
                            <input className={inputClasses} type='email' id='input-email' value={guestEmail} onChange={e => setGuestEmail(e.target.value)}></input>
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="self-start text-md font-medium text-white" htmlFor='input-phone-num'>{t.phoneNumber}</label>
                            <input className={inputClasses} type='tel' id='input-phone-num' value={guestPhoneNum} onChange={e => setGuestPhoneNum(e.target.value)}></input>
                        </div>

                        <div className="flex flex-col flex-1">
                            <label className="self-start text-md font-medium text-white" htmlFor='input-dept'>{t.department}</label>
                            <select className={inputClasses} id="input-guest-dept" value={departmentVisit} onChange={e => setDepartmentVisit(e.target.value)}>
                                <option value="">{t.selectDepartment}</option>
                                {Object.entries(t.departmentOptions).map(([value, label]) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </div>

                    </fieldset>
                    <button className=" self-center w-3xs md:w-sm mt-2 rounded-md bg-white px-4 py-2 font-semibold text-gray-900 hover:bg-gray-200" id='submit-gust-button' type="submit">{t.submit}</button>
                    <Dialog open={showSuccess} onClose={() => setShowSuccess(false)} className="relative z-50">
                        <div className="fixed inset-0 bg-black/85" aria-hidden="true" />
                        <div className="fixed inset-0 flex items-center justify-center p-6">
                            <DialogPanel className="rounded-xl bg-neutral-800 p-15 text-white text-center border-1 border-white">
                                <DialogTitle className="text-xl font-semibold">
                                    {t.success}
                                </DialogTitle>
                            </DialogPanel>
                        </div>
                    </Dialog>
                </form>
            </div>
        </div>
    );
  };
export  {GuestAddForm};
