import React, { createContext, useState, useEffect } from 'react';
 
export const DataContext = createContext<any>(null);
 
export const DataProvider = ({ children }: any) => {
  const [data, setData] = useState([]);
 
  const fetchData = () => {
    fetch('https://6699ff789ba098ed61fdf102.mockapi.io/draft')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(fetchedData => {
        setData(fetchedData);
      })
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
  };
 
  useEffect(() => {
    fetchData();
  }, []);
 
  return (
    <DataContext.Provider value={{ data, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
 