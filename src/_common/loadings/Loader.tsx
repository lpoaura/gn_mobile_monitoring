import React, { PropsWithChildren, ReactNode } from "react";
import { Spinner } from "./Spinner";
import { ErrorBlock } from "../errors/ErrorBlock";
import { AppError } from "../errors/_models/appError.model";
import { View } from "react-native";

type Props = {
  isLoading: boolean;
  error?: AppError;
  onRetry?: () => void;
  spinner?: ReactNode;
};

export function Loader(props: PropsWithChildren<Props>) {
  if (props.isLoading) {
    return <>{props.spinner ?? <Spinner />}</>;
  }
  if (props.error) {
    return <ErrorBlock error={props.error} onRetry={props.onRetry} />;
  }
  return <View>{props.children}</View>;
}
