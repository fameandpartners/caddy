export const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};
export const sortCustomizations = ( a, b ) => {
  let firstCode = a.key || a.code;
  let secondCode = b.key || b.code;
  let splitFirst = firstCode.split(/(\d+)/);
  let splitSecond = secondCode.split(/(\d+)/);
  if( splitFirst[0] === splitSecond[0] )
  {
    return parseInt( splitFirst[1] - splitSecond[1], 10 );
  } else
  {
    return splitFirst[0] > splitSecond[0] ? -1 : splitFirst[0] < splitSecond[0] ? 1 : 0 ;                                                                                             
  }
};

export const createArrayGroups = ( array, size ) => {
  let toReturn = [];

  while (array.length > 0)
  {
    toReturn.push(array.splice(0, size));
  }

  return toReturn;
};

export default  {
  getBase64,
  sortCustomizations,
  createArrayGroups
};
