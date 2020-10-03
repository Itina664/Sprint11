export default class UserInfo {
  constructor(userInfoName, userInfoJob, userInfoPhoto) {
    this.userInfoName = userInfoName;
    this.userInfoJob = userInfoJob;
    this.userInfoPhoto = userInfoPhoto;
  }

  /*setUserInfo(name, job) {
    this.name = name;
    this.job = job;
  };*/

  updateUserInfo(name, job) {
    this.userInfoName.textContent = name;
    this.userInfoJob.textContent = job;
  };

  updateUserInfoServer(result) {
    this.userInfoName.textContent = result.name;
    this.userInfoJob.textContent = result.about;
    this.userInfoPhoto.style.backgroundImage = `url(${result.avatar})`;
  }
}



