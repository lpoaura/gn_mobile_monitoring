import { loadingUtils } from "../../_common/loadings/_utils/Loading.utils";
import { fetchUtils } from "../../_common/_utils/Fetch.utils";
import { TaxonomySearchResponse } from "../_models/Taxonomy.model";
import { instancesService } from "../../instances/_services/Instances.service";

class TaxonomyService {
  validateName(name: string, listId: number) {
    return loadingUtils.fromPromise(() =>
      fetchUtils
        .get<TaxonomySearchResponse>(
          `${instancesService.instance.apiUrl}/taxhub/api/taxref/allnamebylist/${listId}?search_name=${name}&limit=20`,
        )
        .then(({ data }) => data),
    );
  }
}

const taxonomyService = new TaxonomyService();
export { taxonomyService };
