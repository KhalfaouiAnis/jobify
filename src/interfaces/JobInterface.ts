export default interface JobInterface {
  _id: string;
  isEditing?: boolean;
  editJobId?: string;
  position?: string;
  company?: string;
  jobLocation?: string;
  jobTypeOptions?: string[];
  jobType?: string;
  statusOptions?: string[];
  status?: string;
  createdAt?: String;
}
