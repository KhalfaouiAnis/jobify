import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing, Auth, Error, ProtectedRoute } from "./pages";
import {
  AddJob,
  AllJobs,
  Profile,
  Stats,
  SharedLayout,
} from "./pages/dashboard";
import ConfirmDialog from "./components/notifications/ConfirmDialog";
import useConfirm from "./hooks/useConfirm";

function App() {
  const { confirm } = useConfirm();
  const [message, setMessage] = useState("");

  const showConfirm = async () => {
    const isConfirmed = await confirm("Do you confirm your choice?");

    if (isConfirmed) {
      setMessage("Confirmed!");
    } else {
      setMessage("Declined.");
    }
  };

  return (
    <BrowserRouter>
      {/* <div className="app">
        <div>
          <button className="portal-btn" onClick={showConfirm}>
            Show confirm
          </button>
        </div>
        <p>{message}</p>
      </div>
      <ConfirmDialog /> */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
