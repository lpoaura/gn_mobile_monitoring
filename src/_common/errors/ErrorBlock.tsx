import React from "react";
import { AppError } from "./_models/appError.model";
import { errorUtils } from "./_utils/error.utils";
import { Button, View } from "react-native";

type Props = {
  error?: AppError | string;
  onRetry?: () => void;
};

export const ErrorBlock = (props: Props) => {
  if (!props.error) {
    return null;
  }
  return (
    <View>
      {errorUtils.getErrorMessage(props.error)}
      {props.onRetry ? (
        <Button onPress={props.onRetry} title="Réessayer" />
      ) : null}
    </View>
  );
};
