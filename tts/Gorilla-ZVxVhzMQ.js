import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.queue(function(e){var u=e.module,_=e.klass,t=e.const_set,f=e.send,c=e.def,l=e.eqeq,i=[],G=e.nil;return(function(d,g){var o=[u(d,`BCDice`)].concat(g);return(function(m,q){var s=[u(m,`GameSystem`)].concat(q),E=e.$r(s);return(function(R,S,x){var r=_(R,S,`Gorilla`),n=[r].concat(x),a=e.$r(n);return t(n[0],`ID`,`Gorilla`),t(n[0],`NAME`,`ゴリラTRPG`),t(n[0],`SORT_KEY`,`こりらTRPG`),t(n[0],`HELP_MESSAGE`,`2D6\u30ED\u30FC\u30EB\u6642\u306E\u30B4\u30EA\u30C6\u30A3\u30AB\u30EB\u81EA\u52D5\u5224\u5B9A\u3092\u884C\u3044\u307E\u3059\u3002

G = 2D6\u306E\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8

\u4F8B) G>=7 : 2D6\u3057\u30667\u4EE5\u4E0A\u306A\u3089\u6210\u529F
`),r.$register_prefix(`G`),c(r,`$change_text`,function($){return $=f($,`gsub`,[/^(S)?G/i],function(){return``+a(`Regexp`).$last_match(1)+`2D6`}),$}),c(r,`$result_2d6`,function($,P,T,A,B){return l(T,[5,5])?a(`Result`).$critical(`ゴリティカル（自動的成功）`):G})})(s[0],E(`Base`),s)})(o[0],o)})(i[0],i)});