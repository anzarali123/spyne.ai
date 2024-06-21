import React, { useState } from "react";
import Modal from "./Modal";
import { CaptionInput } from "@/lib/types";

const AddCaption = ({
  handleCaption: handleSaveCaption,
}: {
  handleCaption: (caption: CaptionInput) => Promise<void>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCaption = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleAddCaption}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Caption
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCaption}
      />
    </div>
  );
};

export default AddCaption;
