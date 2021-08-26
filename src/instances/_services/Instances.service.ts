import { observable } from "mobx";
import { Instance } from "../_model/Instance.model";

export class InstancesService {
  private readonly selectedInstance_ = observable.box<Instance>({
    appId: 3,
    apiUrl: "https://demo.geonature.fr/geonature/api",
  });

  get instance() {
    return this.selectedInstance_.get();
  }
}

export const instancesService = new InstancesService();
