import { useState } from "react";

export default function Example({setCard}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async() => {
    console.log("Title:", title);
    console.log("content:", content);

    const res = await fetch("http://localhost:8000/create-note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({title,content,is_pinned:false,is_trashed:false,color:"bg-white"})
    });
    if (res.status !== 201) {
      alert("Something went wrong while saving the note.");
    }
    // Reset or handle save logic
    setIsExpanded(false);
    setTitle("");
    setContent("");
  };

  return (
    <div className="m-6 mx-4 lg:mx-96 bg-neutral-100 text-gray-900 rounded-lg shadow-md p-4">
      {isExpanded && (
        <input
          type="text"
          placeholder="Title"
          className="w-full text-lg font-semibold bg-transparent outline-none mb-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Take a note..."
        className="w-full text-base bg-transparent outline-none"
        value={content}
        onClick={() => setIsExpanded(true)}
        onChange={(e) => setContent(e.target.value)}
      />
      {isExpanded && (
        <div className="mt-2 text-right">
          <button
            onClick={handleSave}
            className="text-sm text-black hover:text-slate-500 shadow p-2 rounded"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
