const input = document.querySelector('.form_wrap input[type="text"]');
const list = document.querySelector('.form_wrap .list');
const clearBtn = document.querySelector('button.clear');
const status = document.querySelector('.status');
const btns = document.querySelector('.btn_wrap .sort');
let itemCount = 0;

function clearList(){
    list.innerHTML = '';
    itemCount = 0;
    updateStatus();
}

function updateStatus(){
    if (itemCount < 0) {
        itemCount = 0;
    }

    if (itemCount === 0) {
        status.innerText = `No items left`;
    } else if (itemCount === 1)
    {
        status.innerText = `${itemCount} items left`;
    } else {
        status.innerText = `${itemCount} items left`;
    }
    
}

function sendValue() {
    if (input.value !== '') {
        const li = document.createElement('li');
        li.innerHTML = `<span>${input.value}</span> <button>삭제</button>`;
        list.appendChild(li);
        input.value = ""; 
        ++itemCount;  
        updateStatus();
    }
}

function deleteList(e){
    // if line-through 지울 경우 --> itemCount 감소하지 X
    if(e.target.parentNode.children[0].style.textDecoration !== "line-through"){
        --itemCount;
    }
    e.target.parentNode.remove();
    updateStatus();
}
                                   
function finishList(e)
{
    // how to set data attribute
    // https://stackoverflow.com/questions/11286661/set-custom-attribute-using-javascript
    var curState = e.target.style.textDecoration;
    if (curState === "line-through") {
        e.target.style.textDecoration = "none";
        ++itemCount;    
    } else {
        e.target.style.textDecoration = "line-through";   
        --itemCount; 
    }
    updateStatus();
}

function handleList(e){
    switch(e.target.nodeName)
    {
        case "BUTTON":
            deleteList(e);
        break;
        case "SPAN":
            finishList(e);
        break;
    }
}

function sortList(e)
{
    for (let index = 0; index < list.children.length; index++) {
        switch(e.target.id)
        {
            case 'all':
                console.log('all');
                list.children[index].style.height = "auto";
            break;
            case 'active':
                if(list.children[index].children[0].style.textDecoration === "line-through"){list.children[index].style.height = 0;}
                else {list.children[index].style.height = "auto";}
            break;
            case 'completed':
                if(list.children[index].children[0].style.textDecoration !== "line-through"){list.children[index].style.height = 0;}
                else {list.children[index].style.height = "auto";}
            break;
            default:
            return;
        }
    }
    
}

input.addEventListener('blur', sendValue);
input.addEventListener('keypress', function(e){
    if(e.key === 'Enter') sendValue();
});
list.addEventListener("click", handleList);


clearBtn.addEventListener('click', clearList);
btns.addEventListener('click', sortList);