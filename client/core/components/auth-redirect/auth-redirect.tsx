import React, { ReactNode } from "react";
import { useAuth } from "contexts/auth";
import { useRouter } from "next/router";
import { RequestState } from "services/api";

type AuthRedirectProps = {
  children: ReactNode;
  redirect?: "unauthorized" | "authorized";
};

export const AuthRedirect: React.FC<AuthRedirectProps> = ({
  children,
  redirect = "unauthorized",
}) => {
  const { user, requestState } = useAuth();
  const { push } = useRouter();

  if (
    requestState === RequestState.PENDING ||
    requestState === RequestState.IDLE
  ) {
    return <>Loading TODO...</>;
  }

  if (redirect === "unauthorized" && !user) {
    push("/login");
    return <>Redirecting TODO...</>;
  }

  if (redirect === "authorized" && !!user) {
    push("/profile");
    return <>Redirecting TODO...</>;
  }

  return <>{children}</>;
};
