export default class UserInfo {
  constructor({ usernameSelector, jobSelector, avatarSelector }) {
    this._usernameSelector = usernameSelector;
    this._jobSelector = jobSelector;
    this._name = document.querySelector(usernameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserAvatar(userInfo) {
    this._avatar.src = userInfo.avatar;
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._job.textContent = userInfo.job;
  }
}
