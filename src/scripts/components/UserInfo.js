export default class UserInfo {
  constructor({ usernameSelector, jobSelector }) {
    this._usernameSelector = usernameSelector;
    this._jobSelector = jobSelector;
    this._name = document.querySelector(usernameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._job.textContent = userInfo.job;
  }
}
