module.exports = {
  // existing blog posts that include the date created
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    // getMonth() returns a number between 0 and 11, so need to add 1 to get the correct month
    return `${new Date(date).getMonth() + 1}/${new Date(
      date
    ).getDate()}/${new Date(date).getFullYear()}`;
  },
};
