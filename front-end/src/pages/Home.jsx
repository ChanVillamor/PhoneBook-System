import React, { useState } from "react";
import { CiCirclePlus, CiStar } from "react-icons/ci";
import ContactList from "../components/ContactList";
import AddContact from "../components/AddContact";
import ContactDetails from "../components/ContactDetails";


function Home() {
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const [contacts, setContacts] = useState([
    {
      name: "Abby Masarap",
      phone: "09617792463",
      email: "abbymasarap@gmail.com",
      address: "Str. to heaven, Bacoor Cavite",
      status: "Family & Friends",
      isFavorite: true,
    },
    {
      name: "Brian Cruz",
      phone: "09123456789",
      email: "briancruz@gmail.com",
      address: "Str. to paradise, Tagaytay",
      status: "None",
      isFavorite: false,
    },
    // more contacts...
  ]);

  const addNewContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <section className="flex flex-col items-center justify-center w-full max-w-4xl p-4 bg-[#ffe3d8] shadow-md rounded-lg relative">
        <div className="flex items-center justify-between w-full p-4">
          <h1 className="font-bold text-2xl">Contacts</h1>
          <button
            onClick={() => setShowAddContactModal(true)}
            className="p-2 bg-transparent rounded-full hover:bg-[#a0615c] transition duration-300"
          >
            <CiCirclePlus className="text-2xl" />
          </button>
        </div>

        <div className="flex items-center justify-between w-full p-4 gap-20">
          <input
            type="search"
            placeholder="Search"
            className="w-full p-2 bg-[#e3b6b1] text-[#bd4d41] border border-[#a0615c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a0615c] focus:border-transparent"
          />
          <button
            className="p-2 bg-transparent rounded-full hover:bg-[#a0615c] transition duration-300"
            onClick={() => setShowFavorites((prev) => !prev)}
          >
            <CiStar
              className={`text-2xl ${showFavorites ? "text-yellow-600" : ""}`}
            />
          </button>
        </div>

        <div className="flex items-start w-full p-4 gap-4">
          <ContactList
            contacts={contacts}
            setSelectedContact={setSelectedContact}
            setShowContactDetailsModal={setShowContactDetails} // Corrected here
            showFavorites={showFavorites}
          />
        </div>

        {showAddContactModal && (
          <AddContact
            onClose={() => setShowAddContactModal(false)}
            addNewContact={addNewContact}
          />
        )}

        {/* Show Contact Details Modal when selectedContact is set */}
        {showContactDetails && selectedContact && (
          <ContactDetails
            contact={selectedContact}
            onClose={() => setShowContactDetails(false)}
          />
        )}
      </section>
    </main>
  );
}

export default Home;
