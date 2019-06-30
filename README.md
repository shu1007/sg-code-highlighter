# FlashCodeHighlighter

Flash 用の Chrome 拡張機能です。 バッククォート 3 つで囲んだ中身をハイライトして表示します。

## skin

ハイライトに使っているのは google-code-prettify です。
https://github.com/google/code-prettify

以下のように skin が用意されていて、コミットされているコードでは Desert を設定しています。
https://raw.githack.com/google/code-prettify/master/styles/index.html

manifest.json の content_scripts 内で使用する css の指定を別の skin に変えれば違うテーマに変えられます。

## 言語指定

Markdown と同様の方法で言語の指定ができます。指定がない場合でも汎用的な方法でハイライトされますが一部言語では上手くハイライトされないので言語指定するほうが良いです。

<pre>
例:SQLは以下のように指定します。もし指定がない場合大文字で書いたキーワードが色付けされません。

```sql
SELECT
        Id
    FROM
        Hoge
    WHERE
        Id = '00000000-0000-0000-0000-000000000000'
```
</pre>

## MetaKey + Enter で投稿

MetaKey(Mac だと Command Key)と Enter でメッセージが投稿出来ます
