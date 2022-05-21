

const Base64Helper = {
    convertToBase64: (file, callBack) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            var aux = [];
            var base64 = reader.result;
            //aux = base64.split(',');
            //var imgInBase64 = aux[1];
            callBack(base64)
        }
    },
    convertToFile: (base64String, callBack) => {

    },
    convertAudioToBase64: (file, callBack) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            var aux = [];
            var base64 = reader.result;
            //aux = base64.split(',');
            //var imgInBase64 = aux[1];
            callBack(base64)
        }
    }
}

const useBase64Helper = () => Base64Helper

export {useBase64Helper};