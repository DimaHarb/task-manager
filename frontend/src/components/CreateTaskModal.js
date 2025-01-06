import React, { useState, useEffect } from "react";
import "../styles/CreateTaskModal.css";
import { getTags } from "../services/tagService";
import CreateTagModal from "./CreateTagModal";

function CreateTaskModal({ onClose, columnKey, onCreateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState(""); 
  const [tags, setTags] = useState([]); 
  const [isTagModalOpen, setIsTagModalOpen] = useState(false); 

  useEffect(() => {
    async function fetchTags() {
      try {
        const fetchedTags = await getTags();
        setTags(fetchedTags);
      } catch (error) {
        console.error("Failed to fetch tags:", error.message);
      }
    }
    fetchTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedTag = tags.find((t) => t.name === tag);
    const tagColor = selectedTag ? selectedTag.color : "#ccc"; 
    const newTask = { title, description, tag, tagColor }; 
    await onCreateTask(newTask, columnKey); 
    onClose();
  };

  const handleTagCreated = async () => {
    const fetchedTags = await getTags();
    setTags(fetchedTags);
  };

  return (
    <div className="create-task-modal">
      <div className="create-task-modal-content">
        <button className="create-task-close" onClick={onClose}>
          X
        </button>
        <form className="create-task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="create-task-input"
            placeholder="Card Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="create-task-textarea"
            placeholder="Card Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <select
            className="create-task-select"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Select a Tag
            </option>
            {tags.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="create-task-create-tag-button"
            onClick={() => setIsTagModalOpen(true)}
          >
            Create a new Tag
          </button>
          <button type="submit" className="create-task-create-button">
            Create
          </button>
        </form>
      </div>
      {isTagModalOpen && (
        <CreateTagModal
          onClose={() => setIsTagModalOpen(false)}
          onTagCreated={handleTagCreated}
        />
      )}
    </div>
  );
}

export default CreateTaskModal;
