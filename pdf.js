let selectedDate = localStorage.getItem('selectedDate');
if(selectedDate) {
    document.querySelector('.js-dateInput').innerHTML = `${selectedDate}`;
}

let itemList = JSON.parse(localStorage.getItem('itemList')) || [];

let itemListContainer = document.querySelector('.js-pdfItemList');

let listHTML = '';
let totalPrice = 0;

for (let i=0;i<itemList.length;i++) {
    let item = itemList[i]; //get the current item
    listHTML += `
        <div>${i+1}</div>
        <div>${item.nameObj}</div>
        <div>${item.quanObj}</div>
        <div>${item.uomObj}</div>
        <div>${item.priceObj}</div>
        <div class="lineTotal">${item.totalObj}</div>
    `
    totalPrice += Number(item.totalObj);
}

itemListContainer.innerHTML = listHTML;

let totalDiscount = localStorage.getItem('discountValue');
document.querySelector('.js-subtotal').innerHTML = totalPrice.toFixed(2);
document.querySelector('.js-discount').innerHTML = Number(totalDiscount).toFixed(2);
document.querySelector('.js-totalPrice').innerHTML = (totalPrice - totalDiscount).toFixed(2);

// Add event listener to the download button
document.getElementById("download-pdf").addEventListener("click", function () {
    // Select the content to be converted into PDF
    const content = document.getElementById("pdf-content");

    // Create a wrapper to ensure footer placement
    const pdfWrapper = document.createElement("div");
    pdfWrapper.style.display = "flex";
    pdfWrapper.style.flexDirection = "column";
    pdfWrapper.style.justifyContent = "space-between";
    pdfWrapper.style.minHeight = "11in"; // PDF page height
    pdfWrapper.style.padding = "0.5in"; // Padding for consistent spacing
    pdfWrapper.style.boxSizing = "border-box";

    // Clone the content into the wrapper
    pdfWrapper.innerHTML = content.innerHTML;

    // Temporarily append the wrapper to the document body
    document.body.appendChild(pdfWrapper);

    // Configure options for html2pdf
    const options = {
        margin: 0,
        filename: 'Sales_Invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate the PDF and trigger download
    html2pdf()
        .set(options)
        .from(pdfWrapper)
        .save()
        .then(() => {
            // Remove the temporary wrapper after generating the PDF
            pdfWrapper.remove();
        });
});