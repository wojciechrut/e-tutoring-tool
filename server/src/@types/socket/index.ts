export interface ServerToClientEvents {
  connected: (message: string) => void;
}

export interface ClientToServerEvents {
  test: (message: string) => void;
}
