const getColorBtn = document.getElementById("get-color-btn");

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
          <div class="color" style="background-color: ${color.hex.value}"></div>
          <p class="color-text">${color.hex.value}</p>
        </div>
    `;
  });
  document.querySelector("main").innerHTML = colorHtml;
}
