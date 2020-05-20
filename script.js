document.addEventListener("DOMContentLoaded", function () {
  /***************viev********* */
  class NewTask_view {
    constructor() {
      this.text_task = document.querySelector("#text_task");
      this.location = document.querySelector("#location");
      this.show_location = document.querySelector("#show_location");
    }
    showCreatedTask(service, order, text, createDate) {
      this.text_task.innerText = `I need a ${service}  to ${order} , ${text}.`;
      let createdTask = this.text_task.innerText;
      this.show_location.innerText = `My adress is ${this.location.value}`;
      let item = new NewTask(createdTask, createDate);
      this.location.value = "";
    }
  }

  /***************model********* */
  class CreateTask_model {
    constructor(newTask_view) {
      this.service;
      this.order;
      this.text;
    }
    getChooseServise(service) {
      this.service = service;
    }
    getChooseOrder(order) {
      this.order = order;
      console.log(order);
    }
    getTaskDescriptionText(text) {
      this.text = text;
      this.sendTask();
    }
    sendTask() {
      let service = this.service;
      let order = this.order;
      let text = this.text;
      this.createTask(service, order, text);
    }
    createTask(service, order, text) {
      let dateText = new DateTask();
      console.log(dateText.dateTask);
      let createDate = dateText.dateTask;
      newTask_view.showCreatedTask(service, order, text, createDate);
      this.saveTask(service, order, text, createDate);
    }
    saveTask(service, order, text, createDate) {
      let save = [service, order, text, createDate];
      save = JSON.stringify(save);
      localStorage.setItem(createDate, save);
    }
  }

  /***************controller********* */
  class Controller {
    constructor(createTask_model) {
      this.newTaskAdd = document.querySelector(".newTaskAdd");
      this.serviceOrder = document.querySelector(".serviceOrder");
      this.newTaskAdd.addEventListener("click", () =>
        this.addServiceOrder(this.serviceOrder)
      );
      this.serviceType = document.querySelector(".serviceType");
      this.serviceType.addEventListener("click", this.chooseServise);
      this.serviceOrder_plumber = document.querySelector(
        ".serviceOrder_plumber"
      );
      this.serviceOrder_plumber.addEventListener("click", this.chooseOrder);

      this.createNewTask = document.querySelector("#createNewTask");
      this.createNewTask.addEventListener("click", this.showNewTask);
    }
    addServiceOrder(serviceOrder) {
      serviceOrder.classList.toggle("serviceOrder_hidden");
    }
    chooseServise(e) {
      let element = e.target;
      let service = element.className;
      createTask_model.getChooseServise(service);
    }
    chooseOrder(e) {
      let element = e.target;
      let order = element.innerText;
      createTask_model.getChooseOrder(order);
    }

    showNewTask() {
      this.taskDescriptionText = document.querySelector("#taskDescriptionText");
      let text = this.taskDescriptionText.value;
      createTask_model.getTaskDescriptionText(text);
      this.taskDescriptionText.value = "";
    }
  }

  /* *****************show task *********************/

  class NewTask {
    constructor(text_task, dateTask) {
      let newTask = document.querySelector(".newTask");
      let taskList = document.createElement("div");
      taskList.className = "newTask_task";
      taskList.innerHTML = `
        <p>${dateTask}</p>
        <p>${text_task}</p>
        <button>EDIT</button>
        <button>DELETE</button>
      `;
      newTask.appendChild(taskList);
    }
  }

  /*date */
  class DateTask {
    constructor() {
      this.monthList = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      this.dateTask;
      this.newDataTask();
    }
    newDataTask() {
      let date = new Date();
      this.dateTask = `${
        this.monthList[date.getMonth()]
      }, ${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`;
    }
  }

  /******************************** Start program ********************** */
  const newTask_view = new NewTask_view();
  const createTask_model = new CreateTask_model(newTask_view);
  const controller = new Controller(createTask_model);
});
