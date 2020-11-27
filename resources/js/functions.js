let jsonData = null;

function DrawTable(itemNameFilter, maxAmountFilter){
    let tableBody ="";
    jsonData.sales.forEach(element => {
        if((itemNameFilter != "" && (element.Item.indexOf(itemNameFilter) != -1) || itemNameFilter == "")){
            tableBody += `<tr>
            <td>${element.OrderDate}</td>
            <td>${element.Region}</td>
            <td>${element.Rep}</td>
            <td>${element.Item}</td>
            <td>${element.Units}</td>
            <td>${element.UnitCost}</td>
            <td>${element.Total}</td>
            </tr>`;
        }
    });

    document.querySelector("#tableBody").innerHTML = tableBody;
}

function applyFilter(){
    let itemName = document.querySelector("#itemFilter").value;
    let maxAmount = document.querySelector("#maxAmount").value;
    
    DrawTable(itemName, maxAmount);
}

function loadData(){
    fetch('data/info.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        DrawTable("","");
    });

}

loadData();