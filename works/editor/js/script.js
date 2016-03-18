window.onload = function() {
    "use strict";

    // 宣言
    var editor   = document.getElementById("editor");
    var result   = document.getElementById("result");
    var btnSave  = document.getElementsByClassName('btn-save')[0];
    var btnClear = document.getElementsByClassName('btn-clear')[0];
    var timer = null;
    var prev_val = editor.value;

    // ストレージから読み込む
    loadStorage(editor);

    // ストレージに保存する
    window.setInterval(function(){
        saveStorage(editor);
    }, 60000);

    marked.setOptions({
        langPrefix: 'language-',
        breaks: true
    });

    // テキスト入力を反映させる
    keyup(editor, result);

    // 初回実行
    if (editor.value) {
        keyup(editor, result);
    }

    // フォーカス
    editor.addEventListener("focus", function(){
        window.clearInterval(timer);

        timer = window.setInterval(function(){
            var new_val = editor.value;
            // 変更があった場合
            if( prev_val != editor.value ){
                keyup(editor, result);
            }
            prev_val = new_val;
        }, 1000);

    }, false);

    // アウトフォーカス
    editor.addEventListener("blur", function(){
        //window.clearInterval(timer);
        keyup(editor, result);
    }, false);

    // キーを監視する
    monitoringKey(editor);

    // ページ移動の確認
    // window.onbeforeunload = function(event){
    //     event = event || window.event;
    //     event.returnValue = 'Confirmation';
    // };

    // tool
    btnSave.addEventListener("click", function(){
        if (confirm("Save?")) {
            saveStorage(editor);
            keyup(editor, result);
        }
    }, false);

    btnClear.addEventListener("click", function(){
        if (confirm("Clear?")) {
            editor.value = "";
            clearStorage();
            keyup(editor, result);
        }
    }, false);

};

function keyup(from, to) {
    var text = from.value;

    // エスケープされていない<script>タグを消去
    text = stripScriptTag(text);

    to.innerHTML = marked(text);
}

function stripScriptTag(text) {
    var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    while(SCRIPT_REGEX.test(text)) {
        text = text.replace(SCRIPT_REGEX, "");
    }
    return text;
}

function monitoringKey(editor) {
    // タブ入力を有効にする
    enableInsertTAB(editor);
}

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

function saveStorage(element) {
    localStorage.setItem('markunVal', element.value);
}

function loadStorage(element) {
    element.innerHTML = localStorage.getItem('markunVal');
}

function clearStorage() {
    localStorage.removeItem('markunVal');
}
