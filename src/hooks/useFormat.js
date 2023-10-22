const useFormat = () => {
  const formatPhone = (num) => {
    let phone = num.replace("+", "");

    if (phone.startsWith("55")) {
      phone = phone.substring(2);
    }

    if (phone.length === 11) {
      return `(${phone.substring(0, 2)}) ${phone.substring(
        2,
        3,
      )} ${phone.substring(3, 7)}-${phone.substring(7)}`;
    } else if (phone.length === 10) {
      return `(${phone.substring(0, 2)}) ${phone.substring(
        2,
        6,
      )}-${phone.substring(6)}`;
    } else {
      return phone;
    }
  };

  const formatDate = (milli) => {
    const date = new Date(milli);

    const day = date.getDate();
    const month = date.toLocaleDateString("pt-BR", { month: "long" });
    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`;
  };

  const getFirstElement = (array) => {
    let first = array[0];

    for (let i = 1; i < array.length; i++) {
      if (array[i].order < first.order) {
        first = array[i];
      }
    }

    return first;
  };

  return { formatPhone, formatDate, getFirstElement };
};

export default useFormat;
