import { GenericConfigDataList } from "../../_models/GenericFormConfig.model";
import { instancesService } from "../../../../../../instances/_services/Instances.service";
import { fetchUtils } from "../../../../../_utils/Fetch.utils";
import { LoadingState, LoadingStatus } from "../../../../../loadings/_models/LoadingState.model";

class DataListService {
  dataListsStats: Partial<Record<string, LoadingState<any>>> = {};
  items: Partial<Record<string, Partial<Record<string | number, LoadingState<any>>>>> = {};

  fetchItems<T = any>(config: GenericConfigDataList): LoadingState<T[]> {
    let url = `${instancesService.instance.apiUrl}/${config.api}`;
    if (config.params) {
      url +=
        "?" +
        Object.entries(config.params)
          .map(([key, value]) => key + "=" + encodeURIComponent(value))
          .join("&");
    }

    if (!this.dataListsStats[url]) {
      const loadingState = new LoadingState<T[]>();
      this.dataListsStats[url] = loadingState;
      loadingState.startLoading(
        fetchUtils.get<any>(url).then(
          ({ data }) => {
            const items = config.data_path ? data[config.data_path] : data;

            const itemsCache = this.items[config.api] ?? {};
            this.items[config.api] = itemsCache;
            for (const item of items) {
              itemsCache[item[config.keyValue]] = new LoadingState(LoadingStatus.SUCCEEDED, undefined, item);
            }

            loadingState.setSuccess(items);
            return items;
          },
          err => loadingState.setError(err),
        ),
      );
    }

    return this.dataListsStats[url] as LoadingState<T[]>;
  }

  fetchItem<T = any>(config: GenericConfigDataList, id: number | string): LoadingState<T | null> {
    const itemsCache = this.items[config.api] ?? {};
    this.items[config.api] = itemsCache;
    if (itemsCache[id]) {
      return itemsCache[id] as LoadingState<T | null>;
    }

    let apiPath = config.api === "meta/datasets" ? "dataset" : "user";
    let url = `${instancesService.instance.apiUrl}/monitorings/util/${apiPath}/${id}`;
    const loadingState = new LoadingState<T | null>();
    itemsCache[id] = loadingState;
    loadingState.startLoading(
      fetchUtils.get<any>(url).then(
        ({ data }) => {
          loadingState.setSuccess(data);
          return data;
        },
        err => loadingState.setError(err),
      ),
    );

    return loadingState;
  }
}

const dataListService = new DataListService();
export { dataListService };
