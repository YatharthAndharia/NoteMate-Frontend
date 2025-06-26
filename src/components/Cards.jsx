import { useState,useEffect } from "react";
import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { Button } from "@headlessui/react";


const initialActions=async () => {
  const res = await fetch("http://localhost:8000/get-notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
  });

  if (res.status !== 200) {
    alert("Something went wrong while saving the note.");
  }
  const data=await res.json();
  console.log(data.notes[0]);
  
  const actions = data.notes.map(note => ({
    title: note[2],
    href: '#',
    content: note[3],
    color: note[6] || 'bg-white',
  }));
  console.log(actions);
  
  return actions;
}
// const initialActions = [
//   {
//     title: 'Request time off',
//     href: '#',
//     icon: ClockIcon,
//     iconForeground: 'text-teal-700',
//     iconBackground: 'bg-teal-50',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     color: 'bg-white',
//   },
//   {
//     title: 'Benefits',
//     href: '#',
//     icon: CheckBadgeIcon,
//     iconForeground: 'text-purple-700',
//     iconBackground: 'bg-purple-50',
//     content: 'Hi Hello',
//     color: 'bg-white',
//   },
//   {
//     title: 'Schedule a one-on-one',
//     href: '#',
//     icon: UsersIcon,
//     iconForeground: 'text-sky-700',
//     iconBackground: 'bg-sky-50',
//     content: 'Hey',
//     color: 'bg-white',
//   },
//   {
//     title: 'Payroll',
//     href: '#',
//     icon: BanknotesIcon,
//     iconForeground: 'text-yellow-700',
//     iconBackground: 'bg-yellow-50',
//     content: 'Hey',
//     color: 'bg-white',
//   },
//   {
//     title: 'Submit an expense',
//     href: '#',
//     icon: ReceiptRefundIcon,
//     iconForeground: 'text-rose-700',
//     iconBackground: 'bg-rose-50',
//     content: 'Hey',
//     color: 'bg-white',
//   },
//   {
//     title: 'Training',
//     href: '#',
//     icon: AcademicCapIcon,
//     iconForeground: 'text-indigo-700',
//     iconBackground: 'bg-indigo-50',
//     content: 'Hiiiiii',
//     color: 'bg-white',
//   },
  
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example({search,setSearch}) {
    
    
  const [actions, setActions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempTitle, setTempTitle] = useState('');
  const [tempContent, setTempContent] = useState('');
  const [tempColor, setTempColor] = useState('');

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const res = await fetch("http://localhost:8000/get-notes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (res.status !== 200) {
          throw new Error("Something went wrong while fetching the notes.");
        }

        const data = await res.json();
        // console.log(data.notes[0]);

        const actions = data.notes.map(note => ({
          title: note[2],
          href: '#',
          icon: CheckBadgeIcon,
          iconForeground: 'text-purple-700',
          iconBackground: 'bg-purple-50',
          content: note[3],
          color: note[6] || 'bg-white',
        }));
        // console.log(actions);

        setActions(actions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActions();
  }, []);

  const colorOptions = [
    'bg-white',
    'bg-red-100',
    'bg-yellow-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-purple-100',
  ];

  const handleEdit = (index) => {
    setEditingIndex(index);
    setTempTitle(actions[index].title);
    setTempContent(actions[index].content);
    setTempColor(actions[index].color || 'bg-white');
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updated = [...actions];
      updated[editingIndex] = {
        ...updated[editingIndex],
        title: tempTitle,
        content: tempContent,
        color: tempColor,
      };
      setActions(updated);
      setEditingIndex(null);
    }
  };

  return (
    <>
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white sm:grid sm:grid-cols-3 sm:gap-px sm:divide-y-0 m-16">
      {actions
            .filter(action => {
                if (!search) return true;
              
                // Escape special regex characters except * and ?
                const escaped = search.replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&');
                
                // Replace wildcards with regex equivalents
                const pattern = escaped.replace(/\*/g, '.*').replace(/\?/g, '.');
                const regex = new RegExp(pattern, 'i'); // 'i' for case-insensitive
              
                return regex.test(action.title) || regex.test(action.content);
              })
        .map((action, index) => (
        <div
          key={index}
          className={classNames(
            action.color || 'bg-white',
            'relative group p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 m-4 rounded shadow'
          )}
        >
          {editingIndex === index ? (
            <div className="text-gray-500 rounded-lg">
              <input
                type="text"
                className="w-full text-lg font-semibold bg-transparent outline-none mb-1"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
              />
              <input
                type="text"
                className="w-full text-base bg-transparent outline-none"
                value={tempContent}
                onChange={(e) => setTempContent(e.target.value)}
              />
              <div className="flex space-x-2 mt-2">
                {colorOptions.map((color, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-6 rounded-full cursor-pointer border-2 ${color} ${
                      tempColor === color ? 'border-black' : 'border-transparent'
                    }`}
                    onClick={() => setTempColor(color)}
                  />
                ))}
              </div>
              <div className="mt-2 text-right">
                <button
                  onClick={handleSave}
                  className="text-sm text-black hover:text-slate-500 shadow p-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div onClick={() => handleEdit(index)} className="cursor-pointer">
              <h3 className="text-lg font-medium">{action.title}</h3>
              <p className="mt-2 text-sm text-gray-700">
                {action.content.length > 20
                  ? action.content.substring(0, 20) + '...'
                  : action.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
    {search && (
        <div className="text-center text-gray-800">
            <Button onClick={()=>{setSearch(null)}} className='rounded shadow text-gray-500 p-2 px-4 cursor-pointer bg-gray-100 hover:bg-gray-200'>
                Clear Search
            </Button>
        </div>
    )}
    </>
  );
}
