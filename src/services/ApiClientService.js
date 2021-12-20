import { BAD_REFRESH_TOKEN, HOST_ADDR } from "../constants/constants";

const apiBase = `http://${HOST_ADDR}/api/`;

export async function ApiClientService(url, options = {}, dispatch) {
  const access = window.localStorage.getItem("ACCESS");
  const headers = options.headers || {};
  if (access) {
    headers["Authorization"] = `Bearer ${access}`;
  }

  // console.log({ ...options, headers });
  let response = await fetch(`${apiBase}${url}`, { ...options, headers });
  // console.log(await response.json());

  if (response.status === 401) {
    const refresh = window.localStorage.getItem("REFRESH");

    if (refresh === null) {
      return BAD_REFRESH_TOKEN;
    }

    const refreshResponse = await fetch(`${apiBase}token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        refresh,
      }),
    });
    const refreshData = await refreshResponse.json();

    window.localStorage.setItem("ACCESS", refreshData.access);

    headers["Authorization"] = `Bearer ${refreshData.access}`;

    response = await fetch(`${apiBase}${url}`, { ...options, headers });
  }

  try {
    const data = await response.json();

    return data;
  } catch (err) {
    //
  }
}
