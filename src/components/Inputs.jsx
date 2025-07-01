import { useState, useEffect, useRef } from "react";

export default function Inputs({ setCardRefresh }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const inputRef = useRef(null);

  // Collapse note when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        if (!title.trim() && !content.trim()) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [title, content]);

  const handleSave = async () => {
    if (!content.trim() && !title.trim()) {
      alert("Note cannot be empty.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in. Please sign in again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/create-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          is_pinned: false,
          color: "bg-white",
        }),
      });

      if (res.status === 201) {
        setTitle("");
        setContent("");
        setIsExpanded(false);
        setCardRefresh((prev) => !prev); // refresh notes
      } else if (res.status === 401) {
        alert("Session expired. Please sign in again.");
      } else {
        alert("Something went wrong while saving the note.");
      }
    } catch (error) {
      console.error("Save note error:", error);
      alert("Network error. Try again later.");
    }
  };

  return (
    <div
      ref={inputRef}
      className={`m-6 mx-4 lg:mx-96 bg-neutral-100 text-gray-900 rounded-lg shadow-md p-4 transition-all duration-200 ${
        isExpanded ? "min-h-[130px]" : "min-h-[56px]"
      }`}
    >
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
        type="text"
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
