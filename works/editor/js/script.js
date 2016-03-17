document.addEventListener("DOMContentLoaded", function(){
    "use strict";

    // 宣言
    var editor = document.getElementById("editor");
    var result = document.getElementById("result");
    var timer = null;
    var prev_val = editor.value;

    marked.setOptions({
        langPrefix: 'language-',
        sanitize: true,
        breaks: true
    });

    // テキスト入力を反映させる
    function keyup() {
        result.innerHTML = marked(editor.value);
    }

    // 初回実行
    if (editor.value) {
        keyup();
    }

    // フォーカス
    editor.addEventListener("focus", function(){
        window.clearInterval(timer);

        timer = window.setInterval(function(){
            var new_val = editor.value;
            // 変更があった場合
            if( prev_val != editor.value ){
                keyup();
            }
            prev_val = new_val;
        }, 1000);

    }, false);

    // アウトフォーカス
    editor.addEventListener("blur", function(){
        window.clearInterval(timer);
    }, false);

    // タブ入力を有効にする
    enableInsertTAB(editor);

}, false);


function enableInsertTAB(element) {
    element.onkeydown = function(e) {
        if (e.keyCode === 9) {
            var val = this.value;
            var start = this.selectionStart;
            var end = this.selectionEnd;

            this.value = val.substring(0, start) + '\t' + val.substring(end);

            this.selectionStart = this.selectionEnd = start + 1;

            return false;
        }
    };
}
