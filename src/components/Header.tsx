import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";

export default function Header({ children }) {
  return (
    <header className="header">
      {children}
    </header>
  );
}

export function HeaderTop() {
  return (
    <div className="header__top">
      <Logo />
      <BookmarksButton />
    </div>
  )
}