class User {
  constructor(id, user, password, tasks = [], login = true) {
    this.id = id;
    this.user = user;
    this.password = password;
    this.login = login;
    this.tasks = tasks;
  }
}
