import User from "../../interfaces/User";
import { ReactNode } from "react";
import Auth from "../../interfaces/Auth";

export interface AppContextState {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: "" | "success" | "error" | "info" | "warning";
  displayAlert(): void;
  authUser(object: Auth): void;
  toggleSidebar(): void;
  logoutUser(): void;
  user: User | null | undefined;
  token: string;
  userLocation: string;
  jobLocation: string;
  showSidebar: boolean;
}

export interface AppContextProps {
  children: ReactNode;
}
