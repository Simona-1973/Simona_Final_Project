import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useFormVisibility } from "./customHook/FormVisibility";


export default function TitleNameSection({user}) {
  const { updateUser } = useContext(UserContext);
  const { formVisibility, toggleFormVisibility } = useFormVisibility();
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");

  const firstName = user?.address?.firstname;
  const lastName = user?.address?.lastname;

  const handleNameUpdate = () => {
    if (newFirstName.trim() === "" && newLastName.trim() === "") {
      alert("Please provide at least one name to update.");
      return;
    }
    const updatedData = {
      address: {
        firstname: newFirstName.trim() !== "" ? newFirstName.trim() : firstName,
        lastname: newLastName.trim() !== "" ? newLastName.trim() : lastName,
      },
    };

    updateUser(user._id, updatedData);
    setNewFirstName("");
    setNewLastName("");
    toggleFormVisibility('name');
  };

  return (
    <div className="text-center mb-4 lg:text-left lg:mt-10 mt-10 ">
      {formVisibility.name ? (
        <div className="flex">
          <div className="h-[90px] bg-transparent w-1/2 "></div>
          <form className="h-[90px] bg-white rounded-[15px] w-1/2 text-[12px] pt-2 pr-4 pl-4 shadow-lg border-b-8 border border-black  ">
            <input
              type="text"
              className="mt-2 bg-transparent border-b border-gray-300 focus:outline-none w-full "
              placeholder="User's Name or Title"
              value={firstName + " " + lastName}
              onChange={(e) => {
                const [newFirst, newLast] = e.target.value.split(" ");
                setNewFirstName(newFirst);
                setNewLastName(newLast);
              }}
            />
            <div className="flex mt-2">
              <button className="mr-2 bg-retroRed text-white rounded-md py-1 px-4" onClick={handleNameUpdate}>Save</button>
              <button className="bg-retroBlue text-white rounded-md py-1 px-4" onClick={() => toggleFormVisibility('name')}>Delete</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex">
          <div className="h-[50px] bg-transparent w-1/2"></div>
          <div className="h-[50px] bg-white shadow-lg rounded-[15px] w-1/2 text-[12px] pt-2 border-b-8 border border-black">
            <h1
              className="text-[20px] font-bold cursor-pointer text-center"
              onClick={() => toggleFormVisibility('name')}
            >
              {firstName} {lastName}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

