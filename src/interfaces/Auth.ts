import User from "./User";

export default interface Auth {
  currentUser?: User;
  endPoint?: string;
  alertText?: string;
}
