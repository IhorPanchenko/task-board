import { IoTimeOutline } from "react-icons/io5";

const Task = ({ task, provided }) => {
  const { title, description, priority, deadline, image, alt, tags } = task;

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="w-full cursor-grab bg-white flex flex-col justify-between gap-3 items-start shadow-sm rounded-xl px-3 py-4"
    >
      {image && alt && (
        <img
          src={image}
          alt={alt || "Task image"}
          className="w-full h-44 rounded-lg object-cover"
        />
      )}

      <div className="flex items-center gap-2">
        {tags.map((tag) => {
          <span
            key={tag.title}
            className="px-3 py-1 text-sm font-medium rounded-md"
          >
            {tag.title}
          </span>;
        })}
      </div>

      <div className="w-full flex items-start flex-col">
        <span className="text-sm font-medium text-[#555555]">{title}</span>
        <span className="text-sm text-gray-500">{description}</span>
      </div>

      <div className="w-full border border-dashed"></div>

      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <IoTimeOutline color={"#666666"} size={"19px"} />
          <span className="text-sm text-gray-700">{deadline} mins</span>
        </div>

        <div
          className={`w-16 rounded-full h-1 ${
            priority === "high"
              ? "bg-red-500"
              : priority === "medium"
              ? "bg-orange-500"
              : "bg-blue-500"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Task;
