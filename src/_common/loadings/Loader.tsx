import React, { PropsWithChildren, ReactNode } from "react";
import { Spinner } from "./Spinner";
import { ErrorBlock } from "../errors/ErrorBlock";
import { AppError } from "../errors/_models/appError.model";
import { StyleSheet, View } from "react-native";

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
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
