import React, { useState } from "react";
import { IoIosContact } from "react-icons/io";
import { MdOutlinePhone, MdEmail, MdLocationOn } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { statusOptions } from "../utils/Status";


function AddContact({ onClose, onAddContact }) {
  const [statusColor, setStatusColor] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [statusLabel, setStatusLabel] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    favorite: false,
    image: null,
    status: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullData = {
      ...formData,
      status: statusLabel,
    };
    onAddContact(fullData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-[#ffe3d8] w-96 rounded-lg shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-sm font-medium text-black">
            Cancel
          </button>
          <h2 className="text-xl font-bold text-black">New Contact</h2>
          <button
            onClick={handleSubmit}
            className="text-sm font-medium text-black"
          >
            Save
          </button>
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-4">
          <label htmlFor="upload-photo" className="cursor-pointer">
            <div
              className={`w-16 h-16 rounded-full bg-[#d1a29d] flex items-center justify-center shadow-md relative`}
              style={{
                borderColor:
                  statusColor && statusColor !== "none"
                    ? statusColor
                    : "#d1a29d",
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <IoIosContact className="text-3xl text-black" />
              )}
              {/* Status indicator */}
              {statusColor && statusColor !== "none" && (
                <span
                  className="w-4 h-4 rounded-full absolute top-0 right-0 border-2 border-white"
                  style={{
                    backgroundColor: statusColor,
                  }}
                ></span>
              )}
            </div>
          </label>
          <input
            id="upload-photo"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="flex items-center bg-[#d1a29d] rounded-full px-4 py-2">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="bg-transparent w-full focus:outline-none text-black placeholder:text-[#4b1e1e]"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center bg-[#d1a29d] rounded-full px-4 py-2">
            <input
              type="tel"
              name="phone"
              placeholder="Phone No."
              className="bg-transparent w-full focus:outline-none text-black placeholder:text-[#4b1e1e]"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <MdOutlinePhone className="text-xl text-black" />
          </div>

          <div className="flex items-center bg-[#d1a29d] rounded-full px-4 py-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-transparent w-full focus:outline-none text-black placeholder:text-[#4b1e1e]"
              value={formData.email}
              onChange={handleChange}
            />
            <MdEmail className="text-xl text-black" />
          </div>

          <div className="flex items-center bg-[#d1a29d] rounded-full px-4 py-2">
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="bg-transparent w-full focus:outline-none text-black placeholder:text-[#4b1e1e]"
              value={formData.address}
              onChange={handleChange}
            />
            <MdLocationOn className="text-xl text-black" />
          </div>

          <div className="flex items-center bg-[#d1a29d] rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Add to Favorites"
              readOnly
              className="bg-transparent w-full focus:outline-none text-black placeholder:text-[#4b1e1e]"
              value={formData.favorite ? "Yes" : "No"}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  favorite: !prev.favorite,
                }))
              }
            />
            <CiStar
              className={`text-xl ${
                formData.favorite ? "text-yellow-400" : "text-black"
              }`}
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowStatus(!showStatus)}
              className="w-full px-4 py-2 bg-[#d1a29d] rounded-full text-left text-black"
            >
              {statusLabel || "Edit Status"}
              <IoMdArrowDropdown className="inline ml-2" />
            </button>

            {showStatus && (
              <ul className="absolute z-10 w-full mt-1 bg-[#ffe3d8] border border-[#a0615c] rounded-lg shadow-md">
                {statusOptions.map((status, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setStatusLabel(status.label);
                      setStatusColor(status.color);
                      setFormData((prev) => ({
                        ...prev,
                        status: status.label,
                      }));
                      setShowStatus(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#fcd6cb]"
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          status.color !== "none"
                            ? status.color
                            : "transparent",
                        border:
                          status.color === "none" ? "1px solid #000" : "none",
                      }}
                    ></span>
                    {status.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContact;
