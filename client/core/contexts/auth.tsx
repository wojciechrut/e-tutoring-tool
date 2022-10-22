import { UserData } from "services/user";
import { RequestState } from "services/api";
import { UserCredentials } from "@types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import UserService from "../services/user";

type AuthContext = {
  user: UserData;
  requestState: RequestState;
  error: unknown;
  login: (credentials: UserCredentials) => Promise<void>;
  logout: () => void;
};

const defaultState = {
  user: null,
  error: null,
  requestState: RequestState.IDLE,
};

const AuthContext = createContext<AuthContext>(defaultState as AuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData>(null);
  const [error, setError] = useState<unknown>(null);
  const [requestState, setRequestState] = useState<RequestState>(
    RequestState.IDLE
  );

  useEffect(() => {
    const fetchUser = async () =>
      UserService.me()
        .then((user) => {
          setRequestState(RequestState.SUCCEEDED);
          setError(null);
          return user;
        })
        .catch((error) => {
          setRequestState(RequestState.FAILED);
          setError(error);
          return null;
        });

    setRequestState(RequestState.PENDING);
    fetchUser().then((user) => setUser(user));
  }, []);

  const login = async (credentials: UserCredentials) => {
    setRequestState(RequestState.PENDING);
    const user = await UserService.login(credentials)
      .then((user) => user)
      .catch((error) => setError(error));
    setUser(user || null);
    setRequestState(user ? RequestState.SUCCEEDED : RequestState.FAILED);
  };

  const logout = async () => {
    UserService.logout();
    setUser(null);
    setRequestState(RequestState.IDLE);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, requestState, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
