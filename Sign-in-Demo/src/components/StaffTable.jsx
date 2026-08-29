import { useEffect, useState } from "react";
import { StaffAddForm } from "./AddStaffForm.jsx";
import { StaffRow } from "./StaffRows.jsx";
import { supabase } from "../../db/db.js";
import { ChevronDownIcon, ChevronUpIcon, ChevronUpDownIcon} from "@heroicons/react/24/outline";

function StaffTable(){
  const [staff, setStaff] = useState([]);  //Staff is the variable, setStaff is the function that will store in products
  const [showForm, setShowForm] = useState(false);
  const [editStaff, setEditStaff] = useState(null); 
  const [sortStaffLastName, setSortStaffLastName] = useState('none');
  const [sortStaffFirstName, setSortStaffFirstName] = useState('none');
  const [sortDepartment, setSortDepartment] = useState('none');
  const [originalStaff, setOriginalStaff] = useState([])


  async function fetchStaff() {  /// function that fetches info from the DB, used to get JSON of DB data to display in table
    try{
      const {data, error} = await supabase.from("CARECEN-Staff").select('*');
      setStaff(data);
      setOriginalStaff(data);
      console.log("fetched Staff:", data);
    } catch (err){
      console.error("Error fetching Staff:", err);
    }
  }

  useEffect(() => {
    fetchStaff();
  }, []);

 return (
    <div className="section-container flex flex-col w-full h-full gap-2 p-1 text-2xl text-white" >
      <h2 className="title-container flex allign-left px-3">Staff </h2>
      <div className="display-container flex flex-col gap-5 rounded-xl border border-white/5 bg-white/5 py-2 px-7 text-sm/6 text-white">
        <div className="button-container flex justify-between px-8">
          <div className="addButtonSpace"></div>
          <button 
            className="flex px-8 py-2 bg-neutral-500 "
            id='add-staff-button' 
            onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : 'Add Staff'}
          </button>
        </div>
        <div className="table-container overflow-x-auto overflow-y-auto ">
          <table className="whitespace-nowrap">
            <thead className="divide-y divide-white/5 gap-x-8 py-9">
              <tr>
                <th className="table-column-head">
                  <div className='th-content-container flex flex-row gap-2 text-left px-3'>
                    Last Name
                    <button className="sorting-buttons w-fit mx-auto bg-transparent" id='sort-name-button' onClick={() => {  
                        if (sortStaffLastName === 'none') {  //if its our first click, we want the logic to show for the next state, not the current state
                            const ascending = [...staff].sort((a, b) => a.staffLastName.localeCompare(b.staffLastName));
                            setStaff(ascending);
                            setSortStaffLastName('asc')
                        } else if (sortStaffLastName === 'asc') {
                            const descending = [...staff].sort((a, b) => b.staffLastName.localeCompare(a.staffLastName));
                            setStaff(descending);
                            setSortStaffLastName('desc')
                        } else if (sortStaffLastName === 'desc') {
                            setStaff(originalStaff);
                            setSortStaffLastName('none')
                        }
                    }}>
                    {sortStaffLastName === 'none' ? <ChevronUpDownIcon className="size-5"/> : sortStaffLastName === 'asc' ? <ChevronDownIcon className="size-5"/> : sortStaffLastName === 'desc' ? <ChevronUpIcon className="size-5"/>: null}
                    </button>
                  </div>
                </th>
                <th className="table-column-head">
                  <div className='th-content-container flex flex-row gap-2 px-3'>
                    First Name
                    <button className="sorting-buttons w-fit mx-auto bg-transparent" id='sort-cat-button' onClick={() => {
                        if (sortStaffFirstName === 'none') {  //if its our first click, we want the logic to show for the next state, not the current state
                            const ascending = [...staff].sort((a, b) => a.staffFirstName.localeCompare(b.staffFirstName));
                            setStaff(ascending);
                            setSortStaffFirstName('asc')
                        } else if (sortStaffFirstName === 'asc') {
                            const descending = [...staff].sort((a, b) => b.staffFirstName.localeCompare(a.staffFirstName));
                            setStaff(descending);
                            setSortStaffFirstName('desc')
                        } else if (sortStaffFirstName === 'desc') {
                            setStaff(originalStaff);
                            setSortStaffFirstName('none')
                        }
                        }}>
                        {sortStaffFirstName === 'none' ? <ChevronUpDownIcon className="size-5"/> : sortStaffFirstName === 'asc' ? <ChevronDownIcon className="size-5"/> : sortStaffFirstName === 'desc' ? <ChevronUpIcon className="size-5"/>: null}
                    </button>
                  </div>
                </th>
                <th className="table-column-head">
                  <div className='th-content-container flex flex-row gap-2 px-3'>
                    Department
                    <button className="sorting-buttons w-fit mx-auto bg-transparent" id='sort-purchaseDate-button' onClick={() => {
                        if (sortDepartment === 'none') {  //if its our first click, we want the logic to show for the next state, not the current state
                            const ascending = [...staff].sort((a, b) => a.department.localeCompare(b.department));
                            setStaff(ascending);
                            setSortDepartment('asc')
                        } else if (sortDepartment === 'asc') {
                            const descending = [...staff].sort((a, b) => b.department.localeCompare(a.department));
                            setStaff(descending);
                            setSortDepartment('desc')
                        } else if (sortDepartment === 'desc') {
                            setStaff(originalStaff);
                            setSortDepartment('none')
                        }
                    }}>
                    { sortDepartment === 'none' ? <ChevronUpDownIcon className="size-5"/> : sortDepartment === 'asc' ? <ChevronDownIcon className="size-5"/> : sortDepartment === 'desc' ? <ChevronUpIcon className="size-5"/>: null}
                    </button>
                  </div>
                </th>
                <th className="table-column-head">
                  <div className='th-content-container flex flex-row gap-2 px-3'>
                    Email
                  </div>
                </th>
                <th className="table-column-head">
                  <div className='th-content-container flex flex-row gap-2 px-3'>
                    Extension
                  </div>
                </th>
                <th className="table-column-head">
                  <div className='th-content-container flex flex-row gap-2 px-3'>
                    Direct Line
                  </div>
                </th>
                <th className="table-column-head">
                  <div className='th-content-container flex flex-row gap-2 px-3'>
                    Position
                  </div>
                </th>
                {/* buttons column */}
                <th className="table-column-head"></th>
              </tr>
            </thead>
            <tbody>
              {staff.map(s => (
                <StaffRow
                  key={s.staffID} 
                  staff={s} 
                  setEditStaff={setEditStaff} 
                  editStaff={editStaff}
                  fetchStaff={fetchStaff}
                />
              ))}
            </tbody>
          </table>
        </div>
        </div>
         < StaffAddForm
         onSuccess={fetchStaff} 
         isOpen={showForm}
         onClose={() => setShowForm(false)}
         />
    </div>
  );
};
export  {StaffTable};


