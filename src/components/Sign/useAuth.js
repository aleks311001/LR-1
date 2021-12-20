import { useHistory } from "react-router-dom";
import { ApiClientService } from "../../services/ApiClientService";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions/user";
import {HOST_ADDR} from '../../constants/constants';

export function useAuth(setError) {
  const history = useHistory();
  const dispatch = useDispatch();

  const onAuth = async (login, password) => {
    const response = await fetch(`http://${HOST_ADDR}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ username: login, password }),
    });
    const data = await response.json();

    if (response.status !== 200) {
      setError(data.detail);
      return;
    }

    window.localStorage.setItem("ACCESS", data.access);
    window.localStorage.setItem("REFRESH", data.refresh);

    const user = await ApiClientService("user/current/");
    dispatch(setUser(user));

    history.push("/");
  };

  return { onAuth };
}
