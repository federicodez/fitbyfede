import Link from "next/link";
import { HiPlus } from "react-icons/hi";
import { FaUserLarge } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";

const Navbar = () => {
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
              <Link className="nav-link" href="/workouts">
                Start Workout
              </Link>
            </li>
            <li className="nav-item">
              <GiMeal />
              <Link className="nav-link" href="#">
                Meals
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
