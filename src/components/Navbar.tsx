import Link from "next/link";
import { HiPlus } from "react-icons/hi";

export default function Navbar() {
  return (
    <header className="primary-header">
      <nav className="nav">
        <div className="nav wrapper">
          <ul className="nav-list">
            <li className="nav-item">
              <Link className="nav-link" href="#">
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
              <Link className="nav-link" href="/searchWorkout">
                Exercises
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
