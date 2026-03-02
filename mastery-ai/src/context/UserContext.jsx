import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchUserProfile, fetchStudentProfile } from '../services/api'; // <-- Import the new function!

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [studentData, setStudentData] = useState(null); // <-- Add state for student details
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUserData(null);
        setStudentData(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch BOTH endpoints at the same time to make it load twice as fast!
        const [userResponse, studentResponse] = await Promise.all([
          fetchUserProfile(token),
          fetchStudentProfile(token)
        ]);
        
        setUserData(userResponse);
        setStudentData(studentResponse);
      } catch (error) {
        console.error("UserContext Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const updateLocalUser = (newUserData) => {
    setUserData(prev => ({ ...prev, ...newUserData }));
  };

  // ADD THIS: A function to update the student data locally
  const updateLocalStudent = (newStudentData) => {
    setStudentData(prev => ({ ...prev, ...newStudentData }));
  };

  return (
    // Export studentData so the app can use it!
    <UserContext.Provider value={{ userData, studentData, isLoading, updateLocalUser, updateLocalStudent }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);