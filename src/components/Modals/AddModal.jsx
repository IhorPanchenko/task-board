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
      <div
        className="w-full h-full bg-black opacity-70 absolute left-0 top-0 z-20"
        onClick={closeModal}
      ></div>

      <div className="lg:w-[40%] md:w-[60%] w-[90%] bg-white rounded-lg shadow-md z-50 flex flex-col items-center gap-3 px-5 py-6">
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />

        <input
          type="text"
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />

        <select
          name="priority"
          className="w-full h-12 px-2 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
          onChange={handleChange}
          value={taskData.priority}
        >
          <option value="" disabled>
            Priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="number"
          name="deadline"
          value={taskData.deadline}
          onChange={handleChange}
          placeholder="Deadline"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />

        <input
          type="text"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
          placeholder="Tag Title"
          className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm font-medium"
        />

        <button
          className="w-full rounded-md h-9 bg-slate-500 text-amber-50 font-medium"
          onClick={handleAddTag}
        >
          Add Tag
        </button>

        <div className="w-full">
          {taskData.tags && <span>Tags:</span>}
          {taskData.tags.map((tag) => (
            <div
              key={tag.title}
              className="inline-block mx-1 px-2 py-[2px] text-sm font-medium rounded-md"
              style={{ backgroundColor: tag.bg, color: tag.text }}
            >
              {tag.title}
            </div>
          ))}
        </div>

        <div className="w-full flex sm:flex-row flex-col items-center gap-4 justify-between">
          <input
            type="text"
            name="alt"
            value={taskData.alt}
            onChange={handleChange}
            placeholder="Image Alt"
            className="w-full h-12 px-3 outline-none rounded-md bg-slate-100 border border-slate-300 text-sm"
          />

          <label className="w-full h-12 px-3 flex items-center justify-center bg-slate-100 border border-slate-300 rounded-md text-sm font-medium text-slate-600 cursor-pointer">
            Select Image
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {selectedImage && (
            <div className="w-full text-sm text-slate-600 mt-2">
              <p>Selected Image: {selectedImage}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-3 rounded-md h-9 bg-orange-400 text-blue-50 font-medium"
        >
          Submit Task
        </button>
      </div>
    </div>
  );
};

export default AddModal;
