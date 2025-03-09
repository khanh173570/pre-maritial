import React from "react";
import useAuth from "../utils/hook/useAuth";
import { CUSTOMER } from "../utils/constants/role";

export const CustomerGuard = ({ children }) => {
  const { user } = useAuth();

  console.log("User:", user);
  console.log("CUSTOMER:", CUSTOMER);

  if (!user) {
    return <div>Loading...</div>; // Có thể thêm trạng thái loading nếu user chưa được load
  }

  if (Number(user.roleId) !== CUSTOMER) {
    return <div>Not found</div>;
  }

  return children;
};
