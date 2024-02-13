import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from "./localstorage.js";

// IDs
let inputName = document.getElementById("inputName");
let addNameBtn = document.getElementById("addNameBtn");

let inputGroupSize = document.getElementById("inputGroupSize");
let inputGroupNum = document.getElementById("inputGroupNum");
let generateBtn = document.getElementById("generateBtn");

let nameTotal = document.getElementById("nameTotal");
let nameContainer = document.getElementById("nameContainer");
let modalGroupsDiv = document.getElementById("modalGroupsDiv");
const modal = document.getElementById('modalGroups');

// Creating Name Elements Function
function createNameTable(name) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add("row", "text-center", "pt-3", "pb-2");

    let nameDiv = document.createElement('div');
    nameDiv.classList.add("col-6");

    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add("col-6");

    let p = document.createElement('p');
    p.textContent = name;

    let button = document.createElement('button');
    button.innerHTML = "Remove"
    button.classList.add("btn", "btn-danger", "btn-sm");

    nameDiv.appendChild(p);
    buttonDiv.appendChild(button);
    rowDiv.append(nameDiv, buttonDiv);
    nameContainer.appendChild(rowDiv);

    button.addEventListener('click', () => {
        removeFromLocalStorage(name);
        populate();
    });
}

// Populate Page
function populate() {
    let nameCount = 0;
    let nameArr = getLocalStorage();
    nameContainer.innerHTML = "";

    nameArr.forEach(name => {
        createNameTable(name);
        nameCount++;
    });

    nameTotal.textContent = nameCount;
    inputGroupSize.max = nameCount;
    inputGroupNum.max = nameCount;
}

// Onload
window.addEventListener('load', function () {
    populate();
});

// Add Names
addNameBtn.addEventListener('click', () => {
    if (inputName.value) {
        saveToLocalStorage(inputName.value);
    }

    populate();
});

// Create Group Elements Function
function createGroupModal(groupArr) {
    let div = document.createElement('div');
    div.classList.add("text-center", "py-2");

    let h = document.createElement('h6');
    h.textContent = "Team:";

    let p = document.createElement('p');
    p.textContent = groupArr.join(", ");

    div.append(h, p);
    modalGroupsDiv.appendChild(div);
}

// Populate Modal
function populateModal() {
    let nameArr = getLocalStorage();
    console.log(nameArr);
    let shuffledNames = shuffle([...nameArr]); // Use the spread operator to create a copy before shuffling
    console.log(shuffledNames);
    let nameTotal = shuffledNames.length;
    console.log(nameTotal);
    let groupsArr = [];
    console.log(groupsArr);


    nameContainer.innerHTML = "";

    if (inputGroupSize.value > 0) {
        console.log("the first ran");
        let groupSize = inputGroupSize.value;

        if (nameTotal % groupSize === 0) {
            let groups = nameTotal / groupSize;
            groupsArr = createEmptyArrays(groups);
        } else {
            let newGroupSize = groupSize;
            // Adjust new group size to the next lowest divisor
            while (nameTotal % newGroupSize !== 0) {
                newGroupSize--;
                if(newGroupSize == groupSize){
                    break;
                }
            }
            let groups = nameTotal / newGroupSize;
            console.log(groups);
            groupsArr = createEmptyArrays(groups);
            console.log(groupsArr);

        }

    } else if (inputGroupNum.value > 0) {
        console.log("group number 2 ran");
        let groupNum = inputGroupNum.value;
        console.log(groupNum);
        let test = createEmptyArrays(groupNum);
        console.log(test);
        groupsArr = createEmptyArrays(groupNum);
        console.log(groupsArr);
    }

    shuffledNames.forEach((name, index) => {
        const groupIndex = index % groupsArr.length;
        groupsArr[groupIndex].push(name);
    });

    console.log(groupsArr);

    modalGroupsDiv.innerHTML = "";
    groupsArr.map(group => {
        createGroupModal(group);
    });
}

// Generate Groups
generateBtn.addEventListener('click', () => {
    populateModal();
});

// Rerun when Modal Closes
modal.addEventListener('hidden.bs.modal', function () {
    populate();
});

// One Input Only
inputGroupSize.addEventListener('input', function () {
    inputGroupNum.value = '0';
});

inputGroupNum.addEventListener('input', function () {
    inputGroupSize.value = '0';
});


// OUTSIDE RESOURCES

// Arrows Only, No Key
inputGroupSize.addEventListener("keydown", e => e.preventDefault());
inputGroupNum.addEventListener("keydown", e => e.preventDefault());

// allow up/down keyboard cursor buttons (doesnt work!)
// inputGroupSize.addEventListener("keydown", e => e.keyCode != 38 && e.keyCode != 40 && e.preventDefault());

// Create Empty Arrays
function createEmptyArrays(n) {
    return Array.from({ length: n }, () => []);
}

// Fisher-Yates Sorting Algorithm
// This algorithm's basic premise is to iterate over the items, swapping each element in the array with a randomly selected element from the remaining un-shuffled portion of the array.
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};