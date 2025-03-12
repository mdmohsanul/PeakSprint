const useOwners = () => {
  const getOwner = (owners) => {
    const extractNames = owners
      .map((item) => item.name)
      .map((item) => {
        const words = item.split(" ");
        return words.length > 1
          ? words[0].charAt(0) + words[1].charAt(0)
          : words[0].charAt(0);
      });
    const classes = {
      0: "bg-orange-500 text-orange-100",
      1: "bg-blue-500 text-blue-100",
      2: "bg-red-500 text-red-100",
      3: "bg-gray-600 text-gray-100",
    };
    const names = extractNames.map((item, i) => (
      <span
        key={i}
        className={`-ml-3 flex items-center justify-center  p-2 w-10 h-10 rounded-full ${classes[i]}`}
      >
        {item}
      </span>
    ));
    return names;
  };
  return { getOwner };
};

export default useOwners;
