class Dataholder {
  ipaddress = null;

  static setIpAddress(ip) {
    this.ipaddress = ip;
    sessionStorage.setItem("theipaddress", ip);
  }

  static getIpAddress() {
    if ("theipaddress" in sessionStorage)
      this.ipaddress = sessionStorage.getItem("theipaddress");

    return this.ipaddress;
  }

  static getBaseUrl() {
    return window.location.origin.toString();
  }

  static getApiUrl() {
    return process.env.NODE_ENV === "development"
      ? "http://localhost:3002/"
      : "https://urlshortner007api.herokuapp.com/";
  }

  static generateRandomString(lengthofstring) {
    var arr = "1234567890abcdefghijklmnopqrsABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var ans = "";
    for (var i = lengthofstring; i > 0; i--) {
      ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }
}

export default Dataholder;
