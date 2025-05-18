document.getElementById('uploadForm').addEventListener('submit', handleUpload)

const zip = new JSZip()

async function handleUpload(event) {
  event.preventDefault()

  const name = document.getElementById('name')
  const picturesNames = name.value.trim()
  console.log(picturesNames)

  const files = document.getElementById('files').files
  const filesArray = Array.from(files)

  const div = document.createElement('div')
  const h1 = document.createElement('h1')
  h1.textContent = 'Przesłane pliki:'
  div.classList.add('deafault__card')
  div.appendChild(h1)
  document.body.appendChild(div)

  for (let file of files) {
    const span = document.createElement('span')
    div.appendChild(span)
    span.textContent = file.name
    span.classList.add('default__name')
  }
  const divNew = document.createElement('div')
  const h1New = document.createElement('h1')
  h1New.textContent = 'Nowe pliki:'
  divNew.appendChild(h1New)
  divNew.classList.add('renamed__card')
  document.body.appendChild(divNew)

  for (let i = 0; i < filesArray.length; i++) {
    const originalFile = filesArray[i]
    const newName =
      picturesNames + `_${i + 1}.` + originalFile.name.split('.').pop()

    zip.file(newName, originalFile)
    if (files.length === 1) {
      const file = files[0]
      const extension = file.name.split('.').pop()
      const newName = picturesNames + '.' + extension
      const spanNew = document.createElement('span')
      spanNew.textContent = `${newName}`
      spanNew.style.display = 'block'
      spanNew.classList.add('renamed__card')
      divNew.appendChild(spanNew)
    } else {
      const spanNew = document.createElement('span')
      spanNew.textContent = `${newName}`
      spanNew.style.display = 'block'
      spanNew.classList.add('renamed__card')
      divNew.appendChild(spanNew)
    }
  }

  if (files.length === 1) {
    const file = files[0]
    const extension = file.name.split('.').pop()
    const newName = picturesNames + '.' + extension
    const renamedFile = new File([file], newName, {
      type: file.type,
    })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(renamedFile)
    link.download = renamedFile.name
    link.click()
  } else {
    const zipContent = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(zipContent)
    link.download = picturesNames + '.zip'
    link.click()
  }
}
