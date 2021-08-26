import { GenericConfigDataList } from "../ui/form/generic/_models/GenericFormConfig.model";
import { fetchUtils } from "../_utils/Fetch.utils";
import { instancesService } from "../../instances/_services/Instances.service";

const cache: Record<string, Promise<any>> = {};

export const DataListUtils = {
  fetchItems<T = any>(config: GenericConfigDataList): Promise<T[]> {
    let url = `${instancesService.instance.apiUrl}/${config.api}`;
    if (config.params) {
      url +=
        "?" +
        Object.entries(config.params)
          .map(([key, value]) => key + "=" + encodeURIComponent(value))
          .join("&");
    }

    if (!cache[url]) {
      cache[url] = fetchUtils.get<any>(url).then(({ data }) => {
        return config.data_path ? data[config.data_path] : data;
      });
    }
    return cache[url];
  },
};
