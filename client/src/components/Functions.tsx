const formatDate = (date: Date | string) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US');
  // console.log("formattedDate :>> ", formattedDate);
  return formattedDate;
};

const formatDateAndTime = (dateAndTime: Date | string) => {
  const date = new Date(dateAndTime).toLocaleDateString();
  const time = new Date(dateAndTime).toLocaleTimeString();
  return (
    <>
      {date}, {time}
    </>
  );
};

const formatInputDate = (date: Date | string) => {
  const formattedDate = new Date().toISOString().split('T')[0];
  return formattedDate;
};

export {formatDate, formatDateAndTime, formatInputDate};
