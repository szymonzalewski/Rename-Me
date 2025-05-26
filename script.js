document.getElementById("uploadForm").addEventListener("submit", handleUpload);

async function handleUpload(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const picturesNames = nameInput.value.trim();
  const files = document.getElementById("files").files;

  // walidacja danych wejściowych
  if (!files.length || picturesNames === "") {
    alert("Proszę wybrać pliki i wpisać nazwę.");
    return;
  }

  // czyszcenie porzednich wyników
  document
    .querySelectorAll(".default__card, .renamed__card")
    .forEach((el) => el.remove());

  const filesArray = Array.from(files);
  const zip = new JSZip();

  const wrapper = document.createElement("div");
  wrapper.classList.add("cards__wrapper");

  // sekcja oryginalnej nazwy
  const divOriginal = document.createElement("div");
  divOriginal.classList.add("default__card");

  const h1Original = document.createElement("h1");
  h1Original.textContent = "Przesłane pliki:";
  divOriginal.appendChild(h1Original);

  filesArray.forEach((file) => {
    const span = document.createElement("span");
    span.textContent = file.name;
    span.classList.add("default__name");
    span.style.display = "block";
    divOriginal.appendChild(span);
  });

  // sekcja zminionej nazwy
  const divRenamed = document.createElement("div");
  divRenamed.classList.add("renamed__card");

  const h1Renamed = document.createElement("h1");
  h1Renamed.textContent = "Nowe pliki:";
  divRenamed.appendChild(h1Renamed);

  // Tworzenie nowych nazw + ZIP jeśli potrzeba
  if (files.length === 1) {
    const file = files[0];
    const extension = file.name.split(".").pop();
    const newName = `${picturesNames}.${extension}`;

    const renamedFile = new File([file], newName, { type: file.type });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(renamedFile);
    link.download = renamedFile.name;
    link.click();

    const spanNew = document.createElement("span");
    spanNew.textContent = newName;
    spanNew.classList.add("renamed__name");
    spanNew.style.display = "block";
    divRenamed.appendChild(spanNew);
  } else {
    for (let i = 0; i < filesArray.length; i++) {
      const file = filesArray[i];
      const extension = file.name.split(".").pop();
      const newName = `${picturesNames}_${i + 1}.${extension}`;
      zip.file(newName, file);

      const spanNew = document.createElement("span");
      spanNew.textContent = newName;
      spanNew.classList.add("renamed__name");
      spanNew.style.display = "block";
      divRenamed.appendChild(spanNew);
    }

    const zipContent = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipContent);
    link.download = `${picturesNames}.zip`;
    link.click();
  }
  wrapper.appendChild(divOriginal);
  wrapper.appendChild(divRenamed);
  document.body.appendChild(wrapper);
}
