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
  fetchError: AppError;
  loginError: AppError;
  registerError: AppError;
  login: (credentials: UserCredentials) => Promise<void>;
  register: (requestBody: UserRegisterRequestBody) => Promise<void>;
  logout: () => void;
};

const defaultState = {
  user: null,
  fetchError: null,
  loginError: null,
  registerError: null,
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
  const [fetchError, setFetchError] = useState<AppError>(null);
  const [loginError, setLoginError] = useState<AppError>(null);
  const [registerError, setRegisterError] = useState<AppError>(null);
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.IDLE
  );

  useEffect(() => {
    const fetchUser = async () =>
      UserService.me()
        .then((user) => {
          setRequestState(RequestState.SUCCEEDED);
          setFetchError(null);
          return user;
        })
        .catch((error) => {
          setRequestState(RequestState.FAILED);
          setFetchError(parseError(error));
          return null;
        });

    setRequestState(RequestState.PENDING);
    fetchUser().then((user) => setUser(user));
  }, []);

  const login = async (credentials: UserCredentials) => {
    setRequestState(RequestState.PENDING);
    const user = await UserService.login(credentials)
      .then((user) => user)
      .catch((error) => setLoginError(parseError(error)));
    setUser(user || null);
    setRequestState(user ? RequestState.SUCCEEDED : RequestState.FAILED);
  };

  const register = async (requestBody: UserRegisterRequestBody) => {
    setRequestState(RequestState.PENDING);
    const user = await UserService.register(requestBody)
      .then((user) => user)
      .catch((error) => setRegisterError(parseError(error)));
    setUser(user || null);
    setRequestState(user ? RequestState.SUCCEEDED : RequestState.FAILED);
  };

  const logout = async () => {
    UserService.logout();
    setUser(null);
    setFetchError(null);
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
        fetchError,
        loginError,
        registerError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
