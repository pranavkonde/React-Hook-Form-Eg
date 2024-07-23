import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext<any>({
  fullName: "",
  email: "",
  gender: "",
  nationality: "",
  address: "",
  qualification: "",
  collegeName: "",
  grade: "",
  company: "",
  totalExperience: "",
  location: "",
});

export const DataProvider = ({ children }: any) => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    gender: "",
    nationality: "",
    address: "",
    qualification: "",
    collegeName: "",
    grade: "",
    company: "",
    totalExperience: "",
    location: "",
  });

  return <DataContext.Provider value={{ data: data, setData: setData }}>{children}</DataContext.Provider>;
};
