window.auxTools = function () {
  return {
    removeSliceReference: function (string) {
      // Remove the "parent in (sliced string)" reference
      return string.length < 12 ? string : (' ' + string).slice(1);
    }
  };
}();
