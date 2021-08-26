import { LoadingState } from "../../_common/loadings/_models/LoadingState.model";
import { Module, ModulesResponse } from "../_models/Modules.model";
import { loadingUtils } from "../../_common/loadings/_utils/Loading.utils";
import { fetchUtils } from "../../_common/_utils/Fetch.utils";
import { action, observable } from "mobx";
import { instancesService } from "../../instances/_services/Instances.service";

class ModulesService {
  loadingState = new LoadingState<ModulesResponse>();
  modules = observable.array<Module>([]);

  load() {
    return loadingUtils.fromPromise(
      () =>
        fetchUtils.get<ModulesResponse>(`${instancesService.instance.apiUrl}/monitorings/modules`).then(
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
