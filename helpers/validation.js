import moment from "moment";

export function isValidPassword(password) {
  if (password.length >= 6) {
    return setValidation("success", null);
  }

  return setValidation(
    "error",
    "Password field must be atleast 6 character long"
  );
}

export function isValidConfirmPassword(password, confirmPassword) {
  if (password == confirmPassword) {
    return setValidation("success", null);
  }

  return setValidation("error", "Confirm password did not match");
}

export function isValidEmail(email) {
  if (/\S+@\S+\.\S+/.test(email)) {
    return setValidation("success", null);
  }

  return setValidation("error", "Please enter a valid email address");
}

export function isValidField(name) {
  if (name.length >= 1) {
    return setValidation("success", null);
  }

  return setValidation("error", "Name field is required");
}

export function isValidName(name) {
  // if (name.length >= 1) {
  if (/^([a-zA-Z ]){2,30}$/.test(name)) {
    return setValidation("success", null);
  }

  return setValidation("error", "Enter a valid name");
}

export function isValidNumber(name) {
  // if (name.length >= 1) {

  if (/^[\d +]+$/.test(name) || name == "") {
    return setValidation("success", null);
  }

  return setValidation("error", "Enter a valid number");
}

export function isValidTask(task) {
  if (task.length >= 1) {
    return setValidation("success", null);
  }

  return setValidation("error", "Task field is required");
}

export function isValidComment(comment) {
  if (comment != "") {
    return setValidation("success", null);
  }

  return setValidation("error", "Comment field is required");
}

export function setValidation(status, message) {
  return {
    validateStatus: status,
    errorMsg: message,
  };
}

export function convert(data) {
  // console.log(data);
  // var text = document.getElementById("url").value;
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  var text1 = data.replace(exp, "<a target='_blank' href='$1'>$1</a>");
  var exp2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  // document.getElementById("converted_url").innerHTML = text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
  return text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
}

export function stringToHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function isDeadlineOver(date1, date2) {
  // console.log(moment(date1).format("YYYY-MM-DD"), moment(date2).format("YYYY-MM-DD"));

  if (!date1 || !date2) {
    return false;
  }

  if (moment(date1).format("YYYY-MM-DD") > moment(date2).format("YYYY-MM-DD")) {
    return true;
  }
  return false;
}

export function isTaskLockAndOverdue(task) {
  if (
    convertLockUnlock(task.lockTask) &&
    isDeadlineOver(moment(), task.dueDate)
  ) {
    return true;
  }

  return false;
}

export function convertLockUnlock(status) {
  if (status == null || status == "UNLOCK") {
    return false; //task is not locked
  }

  return true; //task is locked
}
