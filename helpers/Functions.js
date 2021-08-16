export const constructData = (data) => {
  let newData = {};

  for (let item in data) {
    if (item != "token") {
      // console.log(item, data[item]);
      newData[item] = data[item]
    }
  }

  return newData;
}




export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + '' + ampm;
  return strTime;
}

export function timeSince(date) {

  // @ts-ignore
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}


export function timeSince2(time) {

  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds == 0) {
    return 'Just now'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;

}

export function isBotActivity(type) {
  // console.log(type);
  // console.log("~~~~~~", type);
  if (type == "Coffee Break" || type == "Bot is scrolling contacts" || type == "Found") {
    return true
  }

  return false;
}

export function convertActivity(item) {
  if (item.type == "search") {
    return "Found"
  }
  if (item.type == "view") {
    return "viewed"
  }
  if (item.type == "follow") {
    return "Followed"
  }
  if (item.type == "profile-scan") {
    return item.contact !== undefined ? item.contact.name + " Profile Scaned" : "Profile Scaned"
  }
  if (item.type == "request") {
    return "Requested"
  }
  if (item.type == "check") {
    return "Checked"
  }
  if (item.type == "message") {
    return "Message sent"
  }
  if (item.type == "scroll") {
    return "Bot is scrolling contacts"
  }
  if (item.type == "withdraw") {
    return "Withdraw"
  }
  if (item.type == "firstDegree") {
    return "Connected"
  }
  if (item.type == "break") {
    return "Coffee Break"
  }

  if (item.type == "delay") {
    return "Coffee Break"
  }
  // if (item.type == "request") {
  //     let msgObh = getConnectionReqMsg(item);
  //     return item.name + "Profile Scaned"
  // }
}

export function getConnectionReqMsg(activity) {
  let obj = null;
  // console.log(item);

  // item.campaign.sequence.forEach((seq) => {
  //   if (seq.type == "linkedin_connection" && item.type == "request") {
  //     obj = seq.connectionReqMsg;
  //   }
  // });

  switch (activity.type) {
    case 'search':
      return 'Searched for leads'
    case 'view':
      return activity.contact ? activity.contact.name + '\'s profile viewed' : 'Profile viewed'
    case 'follow':
      return activity.contact ? activity.contact.name + '\'s profile followed' : 'Profile followed'
    case 'profile-scan':
      return activity.contact ? activity.contact.name + '\'s profile info fetched' : 'Profile info fetched'
    case 'request':
      return 'Connection request sent to ' + (activity.contact.name ? activity.contact.name : '')
    case "check":
      return `Profile checked of ${activity.contact?.name?.split(",")[0]}`
    case 'message':
      return 'Message sent - ' + (activity.contact ? activity.contact.name : '')
    case 'scroll':
      return 'Scrolled through your timeline'
    case 'withdraw':
      return 'Withdraw invitation'
    case 'firstDegree':
      return activity.contact ? activity.contact.name + ' Connected' : 'Connected'
    case 'break':
      return 'Took a coffee break'
    case 'delay':
      return "Coffee break"

  }
  return activity.type;


  // return obj;
}

export function getSequenceTtileFromType(item) {
  if (item.type == "profile_engagement") {
    return "Profile Engage"
  }
  if (item.type == "linkedin_connection") {
    return "LinkedIn Connect"
  }
  if (item.type == "linkedin_message") {
    return "LinkedIn Message"
  }
}

export function imageExists(image_url) {

  var http = new XMLHttpRequest();

  http.open('HEAD', image_url, false);
  http.send();

  if (http.status != 404) {
    return true
  }


  return false;

}

export function checkImage(imageSrc, good, bad) {
  var img = new Image();
  img.onload = good;
  img.onerror = bad;
  img.src = imageSrc;
}
