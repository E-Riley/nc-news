import { useState } from "react";

export default function Collapsible({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleComments = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-comments">
      <button onClick={toggleComments}>
        {isOpen ? "hide" : "show"} comments
      </button>
      {isOpen && children}
    </div>
  );
}
