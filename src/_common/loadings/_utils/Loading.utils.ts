import { LoadingState } from "../_models/LoadingState.model";

export const loadingUtils = {
  fromPromise<TValue = void>(
    exec: () => Promise<TValue>,
    loadingState?: LoadingState<TValue>,
  ) {
    loadingState = loadingState ?? new LoadingState<TValue>();
    if (!loadingState.isSucceededOrLoading.get()) {
      const promise = exec();
      loadingState.startLoading(promise);
      promise.then(loadingState.setSuccess, loadingState.setError);
    }
    return loadingState;
  },
};
