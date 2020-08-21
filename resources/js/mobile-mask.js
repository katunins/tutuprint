document.addEventListener('DOMContentLoaded', function () {
    var maskedInputs = document.querySelectorAll("[data-mask]");

    for (var index = 0; index < maskedInputs.length; index++) {
        maskedInputs[index].addEventListener('input', maskInput);
    }

    function maskInput() {
        var input = this;
        var mask = input.dataset.mask;
        var value = input.value;
        var literalPattern = /[0\*]/;
        var numberPattern = /[0-9]/;
        var newValue = "";

        try {
            var maskLength = mask.length;
            var valueIndex = 0;
            var maskIndex = 0;

            for (; maskIndex < maskLength;) {
                if (maskIndex >= value.length) break;

                if (mask[maskIndex] === "0" && value[valueIndex].match(numberPattern) === null) break;

                // Found a literal
                while (mask[maskIndex].match(literalPattern) === null) {
                    if (value[valueIndex] === mask[maskIndex]) break;
                    newValue += mask[maskIndex++];
                }

                newValue += value[valueIndex++];
                maskIndex++;
            }

            input.value = newValue;
        }

        catch (e) {
            console.log(e);
        }
    }
}

)