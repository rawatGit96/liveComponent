export const getHrMinSec = (duration) => {
    let contentDuration = "0 min 0 sec";
    const time = parseInt(duration, 10) ?? 0;
    if (time >= 60) {
      const hrs = parseInt(time / 3600, 10);
      const rem = time % 3600;
      if (hrs >= 1)
        contentDuration = `${hrs} hr ${parseInt(rem / 60, 10)} min ${parseInt(
          rem % 60,
          10
        )} sec`;
      else contentDuration = `${parseInt(time / 60, 10)} min ${time % 60} sec`;
    } else contentDuration = `${0} min ${time} sec`;
    return contentDuration;
  };