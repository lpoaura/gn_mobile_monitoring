import { LoadingState } from "../../_common/loadings/_models/LoadingState.model";
import { loadingUtils } from "../../_common/loadings/_utils/Loading.utils";
import { fetchUtils } from "../../_common/_utils/Fetch.utils";
import { appConfig } from "../../_configs/appConfig";
import { action, IObservableArray, observable } from "mobx";
import { ModuleResponse, Site } from "../_models/Module.model";
import { SiteResponse, SiteVisit } from "../../sites/_models/Site.model";
import {
  VisitObservation,
  VisitResponse,
} from "../../visits/_models/Visit.model";

export class ModuleService {
  moduleCode: string;
  loadingState = new LoadingState<ModuleResponse>();
  sitesLoadingState = observable<Record<number, LoadingState<SiteResponse>>>(
    {},
  );
  visitsLoadingState = observable<Record<number, LoadingState<VisitResponse>>>(
    {},
  );

  sites = observable.array<Site>([]);
  visits = observable<Record<number, IObservableArray<SiteVisit> | undefined>>(
    {},
  );
  observations = observable<
    Record<number, IObservableArray<VisitObservation> | undefined>
  >({});

  constructor(moduleCode: string) {
    this.moduleCode = moduleCode;
  }

  loadModule() {
    return loadingUtils.fromPromise(
      () =>
        fetchUtils
          .get<ModuleResponse>(
            `${appConfig.apiUrl}/monitorings/object/${this.moduleCode}/module?field_name=module_code&depth=1`,
          )
          .then(
            action(({ data }) => {
              this.sites.replace(data.children.site);
              return data;
            }),
          ),
      this.loadingState,
    );
  }

  loadSite(siteId: number) {
    if (!this.sitesLoadingState[siteId]) {
      this.sitesLoadingState[siteId] = new LoadingState<SiteResponse>();
    }
    return loadingUtils.fromPromise(
      () =>
        fetchUtils
          .get<SiteResponse>(
            `${appConfig.apiUrl}/monitorings/object/${this.moduleCode}/site/${siteId}?depth=1`,
          )
          .then(
            action(({ data }) => {
              this.visits[siteId] = observable.array(data.children.visit);
              return data;
            }),
          ),
      this.sitesLoadingState[siteId],
    );
  }

  loadVisit(visitId: number) {
    if (!this.visitsLoadingState[visitId]) {
      this.visitsLoadingState[visitId] = new LoadingState<VisitResponse>();
    }
    return loadingUtils.fromPromise(
      () =>
        fetchUtils
          .get<VisitResponse>(
            `${appConfig.apiUrl}/monitorings/object/${this.moduleCode}/visit/${visitId}?depth=1`,
          )
          .then(
            action(({ data }) => {
              this.observations[visitId] = observable.array(
                data.children.observation,
              );
              return data;
            }),
          ),
      this.visitsLoadingState[visitId],
    );
  }
}
