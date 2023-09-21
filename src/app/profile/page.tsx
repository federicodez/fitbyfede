import { Avatar } from "@/components";
import Navbar from "@/components/navbar/Navbar";

const Profile = async () => {
  return (
    <Navbar>
      <section className="profile wrapper container">
        <div className="profile-card">
          <h1 className="profile-title">Profile</h1>
          <Avatar />
        </div>
      </section>
    </Navbar>
  );
};

export default Profile;
