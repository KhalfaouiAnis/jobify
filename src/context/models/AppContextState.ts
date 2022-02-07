import { ReactNode } from "react";
import User from "../../interfaces/User";
import Auth from "../../interfaces/Auth";
import HCProps from "./HCProps";

export interface AppContextState {
  isLoading?: boolean;
  showAlert?: boolean;
  alertText?: string;
  alertType?: "" | "success" | "danger" | "info" | "warning";
  displayAlert(): any;
  authUser(user: Auth): any;
  toggleSidebar(): any;
  logoutUser(): any;
  updateUser(currentUser: User): any;
  user?: User | null | undefined;
  token?: string | null;
  userLocation?: string;
  jobLocation?: string;
  showSidebar?: boolean;

  //job context
  isEditing?: boolean;
  editJobId?: string;
  position?: string;
  company?: string;
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"];
  jobType?: "full-time" | string;
  statusOptions: ["interview", "declined", "pending", "approuved"];
  status?: "pending" | string;

  // job context: get jobs
  jobs: any[];
  totalJobs: number;
  numOfPages: number;
  page: number;
  stats: any;
  monthlyApplications: [];
  search: "";
  searchStatus: "all";
  searchType: "all";
  sort: "latest";
  sortOptions: ["latest", "oldest", "a-z", "z-a"];

  getJobs(): any;
  setEditJob(id: string): any;
  editJob(): any;
  deleteJob(id: string): any;
  showStats: () => any;
  clearFilters: () => any;
  changePage: (page: number) => any;

  handleChange(obj: HCProps): any;
  clearValues(): any;
  createJob(): any;
}

export interface AppContextProps {
  children: ReactNode;
}
