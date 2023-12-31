const addToDo = document.querySelector("#addToDo");
const toDoContainer = document.querySelector("#toDoContainer");
const inputField = document.querySelector("#inputField");

const refreshPage = () => window.location.reload();

const url = "https://to-do-list-backend-lidw.onrender.com";

const start = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        const paragraph = document.createElement("p");
        paragraph.innerText = data[i].toDos;
        paragraph.classList.add("paragraph-styling");
        toDoContainer.appendChild(paragraph);

        paragraph.addEventListener("click", (e) => {
          let idFinder = "";
          if (paragraph.innerText === data[i].toDos) {
            idFinder = idFinder + data[i].id;
          }

          if (e.detail === 2) {
            paragraph.innerHTML = "";
            const editInput = document.createElement("input");
            editInput.value = data[i].toDos;
            editInput.classList.add("editInput-styling");
            paragraph.appendChild(editInput);

            const Edit = document.createElement("input");
            Edit.type = "submit";
            Edit.value = "Edit";
            Edit.classList.add("Edit-styling");
            paragraph.appendChild(Edit);

            const Delete = document.createElement("input");
            Delete.type = "submit";
            Delete.value = "Delete";
            Delete.classList.add("Edit-styling");
            paragraph.appendChild(Delete);

            Edit.addEventListener("click", () => {
              fetch(`${url}/update`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                  toDos: editInput.value,
                  id: idFinder,
                }),
              })
                .then((res) => res.json())
                .then(console.log("edited successfully"));
              refreshPage();
            });

            Delete.addEventListener("click", () => {
              fetch(`${url}/delete`, {
                method: "DELETE",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                  id: idFinder,
                }),
              })
                .then((res) => res.json())
                .then((data) => console.log(data));
              refreshPage();
            });
          }
        });
      }
      inputField.value = "";
    });
};
start();

addToDo.addEventListener("click", () => {
  if (inputField.value === "") {
    alert("Input field cant be left empty");
  } else {
    console.log(inputField.value); //displays what you are typing in to the input field
    fetch(`${url}/post`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ toDos: inputField.value }),
    })
      .then((res) => res.json())
      .then(console.log("posted successfully"));
  }
  refreshPage();
});
