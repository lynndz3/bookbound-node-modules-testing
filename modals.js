export function clearModal() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.getElementById("genre").value = "none";
    document.querySelector("#reader").value = "";
    document.querySelector("#rating").value = "none";
    document.querySelector("#comments").value = "";
  }