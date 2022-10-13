function tabManagement(ee) {
    console.log(ee);
    tab = document.getElementById(ee);
    toggle = document.getElementById(ee + "t");
    console.log(tab.style.display == "none");
    if (tab.style.display === "none") {
        tab.style.display = "inline";
        toggle.classList.add("underline")
    } else {
        tab.style.display = "none"
        toggle.classList.remove("underline")
    };
}