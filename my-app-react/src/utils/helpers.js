export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };