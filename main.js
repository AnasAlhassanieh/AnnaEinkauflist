// Hier wird ein Array 'Einkaufsliste' erstellt, das Einkaufsartikel enthält.
let Einkaufsliste = ["Milch","Brot","Eier","Bananen","Äpfel","Nudeln","Hühnchen","Reis","Tomaten","Kartoffeln","Salz","Orangensaft","Joghurt",]; 

// Hier wird ein leeres Array 'gekauftArr' erstellt, das später gekaufte Artikel enthält.
let gekauftArr = [];

// Hier wird eine Variable 'ExtraEvent' deklariert, die später als Zwischen speicher verwendet wird.
let ExtraEvent;

// Die folgende Funktion wird aufgerufen, wenn die Webseite vollständig geladen ist.
window.onload = function() {
    kaufListe()
};

// Die folgende Funktion rendert die Liste der Artikel im HTML-Dokument.
function ItemLsit(arr){
    
    let ItemList = document.querySelector(".list-container");
    ItemList.innerHTML = "";
    arr.forEach(element => {
        ItemList.innerHTML += getItem(element)
    });
}
// Die folgende Funktion zeigt die Liste der gekauften Artikel an.
function gekauftListe(){ItemLsit(gekauftArr)}

// Die folgende Funktion zeigt die Liste der Einkaufsartikel an.
function kaufListe(){ItemLsit(Einkaufsliste)}


// Die folgende Funktion verschiebt einen Artikel von der Einkaufsliste zu den gekauften Artikeln.
function ItemToGekauft(event){
    console.log("1",event.target)
    console.log("2",event.target.id)
    if(event.target.id !== "" || event.target.id !== "<empty string>"){
        gekauftArr.unshift(event.target.id)
        Einkaufsliste.splice(Einkaufsliste.indexOf(event.target.id), 1);
    }
    gekauftListe()
}

// Die folgende Funktion löscht einen Artikel aus der Einkaufsliste und aus der gekauftArr
function loschen(event){
    gekauftArr.splice(gekauftArr.indexOf(event.target.id), 1);
    Einkaufsliste.splice(Einkaufsliste.indexOf(event.target.id), 1);
    kaufListe()
}

// Die folgende Funktion ermöglicht die Bearbeitung eines Artikels.
function SubEdit(event)
{
    let body = document.getElementById("body");
    body.innerHTML = CustomPrompt() + body.innerHTML;
    ExtraEvent = event.target.id;
}

// Die folgende Funktion aktualisiert den bearbeiteten Artikel in der Liste.
function edit(){
    let newItem = document.getElementById("prompt").value;
    if(newItem !== null){
        gekauftArr[gekauftArr.indexOf(ExtraEvent)] = newItem;
        Einkaufsliste[Einkaufsliste.indexOf(ExtraEvent)] = newItem;
    }

    kaufListe();
    document.getElementById("our-prompt").style.display = "none";
}

// Die folgende Funktion fügt einen neuen Artikel zur Einkaufsliste hinzu.
function add(){
    let newItem = document.getElementById("input").value;
    newItem === "" || newItem === null ? alert("Bitte eindutige Eingabe") : Einkaufsliste.unshift(newItem);
    document.getElementById("input").value = "";
    kaufListe()
}

// Die folgende Funktion generiert das HTML für einen einzelnen Artikel.
function getItem(Innertext){
    return `
            <div class="Item" id="Item">
            <div id="ItemName">
                <h2>${Innertext}</h2>
            </div>
                <div>
                    <button onclick="loschen(event)"><i class="fa-solid fa-trash" id="${Innertext}"></i></button>
                    <button onclick="SubEdit(event)"><i class="fa-solid fa-pen-to-square" id="${Innertext}"></i></button>
                    <button onclick="ItemToGekauft(event)" id="${Innertext}"><i class="fa-solid fa-check" id="${Innertext}"></i></button>
                </div>
            </div>
    `
}

// Die folgende Funktion generiert ein benutzerdefiniertes Eingabefeld für die Artikelbearbeitung.
function CustomPrompt(){
    return`
        <div class="our-prompt" id="our-prompt">
            <div class="container">
                <div class="prompt-container">
                    <div>
                        <input type="text" id="prompt" placeholder="neuer Benamung">
                    </div>
                    <div>
                        <button onclick="edit()">ändern</button>
                    </div>
                </div>
            </div>
        </div>  
    `
}

