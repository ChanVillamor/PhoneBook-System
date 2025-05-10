import React from "react";
import { getStatusDotColor } from "../utils/Status";


function ContactList({
  contacts,
  setShowContactDetailsModal,
  setSelectedContact,
  showFavorites,
}) {
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowContactDetailsModal(true);
  };

  const filteredContacts = showFavorites
    ? contacts.filter((contact) => contact.isFavorite)
    : contacts;

  const groupedContacts = filteredContacts.reduce((acc, contact) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});


  return (
    <section className="w-full p-4 flex flex-col gap-4">
      {Object.keys(groupedContacts).length === 0 ? (
        <p className="text-center w-full text-gray-600">
          No favorite contacts.
        </p>
      ) : (
        Object.keys(groupedContacts).map((letter) => (
          <div
            key={letter}
            className="w-full p-4 flex flex-col items-start gap-4"
          >
            <div className="flex items-center w-full gap-2">
              <h2 className="font-bold text-lg">{letter}</h2>
              <div className="flex-1 h-px bg-gray-600" />
            </div>

            {groupedContacts[letter].map((contact, index) => (
              <div
                key={index}
                onClick={() => handleContactClick(contact)}
                className="w-full flex items-center gap-4 cursor-pointer p-2 hover:bg-[#fbe9e5] rounded-lg transition"
              >
                <div className="relative w-10 h-10">
                  <img
                    src=""
                    alt="profile"
                    className="w-10 h-10 rounded-full bg-gray-200 object-cover"
                  />
                  <span
                    className={`absolute top-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${getStatusDotColor(
                      contact.status
                    )}`}
                  />
                </div>
                <div>
                  <h6 className="text-sm font-medium">{contact.name}</h6>
                  <p className="text-xs text-gray-500">{contact.phone}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </section>
  );
}

export default ContactList;
