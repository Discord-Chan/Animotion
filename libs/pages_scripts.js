export function GoTo(link) {
    window.location.href = link;
}

export function SelectModel(model) {
    window.localStorage.setItem("vrm", model);
    GoTo("webapp/index.html");
}

export const concat = (...classNames) => classNames.join(' ');
