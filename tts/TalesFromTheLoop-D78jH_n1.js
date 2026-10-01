import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.queue(function(e){var b=e.module,k=e.klass,m=e.const_set,p=e.hash2,a=e.truthy,L=e.to_ary,E=e.send,R=e.rb_plus,G=e.rb_le,d=e.def,P=e.rb_minus,F=e.rb_gt,S=e.rb_ge,v=[],r=e.nil,D=e.$$$;return(function(q,z){var y=[b(q,`BCDice`)].concat(z);return(function(B,C){var f=[b(B,`GameSystem`)].concat(C),j=e.$r(f);return(function(w,H,I){var i=k(w,H,`TalesFromTheLoop`),l=[i].concat(I),T=e.$r(l),K=i.$$prototype;return K.randomizer=r,m(l[0],`ID`,`TalesFromTheLoop`),m(l[0],`NAME`,`ザ・ループTRPG`),m(l[0],`SORT_KEY`,`さるうふTRPG`),m(l[0],`HELP_MESSAGE`,`\u25A0 \u5224\u5B9A\u30B3\u30DE\u30F3\u30C9(nTFLx-x+x or nTFLx+x-x)
  (\u5FC5\u8981\u6210\u529F\u6570)TFL(\u5224\u5B9A\u30C0\u30A4\u30B9\u6570)+/-(\u4FEE\u6B63\u30C0\u30A4\u30B9\u6570)

\u203B \u5FC5\u8981\u6210\u529F\u6570\u3068\u4FEE\u6B63\u30C0\u30A4\u30B9\u6570\u306F\u7701\u7565\u53EF\u80FD

\u4F8B1) \u5FC5\u8981\u6210\u529F\u65701\u3001\u5224\u5B9A\u30C0\u30A4\u30B9\u306F\u80FD\u529B\u50243
      1TFL3

\u4F8B2\uFF09\u5FC5\u8981\u6210\u529F\u6570\u4E0D\u660E\u3001\u3042\u308B\u3044\u306F\u30C0\u30A4\u30B9\u30DC\u30C3\u30C8\u306E\u6210\u529F\u5224\u5B9A\u3092\u4F7F\u308F\u306A\u3044\u3001\u5224\u5B9A\u30C0\u30A4\u30B9\u306F\u80FD\u529B\u50243+\u6280\u80FD1\u30674\u3001\u30A2\u30A4\u30C6\u30E0\u306E\u4FEE\u6B63+1
      TFL4+1

\u4F8B3\uFF09\u5FC5\u8981\u6210\u529F\u65701\u3001\u5224\u5B9A\u30C0\u30A4\u30B9\u306F\u80FD\u529B\u50242+\u6280\u80FD1\u30673\u3001\u30B3\u30F3\u30C7\u30A3\u30B7\u30E7\u30F3\u306B\u30C1\u30A7\u30C3\u30AF\u304C2\u3064\u3001\u30A2\u30A4\u30C6\u30E0\u306E\u4FEE\u6B63+1
      1TFL3-2+1
     \u3042\u308B\u3044\u306F\u4EE5\u4E0B\u306E\u3088\u3046\u306B\u30AB\u30C3\u30B3\u66F8\u304D\u3067\u5185\u8A33\u3092\u8A73\u7D30\u306B\u8A18\u8FF0\u3059\u308B\u3053\u3068\u3082\u53EF\u80FD\u3002
      1TFL(2+1)-(1+1)+1
     \u4FEE\u6B63\u30C0\u30A4\u30B9\u306E\u30D7\u30E9\u30B9\u3068\u30DE\u30A4\u30CA\u30B9\u306F\u9006\u3067\u3082\u3088\u3044\u3002
      1TFL(2+1)+1-(1+1)
`),i.$register_prefix(`(\\d+)?(TFL)`),d(i,`$eval_game_system_specific_command`,function(c){var n,t,$=this,_=r,o=r,s=r,u=r,g=r,h=r;return _=D(T(`Command`),`Parser`).$new(/\d*TFL\d+/,p([`round_type`],{round_type:$.$round_type()})),o=_.$parse(c),a(o)?(t=E(o.$command().$split(`TFL`,2),`map`,[],`to_i`.$to_proc()),n=L(t),s=n[0]==null?r:n[0],u=n[1]==null?r:n[1],u=R(u,o.$modify_number()),a(G(u,0))&&(u=1),t=$.$make_dice_roll(u),n=L(t),g=n[0]==null?r:n[0],h=n[1]==null?r:n[1],$.$make_dice_roll_text(s,u,g,h)):r}),i.$private(),d(i,`$make_dice_roll_text`,function(c,n,t,$){var _=r,o=r,s=r;return _=`(`+n+`D6) ＞ `+t+` 成功数:`+$,o=P(n,$),a(F(o,0))&&(_=``+_+` 振り直し可能:`+o,s=`
\u632F\u308A\u76F4\u3057\u30B3\u30DE\u30F3\u30C9: TFL`+o),a(F(c,0))?a(S($,c))?T(`Result`).$success(``+_+` 成功！`+s):T(`Result`).$failure(``+_+` 失敗！`+s):``+_+s}),d(i,`$make_dice_roll`,function(c){var n=this,t=r,$=r;return t=n.randomizer.$roll_barabara(c,6),$=t.$count(6),[`[`+t.$join(`,`)+`]`,$]})})(f[0],j(`Base`),f)})(y[0],y)})(v[0],v)});