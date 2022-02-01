import User from "../../interfaces/User";
import { ReactNode } from "react";

export interface AppContextState {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: "" | "success" | "error" | "info" | "warning";
  displayAlert(): void;
  registerUser(user: User): void;
  user: User | null | undefined | {};
  token: string;
  userLocation: string;
  jobLocation: string;
}

export interface AppContextProps {
  children: ReactNode;
}
