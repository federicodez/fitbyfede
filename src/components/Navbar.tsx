import Link from "next/link";
import { HiPlus } from "react-icons/hi";
import { FaUserLarge } from "react-icons/fa6";

export default function Navbar() {
  return (
    <header className="primary-header">
      <nav className="nav">
        <div className="nav wrapper">
          <ul className="nav-list">
            <li className="nav-item">
              <FaUserLarge />
              <Link className="nav-link" href="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <HiPlus />
              <Link className="nav-link" href="/">
                Start Workout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/search-workout">
                Exercises
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
