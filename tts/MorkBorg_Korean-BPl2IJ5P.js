import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.modules[`bcdice/dice_table/table`]=function(e){var S=e.module,N=e.klass,c=e.hash2,K=e.defs,w=e.truthy,a=e.def,l=e.rb_minus,T=[],f=e.nil;return(function(y,G){var x=[S(y,`BCDice`)].concat(G);return(function(C,I){var g=[S(C,`DiceTable`)].concat(I);return(function(P,j,H){var R=N(P,j,`Table`),z=[R].concat(H),v=e.$r(z),M=R.$$prototype;return M.times=M.sides=M.name=M.items=f,K(R,`$from_i18n`,function(b,$){var B=this,d=f;return d=v(`I18n`).$t(b,c([`locale`],{locale:$})),B.$new(d[`$[]`](`name`),d[`$[]`](`type`),d[`$[]`](`items`))}),a(R,`$initialize`,function(b,$,B){var d=this,o=f;return d.name=b,d.items=B.$freeze(),o=/(\d+)D(\d+)/i.$match($),w(o)||d.$raise(v(`ArgumentError`),`Unexpected table type: `+$),d.times=o[`$[]`](1).$to_i(),d.sides=o[`$[]`](2).$to_i()}),a(R,`$roll`,function(b){var $=this,B=f;return B=b.$roll_sum($.times,$.sides),$.$choice(B)}),a(R,`$choice`,function(b){var $=this,B=f;return B=l(b,$.times),v(`RollResult`).$new($.name,b,$.items[`$[]`](B))})})(g[0],null,g)})(x[0],x)})(T[0],T)};Opal.modules[`bcdice/game_system/MorkBorg`]=function(e){var S=e.module,N=e.klass,c=e.const_set,K=e.send2,w=e.find_super,a=e.def,l=e.truthy,T=e.rb_le,f=e.rb_ge,y=e.rb_plus,G=e.eqeq,L=e.rb_gt,x=e.hash2,C=e.top,I=[],t=e.nil,g=e.$$$;return C.$require(`bcdice/dice_table/table`),(function(P,j){var R=[S(P,`BCDice`)].concat(j);return(function(z,v){var E=[S(z,`GameSystem`)].concat(v),b=e.$r(E);return(function($,B,d){var o=N($,B,`MorkBorg`),q=[o].concat(d),h=e.$r(q),U=o.$$prototype;return U.randomizer=t,c(q[0],`ID`,`MorkBorg`),c(q[0],`NAME`,`MÖRK BORG`),c(q[0],`SORT_KEY`,`むるくほりい`),c(q[0],`HELP_MESSAGE`,`\u25A0\u5224\u5B9A\u3000sDRt        s: \u80FD\u529B\u5024(\u7701\u7565\u6642:0) t:\u76EE\u6A19\u5024

\u4F8B)+3DR12: \u80FD\u529B\u5024+3\u3001DR12\u30671d20\u3092\u632F\u3063\u3066\u3001\u305D\u306E\u7D50\u679C\u3092\u8868\u793A(\u30AF\u30EA\u30C6\u30A3\u30AB\u30EB\u30FB\u30D5\u30A1\u30F3\u30D6\u30EB\u3082\u8868\u793A)

\u25A0\u30A4\u30CB\u30B7\u30A2\u30C6\u30A3\u30F4\u3000sINS s: \u80FD\u529B\u5024(\u7701\u7565\u6642:0. \u500B\u5225\u306E\u30A4\u30CB\u30B7\u30A2\u30C6\u30A3\u30D6\u3092\u4F7F\u3046\u5834\u5408)

\u4F8B)INS: 1d6\u3092\u632F\u3063\u3066\u3001\u30A4\u30CB\u30B7\u30A2\u30C6\u30A3\u30F4\u306E\u7D50\u679C\u3092\u8868\u793A(PC\u5148\u884C\u3092\u6210\u529F\u3068\u3057\u3066\u8868\u793A)

\u25A0\u30E2\u30E9\u30EB\u3000sMORt s: \u80FD\u529B\u5024(\u7701\u7565\u6642:0) t:\u76F8\u624B\u30AF\u30EA\u30FC\u30C1\u30E3\u30FC\u306E\u30E2\u30E9\u30EB\u5024

\u4F8B)MOR8: 2d6\u3092\u632F\u3063\u3066\u3001\u30E2\u30E9\u30EB\u5224\u5B9A\u306E\u7D50\u679C\u3092\u8868\u793A(\u30E2\u30E9\u30EB\u5D29\u58CA\u3092\u6210\u529F\u3068\u3057\u3066\u8868\u793A)


\u25A0\u5404\u7A2E\u8868

\u30FB\u906D\u9047\u53CD\u5FDC\u8868 Reaction (ERT)
\u30FB\u7834\u640D Broken (BRO)

`),a(o,`$initialize`,function _(s){_.$$p;var n=this;return _.$$p=null,K(n,w(n,`initialize`,_,!1,!0),`initialize`,[s],null),n.sort_add_dice=!0,n.d66_sort_type=g(h(`D66SortType`),`NO_SORT`)}),a(o,`$eval_game_system_specific_command`,function(s){var r=this,n=t,i=t,u=t;return l(n=l(i=l(u=r.$resolute_action(s))?u:r.$resolute_initiative(s))?i:r.$resolute_morale(s))?n:r.$roll_tables(s,g(r.$class(),`TABLES`))}),o.$private(),a(o,`$result_dr`,function(s,r,n){var i=this;return l(T(r,1))?h(`Result`).$fumble(i.$translate(`MorkBorg.fumble`)):l(f(r,20))?h(`Result`).$critical(i.$translate(`MorkBorg.critical`)):l(f(s,n))?h(`Result`).$success(i.$translate(`MorkBorg.success`)):h(`Result`).$failure(i.$translate(`MorkBorg.failure`))}),a(o,`$resolute_action`,function(s){var r=this,n=t,i=t,u=t,m=t,k=t,D=t,A=t;return n=/^([+-]?\d+)?DR(\d+)$/.$match(s),l(n)?(i=n[`$[]`](1).$to_i(),u=n[`$[]`](2).$to_i(),m=r.randomizer.$roll_once(20),k=y(m.$to_s(),r.$with_symbol(i)),D=r.$result_dr(y(m,i),m,u),A=[`(`+s+`)`,k,y(m,i),D.$text()],D[`$text=`](A.$join(` ＞ `)),D):t}),a(o,`$with_symbol`,function(s){return G(s,0)?`+0`:l(L(s,0))?`+`+s:s.$to_s()}),a(o,`$resolute_initiative`,function(s){var r=this,n=t,i=t,u=t,m=t,k=t;return n=/^([+-]?\d+)?INS$/.$match(s),l(n)?(i=n[`$[]`](1).$to_i(),u=r.randomizer.$roll_once(6),m=y(u,i),k=l(f(m,4))?h(`Result`).$success(r.$translate(`MorkBorg.pcs_go_first`)):h(`Result`).$failure(r.$translate(`MorkBorg.enemies_go_first`)),k[`$text=`](`(`+s+`) ＞ `+u+r.$with_symbol(i)+` ＞ `+m+` ＞ `+k.$text()),k):t}),a(o,`$resolute_morale`,function(s){var r=this,n=t,i=t,u=t,m=t,k=t,D=t,A=t,Y=t;return n=/^([+-]?\d+)?MOR(\d+)$/.$match(s),l(n)?(i=n[`$[]`](1).$to_i(),u=n[`$[]`](2).$to_i(),m=r.randomizer.$roll_barabara(2,6),k=m.$sum(),D=y(k,i),A=``,Y=l(T(D,u))?h(`Result`).$failure(r.$translate(`MorkBorg.maintain`)):(A=r.randomizer.$roll_once(6),l(f(A,4))?h(`Result`).$success(r.$translate(`MorkBorg.surrender`)):h(`Result`).$success(r.$translate(`MorkBorg.flee`))),Y[`$text=`](`(`+s+`) ＞ `+k+r.$with_symbol(i)+` ＞ `+D+` ＞ `+A+Y.$text()),Y):t}),(function(_,s){var r=[_].concat(s),n=e.$r(r);return _.$private(),a(_,`$translate_tables`,function(u){return x([`ERT`,`BRO`],{ERT:g(n(`DiceTable`),`Table`).$from_i18n(`MorkBorg.ERT`,u),BRO:g(n(`DiceTable`),`Table`).$from_i18n(`MorkBorg.BRO`,u)})})})(e.get_singleton_class(o),q),c(q[0],`TABLES`,o.$translate_tables(`ja_jp`).$freeze()),o.$register_prefix(`([+-]?\\d+)?DR[\\d]+`,`([+-]?\\d+)?INS`,`([+-]?\\d+)?MOR`,h(`TABLES`).$keys())})(E[0],b(`Base`),E)})(R[0],R)})(I[0],I)};Opal.queue(function(e){var S=e.module,N=e.klass,c=e.const_set,K=e.send2,w=e.find_super,a=e.def,l=e.top,T=[];e.nil;return l.$require(`bcdice/game_system/MorkBorg`),(function(y,G){var x=[S(y,`BCDice`)].concat(G);return(function(C,I){var g=[S(C,`GameSystem`)].concat(I),P=e.$r(g);return(function(j,H,R){var z=N(j,H,`MorkBorg_Korean`),v=[z].concat(R);return c(v[0],`ID`,`MorkBorg:Korean`),c(v[0],`NAME`,`모크 보그(MÖRK BORG)`),c(v[0],`SORT_KEY`,`国際化:Korean:모크 보그(MÖRK BORG)`),c(v[0],`HELP_MESSAGE`,`\u25A0\uD310\uC815\u3000sDRt        s: \uB2A5\uB825\uCE58(\uC0DD\uB7B5 \uC2DC:0) t:\uBAA9\uD45C\uAC12

\uC608)+3DR12: \uB2A5\uB825\uCE58+3, DR12\uB85C 1d20\uC744 \uAD74\uB824\uC11C \uACB0\uACFC \uD45C\uC2DC(\uD06C\uB9AC\uD2F0\uCEEC\xB7\uD38C\uBE14\uB3C4 \uD45C\uC2DC)

\u25A0\uC774\uB2C8\uC154\uD2F0\uBE0C\u3000sINS s: \uB2A5\uB825\uCE58(\uC0DD\uB7B5 \uC2DC:0. \uAC1C\uBCC4 \uC774\uB2C8\uC154\uD2F0\uBE0C\uB97C \uC0AC\uC6A9\uD558\uB294 \uACBD\uC6B0)

\uC608)INS: 1d6\uC744 \uAD74\uB824\uC11C \uC774\uB2C8\uC154\uD2F0\uBE0C \uACB0\uACFC \uD45C\uC2DC(PC \uC120\uACF5\uC744 \uC131\uACF5\uC73C\uB85C \uD45C\uC2DC)

\u25A0\uBAA8\uB7F4\u3000sMORt s: \uB2A5\uB825\uCE58(\uC0DD\uB7B5 \uC2DC:0) t:\uC0C1\uB300 \uD06C\uB9AC\uCC98\uC758 \uBAA8\uB7F4 \uAC12

\uC608)MOR8: 2d6\uC744 \uAD74\uB824\uC11C \uBAA8\uB7F4 \uD310\uC815 \uACB0\uACFC \uD45C\uC2DC(\uBAA8\uB7F4 \uBD95\uAD34\uB97C \uC131\uACF5\uC73C\uB85C \uD45C\uC2DC)


\u25A0\uAC01\uC885 \uD45C

\u30FB\uC870\uC6B0 \uBC18\uC751\uD45C Reaction (ERT)
\u30FB\uD30C\uC190(\uBE48\uC0AC\uD45C) Broken (BRO)

`),a(z,`$initialize`,function M(E){M.$$p;var $=this;return M.$$p=null,K($,w($,`initialize`,M,!1,!0),`initialize`,[E],null),$.locale=`ko_kr`}),c(v[0],`TABLES`,z.$translate_tables(`ko_kr`).$freeze()),z.$register_prefix_from_super_class()})(g[0],P(`MorkBorg`),g)})(x[0],x)})(T[0],T)});