import React, { useState } from "react";
import { MdOutlinePhone, MdEmail, MdLocationOn, MdGroup } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import EditContact from "./EditContact";
import { getStatusDotColor } from "../utils/Status";

function ContactDetails({ contact, onClose, onEditContact }) {
  const [showEditContactModal, setShowEditContactModal] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-transparent bg-opacity-30 flex justify-center items-center p-4 z-50">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-[#ffe3d8] p-6 rounded-lg shadow-lg relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={onClose}
              className="text-sm font-medium text-black"
            >
              Cancel
            </button>
            <h2 className="text-xl font-bold text-black text-center flex-1">
              Contact Details
            </h2>
            <button
              className="text-sm font-medium text-black"
              onClick={() => setShowEditContactModal(true)}
            >
              Edit
            </button>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-center mt-4">
            <div className="relative w-24 h-24">
              <img
                src="" // Optional: Replace with actual image
                alt="profile"
                className="w-24 h-24 rounded-full bg-gray-200 object-cover"
              />
              <span
                className={`absolute top-3 right-1 w-3 h-3 rounded-full border border-white ${getStatusDotColor(
                  contact.status
                )}`}
              />
            </div>

            <div className="p-4 border-[#4b1e1e] border-2 rounded-lg mt-4 bg-[#e3b6b1] w-full">
              <p className="mt-4 text-xl flex justify-between items-center flex-wrap">
                {contact.name}
                {contact.isFavorite && (
                  <CiStar className="inline-block ml-2 text-yellow-500" />
                )}
              </p>
              <p className="mt-2 flex justify-between items-center">
                {contact.phone}
                <MdOutlinePhone className="text-xl text-black" />
              </p>
              <p className="mt-2 flex justify-between items-center">
                {contact.email}
                <MdEmail className="text-xl text-black" />
              </p>
              <p className="mt-2 flex justify-between items-center">
                {contact.address}
                <MdLocationOn className="text-xl text-black" />
              </p>
              <p className="mt-2 flex justify-between items-center">
                {contact.status}
                <MdGroup className="text-xl text-black" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {showEditContactModal && (
        <EditContact
          onClose={() => setShowEditContactModal(false)}
          onEditContact={onEditContact}
          existingContact={contact}
        />
      )}
    </>
  );
}

export default ContactDetails;
