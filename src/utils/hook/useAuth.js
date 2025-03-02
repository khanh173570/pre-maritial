import { useEffect, useReducer, useState } from "react";

// Định nghĩa reducer
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

function useAuth() {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
    }
    setIsInitialized(true);
  }, []);

  return { user: state.user, isInitialized, dispatch };
}

export default useAuth;
