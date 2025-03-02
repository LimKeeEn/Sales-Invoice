let dateInput = document.getElementById('js-inputDate');

let savedDate = localStorage.getItem('selectedDate');
if (savedDate) {
    dateInput.value = savedDate;
    dateInput.classList.add('date-set');
}
dateInput.addEventListener ('change', () => {
    if (dateInput.value) {
        dateInput.classList.add('date-set');
        localStorage.setItem('selectedDate',dateInput.value);
    } else {
        dateInput.classList.remove('date-set');
        localStorage.removeItem('selectedDate');
    }
});

let itemList = JSON.parse(localStorage.getItem('itemList')) || [];

function addItem () {
    let inputName = document.querySelector('.js-inputName');
    let itemName = inputName.value;

    let inputQuan = document.querySelector('.js-inputQuan');
    let itemQuan = inputQuan.value;

    let inputUOM = document.querySelector('.js-UOM');
    let itemUOM = inputUOM.value;

    let inputPricePerItem = document.querySelector('.js-pricePerItem');
    let priceUnit = inputPricePerItem.value;

    itemList.push(
        {
            nameObj: itemName,
            quanObj: itemQuan,
            uomObj: itemUOM,
            priceObj: priceUnit,
            totalObj: (itemQuan * priceUnit).toFixed(2)
        }
    );

    localStorage.setItem('itemList',JSON.stringify(itemList));

    inputName.value = '';
    inputQuan.value = '';
    inputPricePerItem.value = '';

    listArray();
}

function listArray () {
    let listHTML = '';
    let totalPrice = 0;
    
    for(let i=0;i<itemList.length;i++) {
        let listObj = itemList[i];
        let name = listObj.nameObj;
        let quantity = listObj.quanObj;
        let UOM = listObj.uomObj;
        let price = listObj.priceObj;
        let priceOfItem = listObj.totalObj;

        totalPrice += Number(priceOfItem);

        listHTML += `
            <div>${i+1}</div>
            <div>${name}</div>
            <div>${quantity}</div>
            <div>${UOM}</div>
            <div>${price}</div>
            <div>${priceOfItem}</div>

            <button class="deleteButton" onclick='
                deleteItem(${i});
                '>
                <img src="red-dustbin.jpg" width="50" height="50">
                </button>
        `;       
    }
    document.querySelector('.js-itemList').innerHTML = listHTML;

    let discountInput = document.getElementById('discount-value'); 
    let discountPrice = discountInput && discountInput.value ? Number(discountInput.value) : 0;
    document.querySelector('.js-total').innerHTML = `Total Price: `+ (totalPrice - discountPrice).toFixed(2);
}

function deleteItem (index) {
    itemList.splice(index,1);
    localStorage.setItem('itemList',JSON.stringify(itemList));
    listArray();
}

function clearAll () {
    itemList = [];
    localStorage.setItem('itemList',JSON.stringify(itemList));
    listArray();
}

document.addEventListener('DOMContentLoaded',listArray);

//Discount
document.getElementById('discount-checkbox').addEventListener('change', function() {
    let discountContainer = document.getElementById('input-discount');

    if(this.checked) {
        discountContainer.style.display = 'block';
    }else {
        discountContainer.style.display = 'none';
        document.getElementById('discount-value').value = "";
        localStorage.removeItem('discountValue');
        listArray(); //For unclick the discount checkbox
    }
});

document.getElementById('discount-value').addEventListener('input', function () {
    listArray(); // Recalculate total price with the updated discount
    localStorage.setItem('discountValue', this.value);
});

function previewButton () {
    window.location.href = 'pdf.html';
}