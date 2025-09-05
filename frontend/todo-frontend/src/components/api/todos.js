const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);

export const fetchTasks = async () => {
  try {
    const API_URL = import.meta.env.VITE_API_URL;
    console.log("🔥 Fetching tasks from URL:", API_URL);

    const response = await fetch(API_URL);
    const text = await response.text();
    console.log("📄 Raw response text:", text); // Αυτό θα σου δείξει ακριβώς τι επιστρέφει
    const json = JSON.parse(text); // Προσπάθεια να μετατρέψεις σε JSON

    if (!json.status) {
      throw new Error(json.message || "Server returned an error");
    }

    return json.data;
  } catch (err) {
    console.error("💥 fetchTasks error:", err);
    return [
      {
        _id: "error-1",
        title: "⚠ Unable to load tasks. Please try again later.",
      },
    ];
  }
};


export const insertTask = async (data) => {
  try {
    console.log("📡 Sending POST request to:", API_URL);
    console.log("Request body:", data);

    const response = await fetch(API_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });


    const rawText = await response.text();
    console.log("Raw response:", rawText);


    if (!response.ok) {
      throw new Error(
        `Failed to insert task. Server responded with status ${response.status}`
      );
    }


    let json;
    try {
      json = JSON.parse(rawText);
    } catch (err) {
      throw new Error("Response is not valid JSON");
    }

    console.log("Parsed JSON response:", json);

    if (!json.status) {
      throw new Error(json.message || "Server returned an error");
    }

    return json.data || json;
  } catch (err) {
    console.error("❌ insertTask error:", err);
    throw err;
  }
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
