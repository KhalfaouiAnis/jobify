import User from "../interfaces/User";

interface SUTLSrops {
  user: User;
  token: string;
  location: string;
}

export const saveUserToLocalStorage = ({
  user,
  token,
  location,
}: SUTLSrops) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
  localStorage.setItem("location", location);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("location");
};

export const saveToLStorage = (data: any) => {};
export const removeFromLStorage = () => {};
