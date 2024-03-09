import FullList from "../models/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  static instance: ListTemplate = new ListTemplate();
  ul: HTMLUListElement;
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }
  clear(): void {
    this.ul.innerHTML = "";
  }
  render(fullList: FullList): void {
    this.clear();
    fullList.list.forEach((item) => {
      const li = document.createElement("li");
      li.className = "item";

      const checkBox = document.createElement("input") as HTMLInputElement;
      checkBox.type = "checkbox";
      checkBox.id = item.id;
      checkBox.checked = item.checked;

      li.appendChild(checkBox);

      checkBox.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.title;

      li.appendChild(label);

      const deleteBtn = document.createElement("button") as HTMLButtonElement;
      deleteBtn.className = "button";
      deleteBtn.textContent = "X";
      li.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      this.ul.append(li);
    });
  }
}
