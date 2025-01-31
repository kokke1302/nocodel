const div = document.getElementById("up-list");
const form = document.getElementById("newName");
const addname = document.getElementById("name");
const reset = document.getElementById("reset");
let setting = {};
let list = [];

function del(index){
	list = list.filter(n => n !== list[index]);

	setting = {up: list}
	chrome.storage.local.set(setting);
	chdiv();
}

function chdiv(){
	while(div.firstElementChild) div.removeChild(div.firstElementChild);

	list.forEach((up, index)=>{
		let tr = document.createElement("tr");
		let td1 = document.createElement("td");
		let td2 = document.createElement("td");
		let btn = document.createElement("button");

		let str = "uptr" + index;
		btn.type = "submit";
		btn.addEventListener("click", ()=>{del(index)});
		btn.textContent = "X";
		td1.textContent = up;
		tr.id = str;

		td2.appendChild(btn);
		tr.appendChild(td1);
		tr.appendChild(td2);
		div.appendChild(tr);
	})
}

async function first(){
	setting = await chrome.storage.local.get();
	if(setting.up!=null) list = setting.up;
	chdiv();
}

first();

form.addEventListener("submit", (e)=>{
	e.preventDefault();

	if(list.indexOf(addname.value)===-1 && addname.value!="") list.push(addname.value);
	setting = {up: list}
	chrome.storage.local.set(setting);
	addname.value = null;
	chdiv();
})

reset.addEventListener("click", ()=>{
	chrome.storage.local.clear();
	setting = {};
	list = [];
	chdiv();
})