const filter = (array, data) => {
  const filteredData = array
    ? data.filter((item) => {
        return (
          (array[2] === null || array[2] === ""
            ? true
            : item.ansatte_interval?.toString().includes(array[2])) &&
          (array[1] === null || array[1] === ""
            ? true
            : item.branchebetegnelse_primær?.toString().includes(array[1])) &&
          (array[0] === null || array[0] === ""
            ? true
            : item.virksomhedsform?.toString().includes(array[0])) &&
          (array[3] === null || array[3] === ""
            ? true
            : item.antalPenheder?.toString().includes(array[3])) &&
          (array[4] === null || array[4] === ""
            ? true
            : item.yearly_result?.toString().includes(array[4])) &&
          (array[5] === null || array[5] === ""
            ? true
            : item.p_kommunenavn?.toString().includes(array[5])) &&
          (array[6] === null || array[6] === ""
            ? true
            : item.p_region?.toString().includes(array[6]))
        );
      })
    : data;

  return filteredData;
};

module.exports = filter;
