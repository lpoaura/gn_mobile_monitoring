import { action, computed, observable } from "mobx";
import { AppError } from "../../errors/_models/appError.model";

export enum LoadingStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
}

export class LoadingState<TValue = void> {
  status = observable.box<LoadingStatus>(LoadingStatus.IDLE);
  error = observable.box<AppError | undefined>();
  value?: TValue;
  promise?: Promise<TValue>;

  constructor(initialState: LoadingStatus = LoadingStatus.IDLE, promise?: Promise<TValue>, value?: TValue) {
    this.status.set(initialState);
    this.promise = promise;
    this.value = value;
  }

  startLoading = action((promise?: Promise<TValue>) => {
    this.status.set(LoadingStatus.LOADING);
    this.error.set(undefined);
    this.promise = promise;
    this.value = undefined;
  });

  setError = action((error: AppError) => {
    this.status.set(LoadingStatus.IDLE);
    this.error.set(error);
  });

  setSuccess = action((value: TValue) => {
    this.value = value;
    this.status.set(LoadingStatus.SUCCEEDED);
  });

  setStatus = action((status: LoadingStatus) => {
    this.status.set(status);
  });

  isIdle = computed(() => {
    return this.status.get() === LoadingStatus.IDLE;
  });

  isLoading = computed(() => {
    return this.status.get() === LoadingStatus.LOADING;
  });

  isSucceeded = computed(() => {
    return this.status.get() === LoadingStatus.SUCCEEDED;
  });

  isSucceededOrLoading = computed(() => {
    return this.status.get() === LoadingStatus.SUCCEEDED || this.status.get() === LoadingStatus.LOADING;
  });
}
