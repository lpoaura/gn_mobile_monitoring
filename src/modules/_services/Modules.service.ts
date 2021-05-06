import { LoadingState } from "../../_common/loadings/_models/LoadingState.model";
import { Module, ModulesResponse } from "../_models/Modules.model";
import { loadingUtils } from "../../_common/loadings/_utils/Loading.utils";
import { fetchUtils } from "../../_common/_utils/Fetch.utils";
import { appConfig } from "../../_configs/appConfig";
import { action, observable } from "mobx";

class ModulesService {
  loadingState = new LoadingState<ModulesResponse>();
  modules = observable.array<Module>([]);

  load() {
    return loadingUtils.fromPromise(
      () =>
        fetchUtils.get<ModulesResponse>(`${appConfig.apiUrl}/monitorings/modules`).then(
          action(({ data }) => {
            this.modules.replace(data);
            return this.modules;
          }),
        ),
      this.loadingState,
    );
  }
}

const modulesService = new ModulesService();
export { modulesService };
