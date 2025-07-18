class timeFormat {
  static async formatTime(time) {
    if (typeof time === 'string') {
      console.log('Time: ', time);
      let hours = time.split(':')[0];
      const minutes = time.split(':')[1];
      let ampm = 'AM';
      console.log('Time Pieces: ', hours, 'and ', minutes);

      if (Number(hours) > 12) {
        hours = Number(hours) - 12;
        ampm = 'PM';
      }
      return `${hours}:${minutes} ${ampm}`;
    } if (time instanceof Date) {
      let hours = time.getHours();
      let minutes = time.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours %= 12;
      hours = hours || 12;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      const strTime = `${hours}:${minutes} ${ampm}`;
      return strTime;
    }
    return time;
  }
}

export default timeFormat;
