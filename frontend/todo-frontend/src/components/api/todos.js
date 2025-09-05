const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);

export const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `Oops! Unable to load tasks. Server responded with ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json(); // διάβασε JSON μόνο μια φορά
    console.log("Response JSON:", json);

    if (!json.status) {
      throw new Error(json.message || "Server returned an error");
    }

    const data = json.data;
    if (!Array.isArray(data)) {
      throw new Error("Unexpected data format received from server.");
    }

    console.log("Fetched tasks from backend:", data);
    return data;
  } catch (err) {
    console.error(err);
    return [
      {
        _id: "error-1",
        title: "⚠ Unable to load tasks. Please try again later.",
      },
    ];
  }
};


export const insertTask = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to insert task");
  }
  const json = await response.json();
  return json;
};


export const clearAllCompletedCall = async () => {
  console.log("📡 Calling clearAllCompleted API:", `${API_URL}/completed`);

  await fetch(`${API_URL}/completed`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteById = async (taskId) => {
  await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
