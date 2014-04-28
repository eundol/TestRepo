var w;

function iframeLoaded() {
    w = document.getElementById('webapp').contentWindow;
    // w.android = {};
    // w.android.sendData = function(data) {
    //     console.log("sendData: " + data);
    // }
}

function clickBtnUp() {
    console.log("Up");
}

function clickBtnCenter() {
    console.log("Center");
}

function clickBtnDown() {
    console.log("Down");
}

function function1() {
    console.log("Function1");
}

function function2() {
    console.log("Function2");
}
