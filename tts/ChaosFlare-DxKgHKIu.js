import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.queue(function(n){var E=n.module,k=n.klass,m=n.const_set,A=n.eqeq,t=n.truthy,x=n.rb_le,a=n.rb_minus,D=n.neqeq,z=n.rb_ge,b=n.def,B=n.rb_divide,C=n.not,p=n.range,G=n.hash2,T=n.rb_lt,M=n.rb_plus,L=[],e=n.nil,P=n.$$$;return(function(H,I){var S=[E(H,`BCDice`)].concat(I);return(function(N,Y){var g=[E(N,`GameSystem`)].concat(Y),Q=n.$r(g);return(function(U,V,W){var _=k(U,V,`ChaosFlare`),o=[_].concat(W),F=n.$r(o),j=_.$$prototype;return j.randomizer=j.cmd=e,m(o[0],`ID`,`ChaosFlare`),m(o[0],`NAME`,`カオスフレア`),m(o[0],`SORT_KEY`,`かおすふれあ`),m(o[0],`HELP_MESSAGE`,`\u5224\u5B9A
CF
  \u66F8\u5F0F: [\u30C0\u30A4\u30B9\u306E\u6570]CF[\u4FEE\u6B63\u5024][@\u30AF\u30EA\u30C6\u30A3\u30AB\u30EB\u5024][#\u30D5\u30A1\u30F3\u30D6\u30EB\u5024][>=\u76EE\u6A19\u5024]
    CF\u4EE5\u5916\u306F\u5168\u3066\u7701\u7565\u53EF\u80FD
  \u4F8B:
  - CF 2D6,\u30AF\u30EA\u30C6\u30A3\u30AB\u30EB\u502412,\u30D5\u30A1\u30F3\u30D6\u30EB\u50242\u3067\u5224\u5B9A
  - CF+10@10 \u4FEE\u6B63\u5024+10,\u30AF\u30EA\u30C6\u30A3\u30AB\u30EB\u502410\u3067\u5224\u5B9A
  - CF+10#3 \u4FEE\u6B63\u5024+10,\u30D5\u30A1\u30F3\u30D6\u30EB\u50243\u3067\u5224\u5B9A
  - CF+10>=10 \u76EE\u6A19\u5024\u3092\u6307\u5B9A\u3057\u305F\u5834\u5408\u3001\u5DEE\u5206\u5024\u3082\u51FA\u529B\u3059\u308B
  - 3CF+10@10#3>=10 3D6\u3067\u306E\u5224\u5B9A
  - CF@9#3+8>=10

2D6
  \u30D5\u30A1\u30F3\u30D6\u30EB\u50242\u3067\u5224\u5B9A\u3059\u308B\u3002\u30AF\u30EA\u30C6\u30A3\u30AB\u30EB\u306E\u5224\u5B9A\u306F\u884C\u308F\u308C\u306A\u3044\u3002
  \u76EE\u6A19\u5024\u304C\u8A2D\u5B9A\u3055\u308C\u305F\u5834\u5408\u3001\u5DEE\u5206\u5024\u3092\u51FA\u529B\u3059\u308B\u3002
  - 2D6+4>=10

\u5404\u7A2E\u8868
  FT: \u56E0\u7E01\u8868
  FTx: \u6570\u5024\u3092\u6307\u5B9A\u3059\u308B\u3068\u56E0\u679C\u8868\u306E\u5024\u3092\u51FA\u529B\u3059\u308B
  - FT -> 11\u304B\u308966\u306E\u9593\u3067\u30E9\u30F3\u30C0\u30E0\u6C7A\u5B9A
  - FT23 -> 23\u306E\u9805\u76EE\u3092\u51FA\u529B
  - FT0
  - FT7
`),_.$register_prefix(`\\d*CF`,`FT`),b(_,`$result_2d6`,function(i,r,f,c,s){var $=e,u=e;return A(c,`>=`)?($=[],u=F(`Result`).$new(),t(x(r,2))&&(i=a(i,20),$.$push(`ファンブル(-20)`),u[`$fumble=`](!0)),D(s,`?`)&&(t(z(i,s))?($.$push(`成功`),u[`$success=`](!0)):($.$push(`失敗`),u[`$failure=`](!0)),D(a(i,s),0)&&$.$push(`差分値`+a(i,s))),t($[`$empty?`]())?F(`Result`).$nothing():(u[`$text=`]($.$join(` ＞ `)),u)):e}),b(_,`$eval_game_system_specific_command`,function(i){var r=this;return t(i[`$start_with?`](`FT`))?r.$roll_fate_table(i):r.$cf_roll(i)}),_.$private(),b(_,`$roll_fate_table`,function(i){var r=this,f=e,c=e,s=e,$=e,u=e,d=e;if(f=/^FT(\d+)?/.$match(i),t(f[`$[]`](1))){if(c=f[`$[]`](1).$to_i(),t([0,7][`$include?`](c)))return`因果表(`+c+`) ＞ `+F(`FATE_TABLE`)[`$[]`](c)[`$[]`](0);if(s=B(c,10).$to_i(),$=c[`$%`](10),C(p(1,6,!1)[`$include?`](s))||C(p(1,6,!1)[`$include?`]($)))return e}else s=r.randomizer.$roll_once(6),$=r.randomizer.$roll_once(6);return u=s,d=a(B($,2).$to_i(),1),`因果表(`+s+$+`) ＞ `+F(`FATE_TABLE`)[`$[]`](u)[`$[]`](d)}),b(_,`$cf_roll`,function(i){var r=this,f=e,c=e,s=e,$=e,u=e,d=e,h=e,w=e,q=e,y=e,l=e,R=e;return f=P(F(`Command`),`Parser`).$new(/\d*CF/,G([`round_type`],{round_type:r.$round_type()})).$enable_critical().$enable_fumble(),r.cmd=f.$parse(i),!t(r.cmd)||(c=A(r.cmd.$command(),`CF`)?2:r.cmd.$command().$to_i(),s=t($=r.cmd.$critical())?$:12,u=t($=r.cmd.$fumble())?$:2,r.cmd[`$dollar=`](e),t(T(c,0))||C([`>=`,e][`$include?`](r.cmd.$cmp_op())))?e:(d=r.randomizer.$roll_barabara(c,6),h=d.$sum(),w=d.$join(`,`),q=z(h,s),y=x(h,u),l=t(q)?30:t(y)?-20:h,l=M(l,r.cmd.$modify_number()),R=[`(`+r.cmd.$to_s(`after_modify_number`)+`)`,``+h+`[`+w+`]`,l.$to_s(),t(T(l,0))?`0`:e,t(q)?`クリティカル`:e,t(y)?`ファンブル`:e,t(r.cmd.$target_number())?`差分値 `+r.$difference(l):e].$compact(),R.$join(` ＞ `))}),b(_,`$difference`,function(i){var r=this;return t(T(i,0))?r.cmd.$target_number()[`$-@`]():a(i,r.cmd.$target_number())}),m(o[0],`FATE_TABLE`,[[`腐れ縁`],[`純愛`,`親近感`,`庇護`],[`信頼`,`感服`,`共感`],[`友情`,`尊敬`,`慕情`],[`好敵手`,`期待`,`借り`],[`興味`,`憎悪`,`悲しみ`],[`恐怖`,`執着`,`利用`],[`任意`]].$freeze())})(g[0],Q(`Base`),g)})(S[0],S)})(L[0],L)});