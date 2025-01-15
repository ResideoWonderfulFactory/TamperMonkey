// ==UserScript==
// @name         Copy Table Row Data on Button Click
// @namespace    http://tampermonkey.net/
// @version      1.3b
// @description  Copy data from the first row to a new row in a table
// @author       You
// @match        https://beta.inet-logistics.com/ls/vsa/servlet/SendungBearbeitung*
// @grant        none
// @downloadURL  https://www.dropbox.com/scl/fi/o2ibfkamlo06gx0i6gtsq/Copy-Table-Row-Data-on-Button-Click-1.0.user.js?rlkey=i4ysybaer1hvzm9zgqevuha0x&st=dvjd9a6n&dl=0
// @updateURL    https://www.dropbox.com/scl/fi/o2ibfkamlo06gx0i6gtsq/Copy-Table-Row-Data-on-Button-Click-1.0.user.js?rlkey=i4ysybaer1hvzm9zgqevuha0x&st=dvjd9a6n&dl=0
// ==/UserScript==

(function () {
    'use strict'; 
    const debug=false;

    // Show the menu when right-clicking on a button with a specific ID
    document.addEventListener("contextmenu", function (event) {
        const target = event.target;
        const rightclickbutton = target.parentElement.parentElement.parentElement;
        const linenumber = rightclickbutton.id.match(/\d+$/)[0];

        if (debug)alert("Title: " + target.title);

        if (rightclickbutton.id.includes("K_") && target.title === "New lines" ) {
            const numbertocopy = document.querySelector("#elmtKolliK_"+ linenumber + "_Anzahl").value-1

            if ( numbertocopy >0 ) {
                event.preventDefault(); // Prevent the default context menu
                const copyData = confirm('Do you want to copy data from this row and generate ' + numbertocopy + ' lines at the end of the table?' + String.fromCharCode(13) + 'Attention the weight and dims you entered is for each parcel.');

                if (copyData) {
                    const newRow = document.querySelector('#TableKolli > tbody.allKolli').lastElementChild.previousElementSibling;
                    const lastline = newRow.id.match(/\d+$/)[0];

                    document.querySelector("#elmtKolliK_"+ linenumber + "_Anzahl").value = 1;

                    for (let nline = parseInt(lastline)+1; nline <= (parseInt(numbertocopy) + parseInt(lastline)); nline++) {
                        const line = nline.toString();
                        clickGuiButton('BtnKolliMehrZeilenBtnSubkolliMehrZeilen0');

                        document.querySelector("#elmtKolliK_"+ line + "_Inhalt").value = document.querySelector("#elmtKolliK_"+ linenumber + "_Inhalt").value;
                        document.querySelector("#elmtKolliK_"+ line + "_Kolli").value = document.querySelector("#elmtKolliK_"+ linenumber + "_Kolli").value;
                        document.querySelector("#elmtKolliK_"+ line + "_TareWeight").value = document.querySelector("#elmtKolliK_"+ linenumber + "_TareWeight").value;
                        document.querySelector("#elmtKolliK_"+ line + "_Lmm").value = document.querySelector("#elmtKolliK_"+ linenumber + "_Lmm").value;
                        document.querySelector("#elmtKolliK_"+ line + "_Bmm").value = document.querySelector("#elmtKolliK_"+ linenumber + "_Bmm").value;
                        document.querySelector("#elmtKolliK_"+ line + "_Hmm").value = document.querySelector("#elmtKolliK_"+ linenumber + "_Hmm").value;
                        document.querySelector("#elmtKolliK_"+ line + "_Stapelfaktor").value = document.querySelector("#elmtKolliK_"+ linenumber + "_Stapelfaktor").value;
                        document.querySelector("#elmtKolliK_"+ line + "_Signo").value = document.querySelector("#elmtKolliK_"+ linenumber + "_Signo").value;
                        document.querySelector("#elmtKolliK_"+ line + "_Gewicht").value = document.querySelector("#elmtKolliK_"+ linenumber + "_Gewicht").value;
                        document.querySelector("#elmtKolliK_"+ line + "_Anzahl").value = 1;
                    }
                }
            } else {
                alert("Check the number of duplicates of this parcel you need");
            }
            event.preventDefault(); // Prevent the default context menu
        } else {

        }
    });

    // Hide the menu when clicking elsewhere
    document.addEventListener("click", function () {
        menuItem.style.display = "none";
    });

    // Trigger your custom function when clicking the menu item
    menuItem.addEventListener("click", function () {
        alert("Custom button action triggered!");
        yourCustomFunction();
        menuItem.style.display = "none"; // Hide the menu after selection
    });

    // Define your custom function
    function yourCustomFunction() {
        console.log("Custom action executed for the button!");
        // Add your custom code here


        //     const copyData0 = alert('Running 1');

        // Wait for the page to load
        // window.addEventListener('load', function() {


    }
})();
