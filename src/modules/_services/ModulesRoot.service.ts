import { ModuleService } from "./Module.service";

class ModulesRootService {
  #modulesService: Record<string, ModuleService> = {};

  getModule(moduleCode: string) {
    if (!this.#modulesService[moduleCode]) {
      this.#modulesService[moduleCode] = new ModuleService(moduleCode);
    }
    return this.#modulesService[moduleCode];
  }
}

const modulesRootService = new ModulesRootService();
export { modulesRootService };
