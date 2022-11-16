import { UserData } from "services/user";
import { RequestState } from "services/api";
import { UserCredentials, UserRegisterRequestBody } from "@types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import UserService from "../services/user";
import { AppError, parseError } from "helpers/parse-error";

type AuthContext = {
  user: UserData;
  requestState: RequestState;
  error: AppError;
  login: (credentials: UserCredentials) => Promise<void>;
  register: (requestBody: UserRegisterRequestBody) => Promise<void>;
  logout: () => void;
};

const defaultState = {
  user: null,
  error: null,
  requestState: RequestState.IDLE,
};

const AuthContext = createContext<AuthContext>(
  defaultState as unknown as AuthContext
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData>(null);
  const [error, setError] = useState<AppError>(null);
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.IDLE
  );

  useEffect(() => {
    const fetchUser = async () =>
      UserService.me(true)
        .then((user) => {
          setRequestState(RequestState.SUCCEEDED);
          return user;
        })
        .catch(() => {
          setRequestState(RequestState.FAILED);
          return null;
        });

    setRequestState(RequestState.PENDING);
    fetchUser().then((user) => setUser(user));
  }, []);

  const login = async (credentials: UserCredentials) => {
    setRequestState(RequestState.PENDING);
    const user = await UserService.login(credentials)
      .then((user) => user)
      .catch((error) => setError(parseError(error)));
    setUser(user || null);
    setRequestState(user ? RequestState.SUCCEEDED : RequestState.FAILED);
  };

  const register = async (requestBody: UserRegisterRequestBody) => {
    setRequestState(RequestState.PENDING);
    const user = await UserService.register(requestBody)
      .then((user) => user)
      .catch((error) => setError(parseError(error)));
    setUser(user || null);
    setRequestState(user ? RequestState.SUCCEEDED : RequestState.FAILED);
  };

  const logout = async () => {
    UserService.logout();
    setUser(null);
    setError(null);
    setRequestState(RequestState.SUCCEEDED);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        requestState,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
