const useFormatPhone = () => {
  function formatPhone(num) {
    let phone = num.replace('+', '');

    if (phone.startsWith('55')) {
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
  }

  return { formatPhone };
};

export default useFormatPhone;
