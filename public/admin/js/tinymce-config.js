tinymce.init({
    selector: 'textarea[textEditor-tinymce]',
    plugins: 'lists link image table code help wordcount',
    images_upload_url: '/admin/upload', // API mà tinymce sẽ call để upload ảnh
});