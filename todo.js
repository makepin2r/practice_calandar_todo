const input = document.querySelector('.form_wrap input[type="text"]');
const list = document.querySelector('.form_wrap .list');
const clearBtn = document.querySelector('button.clear');
const status = document.querySelector('.status');
const btns = document.querySelector('.btn_wrap .sort');
let itemCount = 0;
let todoMap = new Map();

function clearList(){
    list.innerHTML = '';
    todoMap.delete(selectedDateKey);
    itemCount = 0;
    updateStatus();
    printList();
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
        // map
        if(!todoMap.has(selectedDateKey)){
            todoMap.set(selectedDateKey, []);
        }
        todoMap.get(selectedDateKey).push({
            content: input.value,
            status: "active",
        });
        console.log(todoMap);

        input.value = ""; 
        ++itemCount;  
        updateStatus();
        printList();
    }
}

function deleteList(e){
    const curArr = todoMap.get(selectedDateKey);

    // if line-through 지울 경우 --> itemCount 감소하지 X
    if(e.target.parentNode.children[0].style.textDecoration !== "line-through"){
        --itemCount;
    }
    // curArr.forEach(element => {
    //     if(element.content === e.target.parentNode.children[0].innerHTML){
    //         const idx = curArr.indexOf(element);
    //         console.log(idx);
    //         curArr.splice(idx, 1);
    //         break;
    //     }
    // });
    curArr.some(function(item, index, array){
        if(item.content === e.target.parentNode.children[0].innerHTML){
                console.log(index);
                curArr.splice(index, 1);
            }
    });
    e.target.parentNode.remove();

    // if 0 elements, remove the pair
    if(curArr.length === 0){
        todoMap.delete(selectedDateKey);
    }
    updateStatus();
}
                                   
function finishList(e)
{
    // how to set data attribute
    // https://stackoverflow.com/questions/11286661/set-custom-attribute-using-javascript
    const curArr = todoMap.get(selectedDateKey);
    // curArr.forEach(element => {
    //     if(element.content === e.target.parentNode.children[0].innerHTML){
    //         element.status = 'completed';
    //         e.target.style.textDecoration = 'line-through';
    //     }
    // });
    curArr.some(function(item, index, array){
        if(item.content === e.target.parentNode.children[0].innerHTML){
                    item.status = 'completed';
                    e.target.style.textDecoration = 'line-through';
                }
    });
    --itemCount;
    updateStatus();
    printList();
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

function printList(){
    list.innerHTML = '';
    const curArr = todoMap.get(selectedDateKey);
    if(curArr !== undefined){
        for (let i = 0; i < curArr.length; ++i) {
            const li = document.createElement('li');
            li.innerHTML = `<span>${curArr[i].content}</span> <button>삭제</button>`;
            if(curArr[i].status === "completed"){
                li.children[0].style.textDecoration = 'line-through';
            }
            list.appendChild(li);
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