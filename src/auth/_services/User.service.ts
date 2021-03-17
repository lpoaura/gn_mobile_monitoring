import { fetchUtils } from "../../_common/_utils/Fetch.utils";
import { appConfig } from "../../_configs/appConfig";
import { LoginResponse } from "../_models/Token.model";
import { observable, runInAction } from "mobx";
import { User } from "../_models/User.model";

class UserService {
  user = observable.box<User>();

  async login(username: string, password: string) {
    const loginResponse = await fetchUtils.post<LoginResponse>(
      `${appConfig.apiUrl}/auth/login`,
      { login: username, password, id_application: appConfig.appId },
    );
    if (loginResponse.data.user) {
      runInAction(() => {
        this.user.set({
          id: loginResponse.data.user.identifiant,
          firstName: loginResponse.data.user.prenom_role,
          lastName: loginResponse.data.user.nom_role,
        });
      });
    }
  }
}

const userService = new UserService();
export { userService };
