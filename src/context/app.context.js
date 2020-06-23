import React, { useMemo, useState, createContext, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { API_URL } from "../constants/index";

// CONTEXT ===================================
const AppContext = createContext();
function AppProvider(props) {
  // General app
  const [user, setUser] = useState(null);
  const [currentDetailTask, setCurrentDetailTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState(null);
  const [loginRole, setLoginRole] = useState("client");
  const [regions, setRegions] = useState(null);
  const [currentMap2DObject, setCurrentMap2DObject] = useState(null); // Array of polygon points and image url
  const [autoTemplate, setAutoTemplate] = useState(null);

  const [customStepTemplate, setCustomStepTemplate] = useState(null);
  const [makes, setMakes] = useState(localStorage["makes"] ? JSON.parse(localStorage["makes"]) : null);
  const [fuelTypes, setFuelTypes] = useState(localStorage["fuelTypes"] ? JSON.parse(localStorage["fuelTypes"]) : null);
  const [bodyTypes, setBodyTypes] = useState(localStorage["bodyTypes"] ? JSON.parse(localStorage["bodyTypes"]) : null);

  // Notifications
  const [notifications, setNotifications] = useState([]);

  const initialFutureTask = {
    type: "FNOL",
    client: {},
    inspector: {},
    car: {},
    damageForm: {},
    stepDocumentsInjured: {},
    stepDocumentsGuilty: {},
    stepInsurance: {},
    stepPolicy: {},
    stepDeclarant: {},
    stepGuilty: {},
    stepLocation: {},
  };
  // Get tasks
  const [tasks, setTasks] = useState({
    STATE_APPROVED: [],
    STATE_CLOSED: [],
    STATE_COMPLETED: [],
    STATE_NEW: [],
    STATE_IN_PROGRESS: [],
    STATE_REJECTED: [],
  });

  // Future task
  const [futureTask, setFutureTask] = useState(initialFutureTask);

  const fetchNotifications = () => {
    axios({
      method: "get",
      url: `${API_URL}/notification/all`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        setNotifications(response.data);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1252:", response);
        }
      });
  };

  useEffect(() => {
    const localStorageRegions = localStorage["regions"] ? JSON.parse(localStorage["regions"]) : null;

    if (!localStorageRegions) {
      getRegions();
    } else {
      setRegions(localStorageRegions);
    }

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const getAutoTemplate = async (body_type_id) => {
    setIsLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.set("body_type_id", body_type_id);

    const resultsPromise = axios({
      method: "post",
      url: `${API_URL}/inspection/templates-auto`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        setAutoTemplate(response.data.message.templates);
        setIsLoading(false);
        return response.data.message.templates;
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1252:", response);
        }
        setIsLoading(false);
      });

    const results = await resultsPromise;
    return results;
  };
  const getRegions = () => {
    axios({
      method: "get",
      url: `${API_URL}/county`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        //handle success
        console.log(response.data);
        setRegions(response.data);
        localStorage["regions"] = JSON.stringify(response.data);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1252:", response);
        }
      });
  };

  const getCupiTemplate = (jwt, body_type_id) => {
    setIsLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.set("body_type_id", body_type_id);

    axios({
      method: "post",
      url: `${API_URL}/inspection/templates-cupi`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        setCurrentMap2DObject(response.data.message);

        setIsLoading(false);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1252:", response);
        }
        setIsLoading(false);
      });
  };

  const getMakes = (jwt, id) => {
    console.log("GET MAKES");
    setIsLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.set("userId", id);

    axios({
      method: "post",
      url: `${API_URL}/app/fetch-dictionaries`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(function (response) {
        //handle success

        const arrayFromObject = Object.keys(response.data.bodyTypes).reduce((acc, curr) => {
          return [...acc, { id: curr, name: response.data.bodyTypes[curr] }];
        }, []);
        setBodyTypes(arrayFromObject);
        localStorage["bodyTypes"] = JSON.stringify(arrayFromObject);

        setFuelTypes(response.data.fuelTypes);
        localStorage["fuelTypes"] = JSON.stringify(response.data.fuelTypes);

        setMakes(response.data.makes);
        localStorage["makes"] = JSON.stringify(response.data.makes);
        setIsLoading(false);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1252:", response);
        }
        setIsLoading(false);
      });
  };

  const updateProfile = (formData) => {
    setIsLoading(true);

    const bodyFormData = new FormData();
    bodyFormData.set("email", formData.email);
    bodyFormData.set("firstName", formData.Nume);
    bodyFormData.set("lastName", formData.Prenume);
    bodyFormData.set("phone", formData.numar_telefon);
    if (formData.password) {
      bodyFormData.set("password", formData.password);
    }
    if (formData.confirm) {
      bodyFormData.set("repeatPassword", formData.confirm);
    }
    bodyFormData.set("userId", user.user.id);
    if (formData.avatar) {
      bodyFormData.set("avatar", formData.avatar);
    }

    axios({
      method: "post",
      url: `${API_URL}/profile/save`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${user.jwt}` },
    })
      .then(function (response) {
        //handle success
        setUser({ ...user, profile: response.data });
        setIsLoading(false);
        message.success("Profil salvat!");
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1251:", response);
        }
        setIsLoading(false);
      });
  };

  const addNewCar = (formData) => {
    setIsLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.set("client_id", user.user.id);
    bodyFormData.set("body_id", formData.body_id);
    bodyFormData.set("fuel_type", formData.fuel_type);
    bodyFormData.set("make_id", formData.make_id);
    bodyFormData.set("model_id", formData.model_id);
    bodyFormData.set("model_year", formData.model_year);
    bodyFormData.set("registration_number", formData.registration_number);
    bodyFormData.set("transmission", "");
    bodyFormData.set("vin", formData.vin);

    axios({
      method: "post",
      url: `${API_URL}/inspection/add-car`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${user.jwt}` },
    })
      .then(function (response) {
        //handle success
        message.success("Mașina a fost adaugată");
        getClientCars(user.user.id);
        setIsLoading(false);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1253:", response);
        }
        setIsLoading(false);
      });
  };

  const updateCar = (formData) => {
    setIsLoading(true);
    const bodyFormData = new FormData();
    bodyFormData.set("client_id", user.user.id);
    bodyFormData.set("id", formData.id);
    bodyFormData.set("body_id", formData.body_id);
    bodyFormData.set("fuel_type", formData.fuel_type);
    bodyFormData.set("make_id", formData.make_id);
    bodyFormData.set("model_id", formData.model_id);
    bodyFormData.set("model_year", formData.model_year);
    bodyFormData.set("registration_number", formData.registration_number);
    bodyFormData.set("transmission", "");
    bodyFormData.set("vin", formData.vin);

    axios({
      method: "post",
      url: `${API_URL}/inspection/update-car`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${user.jwt}` },
    })
      .then(function (response) {
        //handle success
        message.success("Datele mașinii  au fost actualizate!");
        getClientCars(user.user.id);
        setIsLoading(false);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1253:", response);
        }
        setIsLoading(false);
      });
  };

  const getClientCars = (client_id) => {
    setIsLoading(true);

    const bodyFormData = new FormData();
    bodyFormData.set("client[id]", client_id);

    axios({
      method: "post",
      url: `${API_URL}/inspection/client-cars`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${user.jwt}` },
    })
      .then(function (response) {
        //handle success
        setCars(response.data.message.cars);
        setIsLoading(false);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1253:", response);
        }
        setIsLoading(false);
      });
  };

  const authenticate = (formData) => {
    setIsLoading(true);

    const bodyFormData = new FormData();
    bodyFormData.set("username", formData.username);
    bodyFormData.set("password", formData.password);
    bodyFormData.set("role", loginRole == "constatator" ? "inspector" : loginRole);

    axios({
      method: "post",
      url: `${API_URL}/auth/login`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setIsLoading(false);

        setUser(response.data);
        localStorage["user"] = JSON.stringify(response.data);
        message.success("Bun venit!");

        getTasks(response.data.jwt);
        getMakes(response.data.jwt, response.data.user.id);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1251:", response);
        }
        setIsLoading(false);
      });
  };

  const forgotPassword = (formData) => {
    setIsLoading(true);

    const bodyFormData = new FormData();
    bodyFormData.set("reset_string", formData.email_or_phone);

    axios({
      method: "post",
      url: `${API_URL}/auth/reset-password`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        if (response.data.success) {
          message.success("Email trimis cu succes!");
        } else {
          message.error(response.data.message);
        }
        setIsLoading(false);
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1251:", response);
        }
        setIsLoading(false);
      });
  };

  const register = (formData) => {
    setIsLoading(true);

    const bodyFormData = new FormData();
    bodyFormData.set("email", formData.email);
    bodyFormData.set("phone", formData.phone_number);

    axios({
      method: "post",
      url: `${API_URL}/auth/invite`,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setIsLoading(false);
        message.success("Email trimis cu succes!");
      })
      .catch(function (response) {
        //handle error
        try {
          message.error(response.response.data.message);
        } catch (e) {
          console.log("Repsonse 1251:", response);
        }
        setIsLoading(false);
      });
  };

  const signout = () => {
    setUser(null);
    localStorage.clear();
  };

  const getTasks = (jwt) => {
    setIsLoading(true);

    const bodyFormData = new FormData();
    bodyFormData.set("taskState", "STATE_NEW,STATE_IN_PROGRESS,STATE_REJECTED,STATE_COMPLETED,STATE_APPROVED,STATE_CLOSED");

    axios({
      method: "post",
      url: `${API_URL}/task/all`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(function (response) {
        //handle success
        const responseData = Object.values(response.data);
        responseData.pop();

        //task_status
        const STATE_APPROVED = responseData.filter((task) => task.task_status.code === "STATE_APPROVED");
        const STATE_CLOSED = responseData.filter((task) => task.task_status.code === "STATE_CLOSED");
        const STATE_COMPLETED = responseData.filter((task) => task.task_status.code === "STATE_COMPLETED");
        const STATE_NEW = responseData.filter((task) => task.task_status.code === "STATE_NEW");
        const STATE_IN_PROGRESS = responseData.filter((task) => task.task_status.code === "STATE_IN_PROGRESS");
        const STATE_REJECTED = responseData.filter((task) => task.task_status.code === "STATE_REJECTED");

        setTasks({
          STATE_APPROVED,
          STATE_CLOSED,
          STATE_COMPLETED,
          STATE_NEW,
          STATE_IN_PROGRESS,
          STATE_REJECTED,
        });

        setIsLoading(false);
      })
      .catch(function (response) {
        //handle error
        setIsLoading(false);
        console.dir(response);
      });
  };

  const store = {
    // General app
    isLoading,
    setIsLoading,

    // Login role
    loginRole,
    setLoginRole,

    // User
    user,
    setUser,
    tasks,
    getClientCars,
    cars,
    updateProfile,
    getMakes,
    makes,

    //Cars
    addNewCar,
    updateCar,
    fuelTypes,
    bodyTypes,

    // Cupi
    getCupiTemplate,
    currentMap2DObject,
    setCurrentMap2DObject,
    getAutoTemplate,
    autoTemplate,
    setAutoTemplate,
    //Future task
    futureTask,
    setFutureTask,

    //Auth
    forgotPassword,
    authenticate,
    register,
    signout,

    // Tasks
    getTasks,
    initialFutureTask,
    currentDetailTask,
    setCurrentDetailTask,
    customStepTemplate,
    setCustomStepTemplate,
    // Regions
    regions,

    // Notifications
    notifications,
  };

  const storeForProvider = useMemo(() => store, [store]);
  return <AppContext.Provider value={storeForProvider}>{props.children}</AppContext.Provider>;
}

export { AppContext };
export default AppProvider;
