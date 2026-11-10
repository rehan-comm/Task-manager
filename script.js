const dropdown = document.querySelector(".dropdown");
const selected = document.querySelector(".categori span");
const filter = document.querySelector(".filter");
const filterText = filter.querySelector("span");
const input = document.querySelector(".input-task")
const categori = document.querySelector("#categori")
const submit = document.querySelector(".add-task")
const p_count = document.querySelector(".p-count");
const tasks = document.querySelector("#tasks")
const pending_icon = `<i class="ri-loader-2-fill"></i>`
const completed_icon = `<i class="ri-check-fill"></i>`
const option = document.querySelector(".cate-option")
const task_icon = document.querySelector(".task-icon")
const complete_btn = document.querySelector(".complete")
const c_count = document.querySelector(".complete-count");
var count = Number(p_count.textContent);
var com_count = Number(c_count.textContent);
let delete_btn = document.querySelector(".delete");

const themeToggle = document.querySelector(".switch input");

const applyTheme = (theme) => {
    document.body.classList.toggle("dark", theme === "dark");
    themeToggle.checked = theme === "dark";
    localStorage.setItem("theme", theme);
};

const savedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

applyTheme(savedTheme);

themeToggle.addEventListener("change", () => {
    applyTheme(themeToggle.checked ? "dark" : "light");
});

const update_pending_count = () => {
    count++;
    p_count.textContent = count;
}

const update_complete_count = () => {
    com_count++;
    c_count.textContent = com_count;
    count--;
    p_count.textContent = count;
}

const undo = () => {
    count++;
    p_count.textContent = count;
    com_count--;
    c_count.textContent = com_count;
}

const task_delete = (e) => {
    const del_btn = e.target.closest(".delete");
    if (!del_btn) return;

    const del_task = del_btn.closest(".task");
    del_task.remove();
    count--;
    p_count.textContent = count;
}

const edit = (e) => {
    const btn = e.target.closest(".edit");
    if (!btn) return;

    const task_name = btn.closest(".task").querySelector(".task-name");

    let inp_val = prompt("Change the name");
    if (inp_val !== null && inp_val.trim() !== "") {
        task_name.textContent = inp_val;
    }
}


function categoriColor() {
    if (option.value === "work") {
        option.classList.add("work");
    } else if (option.value === "study") {
        option.classList.add("study");
    } else if (option.value === "shopping") {
        option.classList.add("shopping");
    } else {
        console.log("No Color");
    }
}
tasks.addEventListener("click", (e) => {
    task_delete(e);
});

tasks.addEventListener("click", (e) => {
    edit(e)
});
const search_task = document.querySelector(".search-task");
const searchInput =
    search_task.tagName === "INPUT"
        ? search_task
        : search_task.querySelector("input");

const filterBtn = document.querySelector(".filter");
const filterLabel = filterBtn.querySelector("span");
const filterDropdown = document.querySelector(".filter-dropdown");
const filterOptions = document.querySelectorAll(".filter-option");

let selectedCategory = "All Categories";
function applyFilters() {
    const searchValue = searchInput.value.toLowerCase().trim();

    document.querySelectorAll(".task").forEach((task) => {
        const nameEl = task.querySelector(".task-name");
        const categoryEl = task.querySelector(".cate-option");

        if (!nameEl || !categoryEl) return;

        const taskName = nameEl.textContent.toLowerCase();
        const taskCategory = categoryEl.textContent.trim().toLowerCase();

        const matchesSearch = taskName.includes(searchValue);

        const matchesCategory =
            selectedCategory === "All Categories" ||
            taskCategory.includes(selectedCategory.toLowerCase());

        task.style.display =
            matchesSearch && matchesCategory ? "flex" : "none";
    });
}

const clearall = document.querySelector(".clearall")


clearall.addEventListener("click", () => {
    tasks.innerHTML = "";
    p_count.textContent = 0;
    c_count.textContent = 0;
    count = 0;
});

searchInput.addEventListener("input", applyFilters);

filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    filterDropdown.classList.toggle("show");
});

filterOptions.forEach((option) => {
    option.addEventListener("click", () => {
        selectedCategory = option.textContent.trim();
        filterLabel.textContent = selectedCategory;
        filterDropdown.classList.remove("show");
        applyFilters();
    });
});

document.addEventListener("click", () => {
    filterDropdown.classList.remove("show");
});

const changeIcon = () => {
    tasks.addEventListener("click", (e) => {
        const btn = e.target.closest(".complete")
        if (!btn) return
        const icon = btn.closest(".task").querySelector(".task-icon")
        const task_name = btn.closest(".task").querySelector("h2");
        icon.classList.contains("ri-loader-2-fill")
            ? (
                icon.classList.replace("ri-loader-2-fill", "ri-checkbox-circle-fill"),
                icon.style.color = "green",
                btn.innerHTML = `<i class="ri-arrow-go-back-line"></i> Undo`,
                task_name.style.textDecoration = "line-through",
                task_name.style.color = "grey",
                btn.style.background = "rgba(46, 46, 248, 0.101)",
                btn.style.color = "blue",
                update_complete_count()
            )
            : (
                icon.classList.replace("ri-checkbox-circle-fill", "ri-loader-2-fill"),
                icon.style.color = "#6366f1",
                btn.innerHTML = `<i class="ri-check-line"></i> Complete`,
                task_name.style.textDecoration = "none",
                task_name.style.color = "black",
                btn.style.background = "#22c55e31",
                btn.style.color = "rgb(2, 162, 2)",
                undo()
            )
    })
}


const createTask = () => {
    if (input.value === "" || categori.value === "") {
        alert("Fill Input")
    } else {
        console.log("Form Submit")
        console.log(input.value, categori.value)
        tasks.insertAdjacentHTML("beforeend", `<div class="task">
            <div class="task-left">
                <i class="ri-loader-2-fill task-icon"></i>
            </div>
            <div class="task-center">
                <h2 class="task-name" >${input.value}</h2>
                <p class="${categori.value} cate-option"><i class="ri-circle-fill"></i> ${categori.value}</p>
            </div>
            <div class="task-right">
                <button class="edit"><i class="ri-pencil-line"></i> Edit</button>
                <button class="complete"><i class="ri-check-line"></i> Complete</button>
                <button class="delete"><i class="ri-delete-bin-6-line"></i> Delete</button>
            </div>
        </div>`)
        update_pending_count()
        categoriColor()
    }
}

submit.addEventListener("click", () => {
    createTask()
})

changeIcon()

filter.addEventListener("click", () => {
    filterDropdown.classList.toggle("active");
});

filterOptions.forEach((option) => {
    option.addEventListener("click", () => {
        filterText.innerText = option.innerText;
        filterDropdown.classList.remove("active");

        console.log("Selected Category:", option.innerText);
    });
});