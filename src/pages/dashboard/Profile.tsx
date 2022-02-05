import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import { Alert, FormRow } from "../../components/";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const {
    user,
    showAlert,
    displayAlert,
    isLoading,
    updateUser,
  } = useAppContext();

  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!email || !name || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e: any) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            value={lastName}
            handleChange={(e: any) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e: any) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e: any) => setLocation(e.target.value)}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Processing ..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
