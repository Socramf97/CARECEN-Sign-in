import { useState } from "react";
import { supabase } from "../../db/db.js";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";


function StaffAddForm({ onSuccess, isOpen, onClose}){
    const [staffLastName, setStaffLastName] = useState("");
    const [staffFirstName, setStaffFirstName] = useState("");
    const [staffMiddleName, setStaffMiddleName] = useState("");
    const [staffDept, setStaffDept] = useState("");
    const [staffPhoneNum, setStaffPhoneNum] = useState("");
    const [staffEmail, setStaffEmail] = useState("");
    const [staffPosition, setStaffPosition] = useState("")
    const [staffStatus, setStaffStatus] = useState("")
    const departments = ["None", "Administration", "Family Wellness", "Communications", "Legal", "Second Chance Tattoo Removal"];
    const status = ["Employed", "Volunteer", "Not Active", "Parental Leave"]

/* 'StaffStatus/ StaffActive' is used to keep track if staff member is currently employed,
    instead of entirely deleting the entry. NOT to be used to show if staff is on site. 
*/


    async function handleSubmit(e) {
        e.preventDefault();

        const staff = {
            staffLastName: staffLastName,
            staffFirstName: staffFirstName,
            staffMiddleName:  staffMiddleName,
            department: staffDept,
            staffPhoneNumber: staffPhoneNum,
            staffEmail: staffEmail,
            staffActive: staffStatus,
            staffJobTitle: staffPosition
        };

        const { error } = await supabase.from("CARECEN-Staff").insert([staff]);

        if (error) {
            console.error(error);
            return;
        }

        // Optionally refresh parent table
        if (onSuccess) onSuccess();

        // Clear form fields
        setStaffLastName("");
        setStaffFirstName("");
        setStaffMiddleName("");
        setStaffDept("");
        setStaffPhoneNum("");
        setStaffEmail("");
        setStaffPosition("");
        setStaffStatus("");

    }

    const inputClasses = "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white";

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        {/* Backdrop */}

        <div className="fixed inset-0 bg-black/55" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-6">
        <DialogPanel className="w-full max-w-4xl gap-5 rounded-xl border border-neutral-800 bg-neutral-800 py-2 px-7 text-sm/6 text-white">
        <DialogTitle className="text-xl font-semibold text-white p-6">Add Staff</DialogTitle>
            <div className="w-full rounded-lg border-2 bg-neutral-800 border-white-800 p-8">
                    <form id='add-item-form' onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <fieldset className="flex flex-col gap-5">

                            <div className="flex flex-row gap-x-5">
                                <div className="flex flex-col flex-1">
                                    <label className=" self-start text-md font-medium text-white" htmlFor="input-last-name">Last Name</label>
                                    <input className={inputClasses} type='text' id='input-last-name' value={staffLastName} onChange={e => setStaffLastName(e.target.value)}></input>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label className="self-start text-md font-medium text-white" htmlFor="input-first-name">First Name</label>
                                    <input className={inputClasses} type='text' id='input-first-name' value={staffFirstName} onChange={e => setStaffFirstName(e.target.value)}></input>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <label className="self-start text-md font-medium text-white" htmlFor="input-middle-name">Middle Name</label>
                                    <input className={inputClasses} type='text' id='input-middle-name' value={staffMiddleName} onChange={e => setStaffMiddleName(e.target.value)}></input>
                                </div>
                            </div>


                            <div className="flex flex-col flex-1">
                                <label className="self-start text-md font-medium text-white" htmlFor="staff-email">Email</label>
                                <input className={inputClasses} type='email' id='staff-email' value={staffEmail} onChange={e => setStaffEmail(e.target.value)}></input>
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="self-start text-md font-medium text-white" htmlFor="staff-phone-num">Phone Number</label>
                                <input className={inputClasses} type='tel' id='staff-phone-num' value={staffPhoneNum} onChange={e => setStaffPhoneNum(e.target.value)}></input>
                            </div>
                            <div className="flex flex-col flex-1">
                                <label className="self-start text-md font-medium text-white" htmlFor="staff-jobtitle">Job Title</label>
                                <input className={inputClasses} type='tel' id='staff-jobtitle' value={staffPosition} onChange={e => setStaffPosition(e.target.value)}></input>
                            </div>

                            <div className="flex flex-col flex-1">
                                <label className="self-start text-md font-medium text-white" htmlFor="staff-dept">Department</label>
                                    <select className={inputClasses} id="staff-dept" value={staffDept} onChange={e => setStaffDept(e.target.value)}>
                                        <option value="">-- Select Department --</option>
                                        {departments.map((dept) => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                            </div>

                            <div className="flex flex-col flex-1">
                                <label className="self-start text-md font-medium text-white" htmlFor="staff-status">Status</label>
                                    <select className={inputClasses} id="staff-status" value={staffStatus} onChange={e => setStaffStatus(e.target.value)}>
                                        <option value="">-- Select Status --</option>
                                        {status.map((stat) => (
                                            <option key={stat} value={stat}>{stat}</option>
                                        ))}
                                    </select>
                            </div>

                        </fieldset>
                        <button className=" self-center w-sm mt-2 rounded-md bg-white px-4 py-2 font-semibold text-gray-900 hover:bg-gray-200" id='submit-gust-button' type="submit">Submit</button>
                    </form>
                </div>
        </DialogPanel>
        </div>
        </Dialog>
    );
  };
export  {StaffAddForm};
