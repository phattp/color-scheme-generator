const getColorBtn = document.getElementById("get-color-btn");

document.addEventListener("click", (e) => {
  if (e.target.dataset.colorText) {
    copyColorCode(e.target.dataset.colorText);
  } else if (e.target.dataset.colorDiv) {
    copyColorCode(e.target.dataset.colorDiv);
  }
});

getColorBtn.addEventListener("click", () => {
  const colorPicker = document
    .getElementById("color-picker")
    .value.substring(1);
  const colorMode = document.getElementById("color-mode").value;

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorPicker}&mode=${colorMode}&count=5`
  )
    .then((response) => response.json())
    .then((data) => renderColorScheme(data));
});

function renderColorScheme(colorData) {
  let colorHtml = "";
  colorData.colors.forEach((color) => {
    colorHtml += `
        <div class="color-container">
          <div class="color" style="background-color: ${color.hex.value}" data-color-div="${color.hex.value}"></div>
          <p class="color-text" data-color-text="${color.hex.value}">${color.hex.value}</p>
        </div>
    `;
  });
  document.querySelector("main").innerHTML = colorHtml;
}

function copyColorCode(colorCode) {
  navigator.clipboard.writeText(colorCode);

  // create notification
  let alertHtml = `
    <div class="check">
      Copied! ${colorCode}
    </div>
  `;

  const centerElement = document.getElementById("center");
  centerElement.innerHTML = alertHtml;

  // Find main element and calculate center position
  const mainElement = document.querySelector("main");
  const mainRect = mainElement.getBoundingClientRect();
  const viewportX = mainRect.left + mainRect.width / 2;
  const viewportY = mainRect.top + mainRect.height / 2;

  // Specify centerElement to fixed at the center of main element
  centerElement.style.position = "fixed";
  centerElement.style.top = viewportY + "px";
  centerElement.style.left = viewportX + "px";
  centerElement.style.transform = "translate(-50%, -50%)";
  centerElement.style.zIndex = "1000";

  setTimeout(() => {
    centerElement.innerHTML = "";
  }, 1500);
}
