# FlashCodeHighlighter

Flash 用の Chrome 拡張機能です。 バッククォート 3 つで囲んだ中身をハイライトして表示します。

## skin

ハイライトに使っているのは google-code-prettify です。
https://github.com/google/code-prettify

以下のように skin が用意されていて、コミットされているコードでは Desert を設定しています。
https://raw.githack.com/google/code-prettify/master/styles/index.html

manifest.json の content_scripts 内で使用する css の指定を別の skin に変えれば違うテーマに変えられます。
