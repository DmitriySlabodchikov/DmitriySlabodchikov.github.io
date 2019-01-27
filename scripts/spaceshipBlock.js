const blocks = document.querySelectorAll(".divTableCell");
blocks.forEach(function(item){
	item.addEventListener("click", select, false);
});

let last;

function select(e){
	if(last)
		last.classList.remove("selected");
	this.classList.add("selected");
	last = this;
}