import React, { PropsWithChildren } from "react";
import { LoadingState } from "./_models/LoadingState.model";
import { Loader } from "./Loader";
import { observer } from "mobx-react-lite";

type Props = {
  loadingState?: LoadingState<any>;
  onRetry?: () => void;
};

export const LoaderObservable = observer((props: PropsWithChildren<Props>) => {
  return (
    <Loader
      isLoading={props.loadingState?.isLoading.get() ?? true}
      error={props.loadingState?.error.get()}
      onRetry={props.onRetry}
    >
      {props.children}
    </Loader>
  );
});
