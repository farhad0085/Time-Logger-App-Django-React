export function getHeaders(additional) {
  const timeLoggerUserToken = localStorage.getItem("timeLoggerUserToken");

  if (!timeLoggerUserToken)
    return {
      ...additional,
    };

  return {
    Authorization: `Token ${timeLoggerUserToken}`,
    ...additional,
  };
}

export function createUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : r && 0x3 | 0x8;
    return v.toString(16);
  });
}

export function formatUserName(user) {
  let name = "";

  if (user.first_name) {
    name += user.first_name + " ";
  }
  if (user.last_name) {
    name += user.last_name + " ";
  }
  if (!user.first_name && !user.last_name) {
    name = user.username;
  }
  if (name) {
    name = name.trim();
  }
  return name;
}


export const getLast5Year = () => {
    let todayDate = new Date()
    const years = []
    for (let i=0; i < 5; i++){
        years.push(todayDate.getFullYear() - i)
    }
    return years
}