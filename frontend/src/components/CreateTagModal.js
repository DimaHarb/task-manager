import React, { useState } from "react";
import "../styles/CreateTagModal.css";
import { createTag } from "../services/tagService";

function CreateTagModal({ onClose, onTagCreated }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTag({ name, color });
    onTagCreated(); 
    onClose(); 
  };

  return (
    <div className="create-tag-modal">
      <div className="create-tag-modal-content">
        <div className="create-tag-modal-header">
          <button className="create-tag-close" onClick={onClose}>X</button>
        </div>
        <form className="create-tag-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="create-tag-input"
            placeholder="Tag Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="color"
            className="create-tag-color-picker"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
          <button type="submit" className="create-tag-button">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTagModal;
