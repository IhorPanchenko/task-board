import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";
import { getRandomColor } from "../../helpers/getRandomColor";

const AddModal = ({ isOpen, onClose, setOpen, handleAddTask }) => {
  const initialTaskData = {
    id: v4(),
    title: "",
    description: "",
    priority: "",
    deadline: 0,
    image: "",
    alt: "",
    tags: [],
  };

  const [taskData, setTaskData] = useState(initialTaskData);
  const [tagTitle, setTagTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setTaskData(initialTaskData);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onload = function (e) {
        if (e.target) {
          setTaskData((prevTaskData) => ({
            ...prevTaskData,
            image: e.target.result,
          }));
        }
      };

      reader.readAsDataURL(e.target.files[0]);
      setSelectedImage(file.name);
    }
  };

  const handleAddTag = useCallback(() => {
    if (tagTitle.trim() !== "") {
      const { bg, text } = getRandomColor();
      const newTag = { title: tagTitle.trim(), bg, text };
      setTaskData({ ...taskData, tags: [...taskData.tags, newTag] });
      setTagTitle("");
    }
  }, [tagTitle]);

  const closeModal = useCallback(() => {
    setOpen(false);
    onClose();
    setSelectedImage(null);
  }, [setOpen, onClose]);

  const handleSubmit = useCallback(() => {
    handleAddTask(taskData);
    closeModal();
  }, [taskData, handleAddTask, closeModal]);

  return (
    <div
      className={`w-screen h-screen place-items-center fixed top-0 left-0 ${
        isOpen ? "grid" : "hidden"
      }`}
    >
      {/* Overlay */}
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={closeModal}
      ></div>

      {/* Modal Content */}
      <div className="lg:w-[40%] md:w-[60%] w-[90%] bg-white rounded-lg shadow-lg z-30 flex flex-col items-center gap-6 px-6 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Task</h2>

        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full h-12 px-4 outline-none rounded-md bg-gray-100 border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-12 px-4 outline-none rounded-md bg-gray-100 border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-orange-400"
        />

        <select
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
          className="w-full h-12 px-4 outline-none rounded-md bg-gray-100 border border-gray-300 text-sm focus:ring-2 focus:ring-orange-400"
        >
          <option value="" disabled>
            Priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          name="deadline"
          value={taskData.deadline || ""}
          onChange={handleChange}
          className="w-full h-12 px-4 outline-none rounded-md bg-gray-100 border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-orange-400"
        >
          <option value="" disabled>
            Select Deadline
          </option>
          <option value="15">15 mins</option>
          <option value="30">30 mins</option>
          <option value="45">45 mins</option>
          <option value="60">1 hour</option>
          <option value="90">1.5 hours</option>
          <option value="120">2 hours</option>
          <option value="180">3 hours</option>
        </select>

        <input
          type="text"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
          placeholder="Tag Title"
          className="w-full h-12 px-4 outline-none rounded-md bg-gray-100 border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-orange-400"
        />

        <button
          className="w-full rounded-md h-9 bg-orange-400 text-white font-medium mt-2"
          onClick={handleAddTag}
        >
          Add Tag
        </button>

        {/* Tags Display */}
        <div className="w-full">
          {taskData.tags && taskData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-sm font-medium">Tags:</span>
              {taskData.tags.map((tag) => (
                <div
                  key={tag.title}
                  className="inline-block px-3 py-1 text-sm font-medium rounded-md"
                  style={{ backgroundColor: tag.bg, color: tag.text }}
                >
                  {tag.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alt Text and Image Selection */}
        <div className="w-full flex sm:flex-row flex-col gap-4">
          <input
            type="text"
            name="alt"
            value={taskData.alt}
            onChange={handleChange}
            placeholder="Image Alt"
            className="w-full h-12 px-4 outline-none rounded-md bg-gray-100 border border-gray-300 text-sm font-medium focus:ring-2 focus:ring-orange-400"
          />

          <label className="w-full h-12 px-4 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-md text-sm font-medium text-gray-600 cursor-pointer">
            Select Image
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {selectedImage && (
            <div className="w-full text-sm text-gray-600 mt-2">
              <p>Selected Image: {selectedImage}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
        >
          Submit Task
        </button>
      </div>
    </div>
  );
};

export default AddModal;
