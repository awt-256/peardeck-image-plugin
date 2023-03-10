!(() => {
const db = firebase.apps[0].services_.database['[DEFAULT]'];
const onPath = async path => {
    // fetch latest canvas, and append a drawing to it
    const response = db.ref(path);
    const snapshot = await response.once('value');
    const val = snapshot.val();
    if (!val) return alert("Please draw on the canvas atleast once before you run");

    // Might not be the best way to append. It works though
    db.ref(path + '/shapes/' + val.shapes.length).set({
        type: "image",
        mimeType: "image/svg+xml",
        historyId: Date.now(),
        // default sizes of viewbox
        height: 562.5,
        width: 1000,
        top: 10,
        left: 10,
        src: prompt("Please input image url")
    }, () => {
        if (!confirm("The results are not updated on your browser yet. Press OK to refresh page")) return alert("Auto page refresh cancelled. You will not see the image until you refresh.");

        location.reload();
    });
}

// Injector
const _ref = db.ref;
db.ref = function(...arg) { 
    if (arg[0].includes('studentResponses')) {
        db.ref = _ref;
        onPath(arg[0]);
    }
    return r.call(this, ...arg);
}
})();
