import store from '../store/index';

class DateTimeFormat {
  static async shortDate(dateTBF) {
    // console.log('Original Date Info: ', dateTBF);
    const longDate = new Date(dateTBF);
    const gm = longDate.getMonth();
    const gd = longDate.getDate();
    const gy = longDate.getFullYear();
    const month = store.state.Month[gm];
    // console.log('Long Date: ', longDate);
    // console.log('Day of Month: ', gd);
    const shortDate = `${month} ${gd}, ${gy}`;

    return { shortDate };
  }
}

export default DateTimeFormat;
