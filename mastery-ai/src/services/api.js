const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserProfile = async (token) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error("Failed to fetch user profile");
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};


export const updateUserProfile = async (token, profileData) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(errData?.detail || "Failed to update profile.");
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error("The server is taking too long. Please try again.");
    }
    throw error;
  }
};

// src/services/api.js

export const fetchStudentProfile = async (token) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_URL}/students/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // If a user hasn't finished onboarding, they might not have a student profile yet.
      // Returning null prevents the whole app from crashing.
      if (response.status === 404) return null; 
      throw new Error("Failed to fetch student profile");
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn("Could not load student profile:", error);
    return null;
  }
};