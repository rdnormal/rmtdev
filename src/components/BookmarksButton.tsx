import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useRef, useState } from "react";
import useOnClickOutside from "../lib/hooks/useOnClickOutside";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useOnClickOutside([buttonRef], () => {setIsOpen(false)})


  return (
    <section>
      <button ref={buttonRef} className="bookmarks-btn" onClick={() => setIsOpen(!isOpen)}>
        Bookmarks <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover />}
    </section>
  );
}
