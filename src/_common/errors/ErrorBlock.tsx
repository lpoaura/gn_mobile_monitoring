import React from "react";
import { AppError } from "./_models/appError.model";
import { errorUtils } from "./_utils/error.utils";
import { Button, View } from "react-native";
import { AText } from "../ui/text/AText";

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
      <AText>{errorUtils.getErrorMessage(props.error)}</AText>
      {props.onRetry ? (
        <Button onPress={props.onRetry} title="Réessayer" />
      ) : null}
    </View>
  );
};
