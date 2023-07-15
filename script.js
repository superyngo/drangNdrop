const lists = document.querySelectorAll(".list");
const list_items = document.querySelectorAll(".list_item");

const getDragAfterElement = function (draggingTarget, clientY) {
  const children = [
    ...draggingTarget.querySelectorAll(".list_item:not(.dragging)"),
  ];
  // console.log(children, clientY);
  return children.reduce(
    (target, li) => {
      const box = li.getBoundingClientRect();
      const offset = box.bottom - box.height / 2 - clientY;
      // console.log(clientY, box.bottom, box.height / 2, offset);
      if (offset >= 0 && offset <= target.offset)
        return {offset: offset, element: li};
      return target;
    },
    {offset: Number.POSITIVE_INFINITY}
  ).element;
};

//dragging target
for (let li of lists) {
  li.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggedItem = document.querySelector(".dragging");
    const target = getDragAfterElement(li, e.clientY);
    console.log(target);
    if (target) {
      li.insertBefore(draggedItem, target);
    } else {
      li.appendChild(draggedItem);
    }
  });

  li.addEventListener("dragenter", (e) => {
    li.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  });
  li.addEventListener("dragleave", (e) => {
    li.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
  });
  li.addEventListener("drop", (e) => {
    li.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
  });
}

//dragged item
for (let li of list_items) {
  li.addEventListener("dragstart", function () {
    li.classList.add("dragging");
  });

  li.addEventListener("dragend", function () {
    li.classList.remove("dragging");
  });
}
