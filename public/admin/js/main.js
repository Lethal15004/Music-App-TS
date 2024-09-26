// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End Upload Image

//Ẩn alert
const alertSuccess=document.querySelector('[show-alert]');
if(alertSuccess){
    const time= Number(alertSuccess.getAttribute('show-alert'))||3000;
    setTimeout(()=>{
        alertSuccess.classList.add('hidden');
    },time)
}

// Upload Audio
const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio){
  console.log('uploadAudio');
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");//Lấy ra upload-audio-input
  const uploadAudioPlay  = uploadAudio.querySelector("[upload-audio-play]");//lấy ra upload-audio-play
  const source=uploadAudioPlay.querySelector('source');//lấy ra source từ  upload-audio-play

  uploadAudioInput.addEventListener("change", () => {
    const file = uploadAudioInput.files[0];
    if(file) {
      source.src = URL.createObjectURL(file);
      uploadAudioPlay.load();
    }
  });
}