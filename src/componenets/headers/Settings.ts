import MainSetting from "./MainSetting";
// import MoreSetting from "./MoreSetting";

export default function Settings(){
  const div = document.createElement("div")
  div.innerHTML = `
    <div class="setting-section">
      ${MainSetting()}
    </div>
  `;
  return div.innerHTML;
}