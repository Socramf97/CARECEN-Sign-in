import { useState } from "react";
import { supabase } from "../../db/db.js";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import {PencilIcon, TrashIcon,} from '@heroicons/react/24/solid'

function StaffRow({staff, setEditStaff, editStaff, fetchStaff}){
    const [staffLastName, setStaffLastName] = useState(staff.staffLastName);
    const [staffFirstName, setStaffFirstName] = useState(staff.staffFirstName);
    const [staffMiddleName, setStaffMiddleName] = useState(staff.staffMiddleName);
    const [staffDept, setStaffDept] = useState(staff.department);
    const [staffPhoneNum, setStaffPhoneNum] = useState(staff.staffPhoneNumber);
    const [staffExtension, setStaffExtension] = useState(staff.extension);
    const [staffEmail, setStaffEmail] = useState(staff.staffEmail);
    const [staffPosition, setStaffPosition] = useState(staff.staffJobTitle)
    const [staffStatus, setStaffStatus] = useState(staff.staffActive)
    const departments = ["None", "Admin", "Family Wellness", "Communications", "Legal", "Second Chance Tattoo Removal"];
    const status = ["Employed", "Volunteer", "Not Active", "Parental Leave"]

    const isEditing = editStaff != null && staff.staffID == editStaff.staffID;
    const inputStaffLastName = <input type='text' id='input-staff-lastname' value={staffLastName} onChange={e => setStaffLastName(e.target.value)}></input>
    const inputStaffFirstName = <input type='text' id='input-staff-firstname' value={staffFirstName} onChange={e => setStaffFirstName(e.target.value)}></input>
    const inputStaffMiddleName = <input type='text' id='input-staff-middlename' value={staffMiddleName} onChange={e => setStaffMiddleName(e.target.value)}></input>
    const inputStaffDepartment = <select id="input-staff-dept" value={staffDept} onChange={e => setStaffDept(e.target.value)}>
                    <option value="">-- Select Department --</option>
                    {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
    const inputStaffPhoneNum = <input type='text' id='input-staff-phoneNumber' value={staffPhoneNum} onChange={e => setStaffPhoneNum(e.target.value)}></input>
    const inputStaffEmail = <input type='text' id='input-staff-email' value={staffEmail} onChange={e => setStaffEmail(e.target.value)}></input>
    const inputStaffExtension = <input type='text' id='input-staff-extension' value={staffExtension} onChange={e => setStaffExtension(e.target.value)}></input>
    const inputStaffJobTitle = <input type='text' id='input-staff-jobtitle' value={staffPosition} onChange={e => setStaffPosition(e.target.value)}></input>
    const inputStaffStatus = <select id="input-staff-status" value={staffStatus} onChange={e => setStaffStatus(e.target.value)}>
                    <option value="">-- Select Current Status --</option>
                    {status.map((stat) => (
                            <option key={stat} value={stat}>{stat}</option>
                    ))}
                </select>

    async function handleSubmit(e) {
        e.preventDefault();

        const updatedStaff = {
            staffLastName: staffLastName,
            staffFirstName: staffFirstName,
            staffMiddleName:  staffMiddleName,
            department: staffDept,
            staffPhoneNumber: staffPhoneNum,
            staffEmail: staffEmail,
            extension: staffExtension,
            staffActive: staffStatus,
            staffJobTitle: staffPosition
        };

        const { data, error } = await supabase.from('CARECEN-Staff').update({updatedStaff}).eq('staffID', staff.staffID);
        if (error) {
            console.error("Error updating staff", error);
            return;
        }
          
        fetchStaff();  // refresh the table
        setEditStaff(null);  // exit edit mode   
    };

    async function deleteStaff() {

        const { error } = await supabase.from('CARECEN-Staff').delete().eq('staffID', staff.staffID)
        if (error) {
            console.error("Error deleting staff", error);
            return;
        }
          
        fetchStaff();  // refresh table
    }

  return (
        <tr id = "table-sections" className="divide-y divide-white/5 gap-x-6 py-5 px-3">
              <td className="py-4 px-3 text-left">{isEditing ? inputStaffLastName : staff.staffLastName}</td>
              <td className="py-4 px-3 text-left">{isEditing ? inputStaffFirstName : staff.staffFirstName}</td>
              <td className="py-4 px-3 text-left">{isEditing ? inputStaffDepartment :staff.department}</td>
              <td className="py-4 px-3 text-left">{isEditing ? inputStaffEmail :staff.staffEmail}</td>
              <td className="py-4 px-3 text-left">{isEditing ? inputStaffExtension :staff.extension}</td>
              <td className="py-4 px-3 text-left">{isEditing ? inputStaffPhoneNum :staff.staffPhoneNumber}</td>
              <td className="py-4 px-3 text-left">{isEditing ? inputStaffJobTitle :staff.staffJobTitle}</td>              
              <td className="py-4 px-3 text-left">{isEditing ? inputStaffStatus :staff.staffStatus}</td>    
              <td id="row-buttons" className="py-1 px-1 text-left"> 
                <div>
             {/*     <Menu>
                    <MenuButton 
                    className="gap-2 px-1 py-1.5">
                      <EllipsisVerticalIcon className="size-5" />
                    </MenuButton>
                    <MenuItems 
                      transition
                      anchor="right"
                      className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                      >
                      <MenuItem>
                        <button 
                        className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                        id='update-staff-button' onClick={(e) => isEditing ? handleSubmit(e) : setEditStaff(staff)}> 
                             <PencilIcon className="size-4"/>
                              {isEditing ? "Save" : "Edit"}
                        </button> 
                      </MenuItem>
                      <MenuItem>
                        <button 
                        className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                        id='delete-staff-button' onClick={() => deleteStaff()}> 
                              <PencilIcon className="size-4"/> 
                              {"Delete"} 
                        </button> 
                      </MenuItem>
                    </MenuItems>
                  </Menu> */}
                </div>
              </td>
        </tr>
  )
}; 
export  {StaffRow};