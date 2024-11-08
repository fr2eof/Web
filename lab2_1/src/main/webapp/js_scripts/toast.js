function launch_toast(message) {
    const toast = document.getElementById("toast");
    const descElement = document.getElementById('desc');

    descElement.innerHTML = '';
    const paragraph = document.createElement('p');
    paragraph.textContent = message;

    descElement.appendChild(paragraph);
    toast.className = "show";
    setTimeout(function () {
        toast.className = toast.className.replace("show", "");
    }, 5000);
}