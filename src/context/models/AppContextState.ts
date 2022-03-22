import { ReactNode } from "react";
import User from "../../interfaces/User";
import Auth from "../../interfaces/Auth";
import HCProps from "./HCProps";

export interface AppContextState {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: "" | "success" | "danger" | "info" | "warning";
  displayAlert(): any;
  authUser(user: Auth): any;
  toggleSidebar(): any;
  logoutUser(): any;
  updateUser(currentUser: User): any;
  user: User | null | undefined;
  token: string | null;
  userLocation: string;
  jobLocation?: string;
  showSidebar: boolean;

  //job context
  isEditing?: boolean;
  editJobId?: string;
  position?: string;
  company?: string;
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"];
  jobType?: "full-time" | string;
  statusOptions: ["interview", "declined", "pending", "approuved"];
  status?: "pending" | string;
  jobs: any[];
  totalJobs: number;
  numOfPages: number;
  page: number;

  getJobs(): any;
  setEditJob(id: string): any;
  editJob(): any;
  deleteJob(id: string): any;

  // Search and Sort
  search: string;
  searchStatus: string;
  searchType: string;
  sort: string;
  sortOptions: string[];
  clearFilters(): any;

  // Stats
  stats: {
    pending?: number;
    interview?: number;
    declined?: number;
  };
  monthlyApplications: [];

  showStats(): any;

  handleChange(obj: HCProps): any;
  clearValues(): any;
  createJob(): any;
}

export interface AppContextProps {
  children: ReactNode;
}
