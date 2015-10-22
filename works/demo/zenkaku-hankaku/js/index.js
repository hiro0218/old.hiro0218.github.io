  var element = document.getElementsByClassName("js-zenkaku-hankaku")[0];

  element.addEventListener("blur", function(){
    this.value = zenkaku2hankaku(this.value);
  }, false);

  function zenkaku2hankaku(val) {  
    var regex = /[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g;

    // 入力値の全角を半角の文字に置換
    val = val.replace(regex, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    })
    .replace(/[‐－―]/g, '-') // ハイフンなど
    .replace(/[～〜]/g, '~')  // チルダ
    .replace(/　/g, ' ');  // スペース
    
     return val;
  }