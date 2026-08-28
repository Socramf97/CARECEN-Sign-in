import { useState, useEffect } from "react";
import { supabase } from "../../db/db";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import {PencilIcon, TrashIcon,} from '@heroicons/react/24/solid'

function CheckIn(){

    const [staff, setStaff] = useState([]);  //Staff is the variable, setStaff is the function that will store in products
    const [sortDepartment, setSortDepartment] = useState('none');
    const [sortStaffActive, setSortStaffActive] = useState('none');
    const departments = ["Administration", "Family Wellness", "Communications", "Legal", "Second Chance Tattoo Removal"];
    const statusColors = { Office: 'bg-green-500', Home: 'bg-blue-500', OffSite: 'bg-yellow-500', Out: 'bg-gray-400'};
    const statusOrder = {Office: 0, OffSite: 1, Home: 2, Out: 3}

    async function fetchStaff() {  /// function that fetches info from the DB, used to get JSON of DB data to display in table
    
        const {data, error} = await supabase.from("CARECEN-Staff").select('*');
        setStaff(data);
        if (error) {
            console.error("Error fetching Staff:", error);
            return;
        }        
    } 

    useEffect(() => {
    fetchStaff();
    }, []);

    async function handleStatusChange(staffID,newStatus) {
        const {error} = await supabase.from("CARECEN-Staff").update({currentStatus: newStatus}).eq("staffID", staffID)
        if (error) {
            console.error("Error Updating Status:", error);
            return;
        }  
        fetchStaff();
    };

    

    return(
        <div className="main-container flex flex-col gap-8 p-2 text-2xl text-white" >
            {departments.map(dept => (
            <div key={dept} className={`${dept}-container flex flex-col gap-2 px-10 py-4 text-2xl text-white`}>
                <h2  className=" flex allign-left px-3"> {dept}</h2>
                    <div className="staff-container grid grid-cols-3 gap-x-20 gap-y-10  px-6 py-2 text-2xl text-white">
                        {staff
                        .filter(s => s.department === dept)
                        .sort((a,b) => statusOrder[a.currentStatus] - statusOrder[b.currentStatus])
                        .map(s =>(
                            <div key={s.staffID} className="staff-card-container flex flex-row justify-between gap-2 px-2 py-2 rounded-xl text-xl text-white bg-neutral-600" >
                                <div className="text-container flex-1 flex-col gap-2 py-1 px-2 text-xl text-left text-white">
                                    {s.staffFirstName} {s.staffLastName}
                                </div>
                                <div className="status-container flex flex-col gap-2 p-1 text-2xl text-white">
                                    <Menu>
                                        <MenuButton className="gap-2 px-1 py-1.5">
                                            <div className={`h-4 w-4 rounded-full ${statusColors[s.currentStatus]}`}></div>
                                        </MenuButton>
                                        <MenuItems 
                                        transition
                                        anchor="bottom"
                                        className="w-45 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                                        >
                                            {Object.keys(statusColors).map(status => (
                                                <MenuItem key={status}>
                                                    <button onClick={() => handleStatusChange(s.staffID, status)}
                                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-1">
                                                        <div className={`h-3 w-3 rounded-full ${statusColors[status]}`}/>
                                                        {status}
                                                    </button>
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
            ))}
        </div>
    );
};

export { CheckIn }
