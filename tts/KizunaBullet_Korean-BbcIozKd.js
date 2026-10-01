import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.modules[`bcdice/game_system/kizuna_bullet/tables`]=function(t){var R=t.module,x=t.klass,E=t.ensure_kwargs,I=t.get_kwarg,A=t.def,C=t.hash2,c=[],i=t.nil,l=t.$$$;return(function(W,k){var w=[R(W,`BCDice`)].concat(k);return(function(G,M){var y=[R(G,`GameSystem`)].concat(M),a=t.$r(y);return(function(p,q,j){var O=x(p,q,`KizunaBullet`),K=[O].concat(j);return(function(N,g){var v=x(N,g,`RollTwiceRandomizerTable`),n=v.$$prototype;return n.a_table=n.b_table=i,A(v,`$initialize`,function(e){var m,s,u,T=this;return e=E(e),m=I(e,`locale`),s=I(e,`a_table`),u=I(e,`b_table`),T.locale=m,T.a_table=s,T.b_table=u}),A(v,`$roll`,function(e){var m=this,s=i,u=i,T=i;return s=[],u=m.a_table.$roll(e).$to_s(),s.$push(u),T=m.b_table.$roll(e).$to_s(),s.$push(T),s.$join(`
`)})})(K[0],null),(function(N,g){var v=x(N,g,`Roll4TimesRandomizerTable`),n=v.$$prototype;return n.a_table=n.b_table=n.c_table=n.d_table=i,A(v,`$initialize`,function(e){var m,s,u,T,f,B=this;return e=E(e),m=I(e,`locale`),s=I(e,`a_table`),u=I(e,`b_table`),T=I(e,`c_table`),f=I(e,`d_table`),B.locale=m,B.a_table=s,B.b_table=u,B.c_table=T,B.d_table=f}),A(v,`$roll`,function(e){var m=this,s=i,u=i,T=i,f=i,B=i;return s=[],u=m.a_table.$roll(e).$to_s(),s.$push(u),T=m.b_table.$roll(e).$to_s(),s.$push(T),f=m.c_table.$roll(e).$to_s(),s.$push(f),B=m.d_table.$roll(e).$to_s(),s.$push(B),s.$join(`
`)})})(K[0],null),(function(N,g){var v=[N].concat(g),n=t.$r(v);return N.$private(),A(N,`$translate_tables`,function(e){var m=i,s=i,u=i,T=i,f=i,B=i,P=i,o=i,r=i,_=i,$=i,b=i,H=i,z=i,d=i,D=i,Y=i;return m=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.OP`,e),s=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.OC`,e),u=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.OWP`,e),T=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.OWC`,e),f=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.OHP`,e),B=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.OHC`,e),P=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.OTP`,e),o=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.OTC`,e),r=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.EP`,e),_=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.EO`,e),$=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.EF`,e),b=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.EA`,e),H=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.EE`,e),z=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.CP`,e),d=l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.CC`,e),D=l(n(`DiceTable`),`D66Table`).$from_i18n(`KizunaBullet.table.IB`,e),Y=l(n(`DiceTable`),`D66Table`).$from_i18n(`KizunaBullet.table.ID`,e),C([`OP`,`OC`,`OPC`,`OWP`,`OWC`,`OWPC`,`OHP`,`OHC`,`OHPC`,`OTP`,`OTC`,`OTPC`,`TT`,`TTI`,`TTC`,`TTH`,`EP`,`EO`,`EF`,`EA`,`EE`,`EFA`,`EAA`,`CP`,`CC`,`CPC`,`IB`,`ID`,`IBD`,`HA`,`NI1`,`NI2`,`NI3`,`NI4`,`NI5`,`NI6`,`NT1`,`NT2`,`NT3`,`NT4`,`NT5`,`NT6`,`HH1`,`HH2`,`HH3`,`HH4`,`HH5`,`HH6`,`HC1`,`HC2`,`HC3`,`HC4`,`HC5`,`HC6`],{OP:m,OC:s,OPC:n(`RollTwiceRandomizerTable`).$new(C([`locale`,`a_table`,`b_table`],{locale:e,a_table:m,b_table:s})).$freeze(),OWP:u,OWC:T,OWPC:n(`RollTwiceRandomizerTable`).$new(C([`locale`,`a_table`,`b_table`],{locale:e,a_table:u,b_table:T})).$freeze(),OHP:f,OHC:B,OHPC:n(`RollTwiceRandomizerTable`).$new(C([`locale`,`a_table`,`b_table`],{locale:e,a_table:f,b_table:B})).$freeze(),OTP:P,OTC:o,OTPC:n(`RollTwiceRandomizerTable`).$new(C([`locale`,`a_table`,`b_table`],{locale:e,a_table:P,b_table:o})).$freeze(),TT:l(n(`DiceTable`),`D66Table`).$from_i18n(`KizunaBullet.table.TT`,e),TTI:l(n(`DiceTable`),`D66Table`).$from_i18n(`KizunaBullet.table.TTI`,e),TTC:l(n(`DiceTable`),`D66Table`).$from_i18n(`KizunaBullet.table.TTC`,e),TTH:l(n(`DiceTable`),`D66Table`).$from_i18n(`KizunaBullet.table.TTH`,e),EP:r,EO:_,EF:$,EA:b,EE:H,EFA:n(`Roll4TimesRandomizerTable`).$new(C([`locale`,`a_table`,`b_table`,`c_table`,`d_table`],{locale:e,a_table:r,b_table:_,c_table:$,d_table:H})).$freeze(),EAA:n(`Roll4TimesRandomizerTable`).$new(C([`locale`,`a_table`,`b_table`,`c_table`,`d_table`],{locale:e,a_table:r,b_table:_,c_table:b,d_table:H})).$freeze(),CP:z,CC:d,CPC:n(`RollTwiceRandomizerTable`).$new(C([`locale`,`a_table`,`b_table`],{locale:e,a_table:z,b_table:d})).$freeze(),IB:D,ID:Y,IBD:n(`RollTwiceRandomizerTable`).$new(C([`locale`,`a_table`,`b_table`],{locale:e,a_table:D,b_table:Y})).$freeze(),HA:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HA`,e),NI1:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.NI1`,e),NI2:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.NI2`,e),NI3:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.NI3`,e),NI4:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.NI4`,e),NI5:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.NI5`,e),NI6:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.NI6`,e),NT1:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.NT1`,e),NT2:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.NT2`,e),NT3:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.NT3`,e),NT4:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.NT4`,e),NT5:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.NT5`,e),NT6:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.NT6`,e),HH1:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HH1`,e),HH2:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HH2`,e),HH3:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HH3`,e),HH4:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HH4`,e),HH5:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HH5`,e),HH6:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HH6`,e),HC1:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HC1`,e),HC2:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HC2`,e),HC3:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HC3`,e),HC4:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HC4`,e),HC5:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HC5`,e),HC6:l(n(`DiceTable`),`Table`).$from_i18n(`KizunaBullet.table.HC6`,e)}).$freeze()})})(t.get_singleton_class(O),K)})(y[0],a(`Base`),y)})(w[0],w)})(c[0],c)};Opal.modules[`bcdice/game_system/KizunaBullet`]=function(t){var R=t.module,x=t.klass,E=t.const_set,I=t.send2,A=t.find_super,C=t.def,c=t.truthy,i=t.hash2,l=t.send,W=t.rb_ge,k=t.rb_gt,V=t.rb_lt,w=t.rb_minus,G=t.rb_plus,M=t.rb_divide,L=t.top,y=[],a=t.nil,p=t.$$$;return L.$require(`bcdice/game_system/kizuna_bullet/tables`),(function(q,j){var K=[R(q,`BCDice`)].concat(j);return(function(N,g){var n=[R(N,`GameSystem`)].concat(g),F=t.$r(n);return(function(e,m,s){var u=x(e,m,`KizunaBullet`),T=[u].concat(s),f=t.$r(T),B=u.$$prototype;return u.locale??=a,B.round_type=B.randomizer=a,E(T[0],`ID`,`KizunaBullet`),E(T[0],`NAME`,`キズナバレット`),E(T[0],`SORT_KEY`,`きすなはれつと`),E(T[0],`HELP_MESSAGE`,`\u30FB\u30C0\u30A4\u30B9\u30ED\u30FC\u30EB
nDM\u2026n\u500B\u306E6\u9762\u30C0\u30A4\u30B9\u3092\u8EE2\u304C\u3057\u3066\u3001\u4E00\u756A\u9AD8\u3044\u51FA\u76EE\u3092\u63A1\u7528\u3057\u307E\u3059\u3002
\u30FB\uFF3B\u8ABF\u67FB\u5224\u5B9A\uFF3D
nIN\u2026n\u500B\u306E6\u9762\u30C0\u30A4\u30B9\u3092\u8EE2\u304C\u3057\u3066\u3001\u4E00\u756A\u9AD8\u3044\u51FA\u76EE\u304C5\u4EE5\u4E0A\u306A\u3089\u6210\u529F\u3057\u307E\u3059\u3002\uFF08\uFF3B\u30D1\u30FC\u30C8\u30CA\u30FC\u306E\u30D8\u30EB\u30D7\uFF3D\u4F7F\u7528\u53EF\uFF09
\u30FB\uFF3B\u93AE\u9759\u5224\u5B9A\uFF3D
SEn\u20262\u500B\u306E6\u9762\u30C0\u30A4\u30B9\u3092\u8EE2\u304C\u3057\u3066\u3001\u51FA\u76EE\u306E\u5408\u8A08\u5024\u304Cn\uFF08\uFF3B\u30D2\u30D3\u30EF\u30EC\uFF3D\u72B6\u614B\u306E\uFF3B\u30AD\u30BA\u30CA\uFF3D\u306E\u500B\u6570\uFF09\u3088\u308A\u9AD8\u3044\u3068\u6210\u529F\u3057\u307E\u3059\u3002\uFF08\uFF3B\u5F37\u5236\u93AE\u9759\uFF3D\u4F7F\u7528\u53EF\uFF09
\u30FB\uFF3B\u89E3\u6C7A\uFF3D \uFF3B\u30A2\u30AF\u30B7\u30E7\u30F3\uFF3D\u306E\u30C0\u30E1\u30FC\u30B8\u3068\uFF3B\u30A2\u30AF\u30B7\u30C7\u30F3\u30C8\uFF3D\u306E\u30C0\u30E1\u30FC\u30B8\u8EFD\u6E1B
nSO\u20262+n\u500B\u306E6\u9762\u30C0\u30A4\u30B9\u3092\u8EE2\u304C\u3057\u3066\u3001\u51FA\u76EE\u3092\u3059\u3079\u3066\u5408\u8A08\u3057\u307E\u3059\u3002\uFF08n\u306F\u6E1B\u3089\u3057\u305F\u3010\u52B1\u8D77\u5024\u3011\u3002\u7701\u7565\u53EF\u80FD\uFF09
\u30FB\u5404\u7A2E\u8868
\u65E5\u5E38\u8868\u30FB\u5834\u6240 OP
\u65E5\u5E38\u8868\u30FB\u5185\u5BB9 OC
\u65E5\u5E38\u8868\u30FB\u5834\u6240\u3068\u5185\u5BB9 OPC
\u65E5\u5E38\u8868\uFF08\u4ED5\u4E8B\uFF09\u30FB\u5834\u6240 OWP
\u65E5\u5E38\u8868\uFF08\u4ED5\u4E8B\uFF09\u30FB\u5185\u5BB9 OWC
\u65E5\u5E38\u8868\uFF08\u4ED5\u4E8B\uFF09\u30FB\u5834\u6240\u3068\u5185\u5BB9 OWPC
\u65E5\u5E38\u8868\uFF08\u4F11\u6687\uFF09\u30FB\u5834\u6240 OHP
\u65E5\u5E38\u8868\uFF08\u4F11\u6687\uFF09\u30FB\u5185\u5BB9 OHC
\u65E5\u5E38\u8868\uFF08\u4F11\u6687\uFF09\u30FB\u5834\u6240\u3068\u5185\u5BB9 OHPC
\u65E5\u5E38\u8868\uFF08\u51FA\u5F35\uFF09\u30FB\u5834\u6240 OTP
\u65E5\u5E38\u8868\uFF08\u51FA\u5F35\uFF09\u30FB\u5185\u5BB9 OTC
\u65E5\u5E38\u8868\uFF08\u51FA\u5F35\uFF09\u30FB\u5834\u6240\u3068\u5185\u5BB9 OTPC
\u30BF\u30FC\u30F3\u30C6\u30FC\u30DE\u8868 TT
\u30BF\u30FC\u30F3\u30C6\u30FC\u30DE\u8868\u30FB\u89AA\u5BC6 TTI
\u30BF\u30FC\u30F3\u30C6\u30FC\u30DE\u8868\u30FB\u30AF\u30FC\u30EB TTC
\u30BF\u30FC\u30F3\u30C6\u30FC\u30DE\u8868\u30FB\u4E3B\u5F93 TTH
\u906D\u9047\u8868\u30FB\u5834\u6240 EP
\u906D\u9047\u8868\u30FB\u767B\u5834\u9806 EO
\u906D\u9047\u8868\u30FB\u72B6\u6CC1\uFF08\u521D\u5BFE\u9762\uFF09 EF
\u906D\u9047\u8868\u30FB\u72B6\u6CC1\uFF08\u77E5\u308A\u5408\u3044\uFF09 EA
\u906D\u9047\u8868\u30FB\u6C7A\u7740 EE
\u906D\u9047\u8868\u30FB\u5834\u6240\u3068\u767B\u5834\u9806\u3068\u72B6\u6CC1\uFF08\u521D\u5BFE\u9762\uFF09\u3068\u6C7A\u7740 EFA
\u906D\u9047\u8868\u30FB\u5834\u6240\u3068\u767B\u5834\u9806\u3068\u72B6\u6CC1\uFF08\u77E5\u308A\u5408\u3044\uFF09\u3068\u6C7A\u7740 EAA
\u4EA4\u6D41\u8868\u30FB\u5834\u6240 CP
\u4EA4\u6D41\u8868\u30FB\u5185\u5BB9 CC
\u4EA4\u6D41\u8868\u30FB\u5834\u6240\u3068\u5185\u5BB9 CPC
\u8ABF\u67FB\u8868\u30FB\u30D9\u30FC\u30B7\u30C3\u30AF IB
\u8ABF\u67FB\u8868\u30FB\u30C0\u30A4\u30CA\u30DF\u30C3\u30AF ID
\u8ABF\u67FB\u8868\u30FB\u30D9\u30FC\u30B7\u30C3\u30AF\u3068\u30C0\u30A4\u30CA\u30DF\u30C3\u30AF IBD
\u30CF\u30B6\u30FC\u30C9\u8868 HA
\u901A\u5E38\u30C0\u30A4\u30B8\u30A7\u30B9\u30C8\u3000\u30AD\u30DF\u305F\u3061\u306B\u65B0\u3057\u3044\u547D\u4EE4\u304C\u4E0B\u3063\u305F\uFF08\u8ABF\u67FB\u304C\u4F9D\u983C\u3055\u308C\u305F\uFF09\u3002
1:\u305D\u306E\u4E8B\u4EF6\u306E\u5185\u5BB9\u306F\u2026\u2026 NI1
2:\u635C\u67FB\u306B\u5411\u304B\u3063\u305F\u5834\u6240\u306F\u2026\u2026 NI2
3:\u72AF\u4EBA\u306E\u30AD\u30BB\u30AD\u4F7F\u3044\u306F\u2026\u2026 NI3
4:\u8D77\u304D\u305F\u51FA\u6765\u4E8B\u306F\u2026\u2026 NI4
5:\u30D0\u30EC\u30C3\u30C8\u306E\u9593\u3067\u306F\u2026\u2026 NI5
6:\u6226\u3044\u306E\u7D50\u672B\u306F\u2026\u2026 NI6
\u901A\u5E38\u30C0\u30A4\u30B8\u30A7\u30B9\u30C8\u3000\u30AD\u30DF\u305F\u3061\u306F\u65C5\u884C\uFF08\u51FA\u5F35\uFF09\u3067\u3042\u308B\u5834\u6240\u3092\u8A2A\u308C\u305F\u3002
1:\u305D\u306E\u5834\u6240\u3068\u306F\u2026\u2026 NT1
2:\u305D\u3053\u3067\u59CB\u307E\u3063\u305F\u306E\u306F\u2026\u2026 NT2
3:\u6975\u9650\u72B6\u614B\u306E\u306A\u304B\u3067\u2026\u2026 NT3
4:\u72AF\u4EBA\u306E\u30AD\u30BB\u30AD\u4F7F\u3044\u306F\u2026\u2026 NT4
5:\u30D0\u30EC\u30C3\u30C8\u306E\u9593\u3067\u306F\u2026\u2026 NT5
6:\u6226\u3044\u306E\u7D50\u672B\u306F\u2026\u2026 NT6
\u30DB\u30EA\u30C7\u30FC\u30C0\u30A4\u30B8\u30A7\u30B9\u30C8\u3000\u30AD\u30DF\u305F\u3061\u306F\u4F11\u65E5\u306B\u51FA\u304B\u3051\u308B\u3053\u3068\u306B\u3057\u305F\u3002
1:\u305D\u306E\u5834\u6240\u3068\u306F\u2026\u2026 HH1
2:\u5F85\u3061\u5408\u308F\u305B\u3092\u3057\u305F\u3089\u2026\u2026 HH2
3:\u305D\u3057\u3066\u306A\u3093\u3068\u2026\u2026 HH3
4:\u3075\u305F\u308A\u304C\u6C7A\u3081\u305F\u306E\u306F\u2026\u2026 HH4
5:\u7D50\u679C\u7684\u306B\u2026\u2026 HH5
6:\u30D0\u30EC\u30C3\u30C8\u306F\u6700\u5F8C\u306B\u2026\u2026 HH6
\u30DB\u30EA\u30C7\u30FC\u30C0\u30A4\u30B8\u30A7\u30B9\u30C8\u3000\u30AD\u30DF\u305F\u3061\u306F\u5947\u5999\u306A\u4E8B\u4EF6\u306B\u51FA\u304F\u308F\u3057\u305F\u3002
1:\u305D\u306E\u5834\u6240\u3068\u306F\u2026\u2026 HC1
2:\u8D77\u304D\u305F\u4E8B\u4EF6\u306F\u2026\u2026 HC2
3:\u72AF\u4EBA\u306E\u30AD\u30BB\u30AD\u4F7F\u3044\u306F\u2026\u2026 HC3
4:\u72AF\u4EBA\u3092\u8FFD\u3044\u8A70\u3081\u308B\u3079\u304F\u2026\u2026 HC4
5:\u6226\u3044\u306E\u7D50\u679C\u306F\u2026\u2026 HC5
6:\u30D0\u30EC\u30C3\u30C8\u306F\u6700\u5F8C\u306B\u2026\u2026 HC6
`),E(T[0],`TABLES`,u.$translate_tables(u.locale)),C(u,`$initialize`,function P(o){P.$$p;var _=this;return P.$$p=null,I(_,A(_,`initialize`,P,!1,!0),`initialize`,[o],null),_.sides_implicit_d=6,_.round_type=p(f(`RoundType`),`CEIL`),_.d66_sort_type=p(f(`D66SortType`),`NO_SORT`)}),C(u,`$eval_game_system_specific_command`,function(o){var r=this,_=a,$=a,b=a,H=a;return c(_=c($=c(b=c(H=r.$roll_max(o))?H:r.$roll_investigate(o))?b:r.$roll_sedative(o))?$:r.$roll_solve(o))?_:r.$roll_tables(o,p(r.$class(),`TABLES`))}),u.$private(),C(u,`$roll_max`,function(o){var r=this,_=a,$=a,b=a,H=a;return _=p(f(`Command`),`Parser`).$new(`DM`,i([`round_type`],{round_type:r.round_type})).$has_prefix_number(),$=_.$parse(o),c($)?(b=r.randomizer.$roll_barabara($.$prefix_number(),6),H=b.$max(),l(f(`Result`).$new(),`tap`,[],function(d){var D;return d??=a,D=[``+o+` ＞ [`+b.$join(`,`)+`] ＞ `+H],l(d,`text=`,D),D[D.length-1]})):a}),C(u,`$roll_investigate`,function(o){var r=this,_=a,$=a,b=a,H=a,z=a,d=a,D=a;return _=p(f(`Command`),`Parser`).$new(`IN`,i([`round_type`],{round_type:r.round_type})).$has_prefix_number(),$=_.$parse(o),c($)?(b=[],H=!1,z=!1,d=r.randomizer.$roll_barabara($.$prefix_number(),6),D=d.$max(),c(W(D,5))?(H=!0,b.$push(r.$translate(`KizunaBullet.INVESTIGATE.success`))):c(W(D,3))?(b.$push(r.$translate(`KizunaBullet.INVESTIGATE.failure`)),b.$push(r.$translate(`KizunaBullet.INVESTIGATE.partnerHelp`))):(z=!0,b.$push(r.$translate(`KizunaBullet.INVESTIGATE.failure`)),b.$push(r.$translate(`KizunaBullet.INVESTIGATE.fumble`))),l(f(`Result`).$new(),`tap`,[],function(h){var S;return h??=a,h[`$text=`](``+o+` ＞ [`+d.$join(`,`)+`] ＞ `+b.$join(``)),h[`$condition=`](H),S=[z],l(h,`fumble=`,S),S[S.length-1]})):a}),C(u,`$roll_sedative`,function(o){var r=this,_=a,$=a,b=a,H=a,z=a,d=a,D=a;return _=p(f(`Command`),`Parser`).$new(`SE`,i([`round_type`],{round_type:r.round_type})).$has_suffix_number(),$=_.$parse(o),c($)?(b=``,H=!1,z=r.randomizer.$roll_sum(2,6),c(k($.$suffix_number(),12))?b=r.$translate(`KizunaBullet.SEDATIVE.burst`):c(V($.$suffix_number(),6))?b=r.$translate(`KizunaBullet.SEDATIVE.alive`):c(k(z,$.$suffix_number()))?(H=!0,b=r.$translate(`KizunaBullet.SEDATIVE.success`)):(d=w($.$suffix_number(),z),D=G(M(d,2),1),b=r.$translate(`KizunaBullet.SEDATIVE.failure`,i([`check`],{check:D.$to_s()}))),l(f(`Result`).$new(),`tap`,[],function(h){var S;return h??=a,h[`$text=`](``+o+` ＞ `+z+` ＞ `+b),S=[H],l(h,`condition=`,S),S[S.length-1]})):a}),C(u,`$roll_solve`,function(o){var r=this,_=a,$=a,b=a;return _=p(f(`Command`),`Parser`).$new(`SO`,i([`round_type`],{round_type:r.round_type})).$enable_prefix_number(),$=_.$parse(o),c($)?(b=r.randomizer.$roll_sum(G($.$prefix_number().$to_i(),2),6),l(f(`Result`).$new(),`tap`,[],function(z){var d;return z??=a,d=[``+o+` ＞ `+b],l(z,`text=`,d),d[d.length-1]})):a}),u.$register_prefix(`\\d+DM`,`\\d+IN`,`SE\\d+`,`\\d*SO`,f(`TABLES`).$keys())})(n[0],F(`Base`),n)})(K[0],K)})(y[0],y)};Opal.queue(function(t){var R=t.module,x=t.klass,E=t.const_set,I=t.send2,A=t.find_super,C=t.def,c=t.top,i=[];t.nil;return c.$require(`bcdice/game_system/KizunaBullet`),c.$require(`bcdice/game_system/kizuna_bullet/tables`),(function(W,k){var w=[R(W,`BCDice`)].concat(k);return(function(G,M){var y=[R(G,`GameSystem`)].concat(M),a=t.$r(y);return(function(p,q,j){var O=x(p,q,`KizunaBullet_Korean`),K=[O].concat(j);return E(K[0],`ID`,`KizunaBullet:Korean`),E(K[0],`NAME`,`키즈나 불릿`),E(K[0],`SORT_KEY`,`国際化:Korean:키즈나 불릿`),E(K[0],`HELP_MESSAGE`,`\u30FB\uB2E4\uC774\uC2A4 \uB864
nDM...n\uAC1C\uC758 6\uBA74 \uB2E4\uC774\uC2A4\uB97C \uAD74\uB824 \uAC00\uC7A5 \uB192\uC740 \uAC12\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.
\u30FB\uFF3B\uC870\uC0AC \uD310\uC815\uFF3D
nIN\u2026n\uAC1C\uC758 6\uBA74 \uB2E4\uC774\uC2A4\uB97C \uAD74\uB824 \uAC00\uC7A5 \uB192\uC740 \uAC12\uC774 5 \uC774\uC0C1\uC774\uBA74 \uC131\uACF5\uD569\uB2C8\uB2E4. ([\uD30C\uD2B8\uB108\uC758 \uD5EC\uD504] \uC0AC\uC6A9\uAC00\uB2A5)
\u30FB\uFF3B\uC9C4\uC815 \uD310\uC815\uFF3D
SEn\u20262\uAC1C\uC758 6\uBA74 \uB2E4\uC774\uC2A4\uB97C \uAD74\uB824 \uD569\uACC4\uCE58\uAC00 n([\uADE0\uC5F4]\uC0C1\uD0DC\uC758 [\uD0A4\uC988\uB098]\uC758 \uAC1C\uC218)\uBCF4\uB2E4 \uB192\uC73C\uBA74 \uC131\uACF5\uD569\uB2C8\uB2E4. ([\uAC15\uC81C \uC9C4\uC815]\uC0AC\uC6A9\uAC00\uB2A5)
\u30FB\uFF3B\uD574\uACB0\uFF3D \uFF3B\uC561\uC158\uFF3D\uC758 \uB300\uBBF8\uC9C0\uC640\uFF3B\uC561\uC2DC\uB358\uD2B8\uFF3D\uC758 \uB300\uBBF8\uC9C0 \uACBD\uAC10
nSO\u20262+n\uAC1C\uC758 6\uBA74 \uB2E4\uC774\uC2A4\uB97C \uAD74\uB824 \uACB0\uACFC\uAC12\uC744 \uBAA8\uB450 \uD569\uC0B0\uD569\uB2C8\uB2E4. (n\uC740 \uC904\uC778 \u3010\uC5EC\uAE30\uCE58\u3011. \uC0DD\uB7B5 \uAC00\uB2A5)

\u30FB\uAC01\uC885\uD45C
\uC77C\uC0C1 \uD45C\u30FB\uC7A5\uC18C OP
\uC77C\uC0C1 \uD45C\u30FB\uB0B4\uC6A9 OC
\uC77C\uC0C1 \uD45C\u30FB\uC7A5\uC18C \uBC0F \uB0B4\uC6A9 OPC
\uC77C\uC0C1 \uD45C(\uC77C)\u30FB\uC7A5\uC18C OWP
\uC77C\uC0C1 \uD45C(\uC77C)\u30FB\uB0B4\uC6A9 OWC
\uC77C\uC0C1 \uD45C(\uC77C)\u30FB\uC7A5\uC18C \uBC0F \uB0B4\uC6A9 OWPC
\uC77C\uC0C1 \uD45C(\uD734\uAC00)\u30FB\uC7A5\uC18C OHP
\uC77C\uC0C1 \uD45C(\uD734\uAC00)\u30FB\uB0B4\uC6A9 OHC
\uC77C\uC0C1 \uD45C(\uD734\uAC00)\u30FB\uC7A5\uC18C \uBC0F \uB0B4\uC6A9 OHPC
\uC77C\uC0C1 \uD45C(\uCD9C\uC7A5)\u30FB\uC7A5\uC18C OTP
\uC77C\uC0C1 \uD45C(\uCD9C\uC7A5)\u30FB\uB0B4\uC6A9 OTC
\uC77C\uC0C1 \uD45C(\uCD9C\uC7A5)\u30FB\uC7A5\uC18C \uBC0F \uB0B4\uC6A9 OTPC

\uD134 \uD14C\uB9C8\uD45C TT
\uD134 \uD14C\uB9C8\uD45C\u30FB\uCE5C\uBC00 TTI
\uD134 \uD14C\uB9C8\uD45C\u30FB\uCFE8 TTC
\uD134 \uD14C\uB9C8\uD45C\u30FB\uC8FC\uC885 TTH

\uC870\uC6B0 \uD45C\u30FB\uC7A5\uC18C EP
\uC870\uC6B0 \uD45C\u30FB\uCD9C\uD604 \uC21C\uC11C EO
\uC870\uC6B0 \uD45C\u30FB\uC0C1\uD669(\uCCAB\uB300\uBA74) EF
\uC870\uC6B0 \uD45C\u30FB\uC0C1\uD669(\uC544\uB294 \uC0AC\uC774) EA
\uC870\uC6B0 \uD45C\u30FB\uACB0\uCC29 EE
\uC870\uC6B0 \uD45C\xB7\uC7A5\uC18C\uC640 \uB4F1\uC7A5 \uC21C\uC11C\uC640 \uC0C1\uD669(\uCCAB\uB300\uBA74)\uACFC \uACB0\uCC29 EFA
\uC870\uC6B0 \uD45C\xB7\uC7A5\uC18C\uC640 \uB4F1\uC7A5\uC21C\uC11C\uC640 \uC0C1\uD669(\uC544\uB294 \uC0AC\uC774)\uACFC \uACB0\uD310 EAA

\uAD50\uB958 \uD45C\xB7\uC7A5\uC18C CP
\uAD50\uB958 \uD45C\xB7\uB0B4\uC6A9 CC
\uAD50\uB958 \uD45C\xB7\uC7A5\uC18C \uBC0F \uB0B4\uC6A9 CPC

\uC870\uC0AC \uD45C \xB7 \uBCA0\uC774\uC9C1 IB
\uC870\uC0AC \uD45C\u30FB\uB2E4\uC774\uB098\uBBF9 ID
\uC870\uC0AC \uD45C\u30FB\uBCA0\uC774\uC9C1\uACFC \uB2E4\uC774\uB098\uBBF9 IBD

\uD574\uC800\uB4DC \uD45C HA

\uD1B5\uC0C1 \uB2E4\uC774\uC81C\uC2A4\uD2B8: \uB2F9\uC2E0\uB4E4\uC5D0\uAC8C \uC0C8\uB85C\uC6B4 \uBA85\uB839\uC774 \uB5A8\uC5B4\uC84C\uB2E4(\uC870\uC0AC\uAC00 \uC758\uB8B0\uB418\uC5C8\uB2E4).
1:\uADF8 \uC0AC\uAC74\uC758 \uB0B4\uC6A9\uC740\u2026\u2026. NI1
2:\uC870\uC0AC\uD558\uB7EC \uD5A5\uD55C \uC7A5\uC18C\uB294\u2026\u2026 NI2
3:\uBC94\uC778\uC778 \uAE30\uC801\uC0AC\uB294\u2026\u2026 NI3
4:\uC77C\uC5B4\uB09C \uC77C\uC740\u2026\u2026. NI4
5:\uBD88\uB9BF \uC0AC\uC774\uC5D0\uC11C\uB294\u2026\u2026 NI5
6:\uC2F8\uC6C0\uC758 \uACB0\uB9D0\uC740\u2026\u2026 NI6

\uD1B5\uC0C1 \uB2E4\uC774\uC81C\uC2A4\uD2B8: \uB2F9\uC2E0\uB4E4\uC740 \uC5EC\uD589(\uCD9C\uC7A5)\uC73C\uB85C \uC5B4\uB290 \uC7A5\uC18C\uB97C \uCC3E\uC558\uB2E4.
1:\uADF8 \uC7A5\uC18C\uB780\u2026\u2026 NT1
2:\uADF8\uACF3\uC5D0\uC11C \uC2DC\uC791\uD55C \uAC83\uC740\u2026\u2026 NT2
3:\uADF9\uD55C\uC758 \uC0C1\uD669 \uC18D\uC5D0\uC11C\u2026\u2026 NT3
4:\uBC94\uC778\uC778 \uAE30\uC801\uC0AC\uB294\u2026\u2026 NT4
5:\uBD88\uB9BF \uC0AC\uC774\uC5D0\uC11C\uB294\u2026\u2026 NT5
6:\uC2F8\uC6C0\uC758 \uACB0\uB9D0\uC740\u2026\u2026 NT6

\uD640\uB9AC\uB370\uC774 \uB2E4\uC774\uC81C\uC2A4\uD2B8: \uB2F9\uC2E0\uB4E4\uC740 \uD734\uC77C\uC5D0 \uB098\uAC00\uAE30\uB85C \uD588\uB2E4.
1:\uADF8 \uC7A5\uC18C\uB780\u2026\u2026 HH1
2:\uC57D\uC18D\uD558\uACE0 \uB9CC\uB098\uBA74\u2026\u2026 HH2
3:\uADF8\uB9AC\uACE0 \uBB34\uB824\u2026\u2026\u2026 HH3
4:\uB450 \uC0AC\uB78C\uC774 \uACB0\uC815\uD55C \uAC83\uC740\u2026\u2026 HH4
5:\uACB0\uACFC\uC801\uC73C\uB85C\u2026\u2026 HH5
6:\uBD88\uB9BF\uC740 \uB9C8\uC9C0\uB9C9\uC73C\uB85C\u2026\u2026 HH6

\uD640\uB9AC\uB370\uC774 \uB2E4\uC774\uC81C\uC2A4\uD2B8: \uB2F9\uC2E0\uB4E4\uC740 \uAE30\uBB18\uD55C \uC0AC\uAC74\uC744 \uB9C8\uC8FC\uD588\uB2E4.
1:\uADF8 \uC7A5\uC18C\uB780\u2026\u2026 HC1
2:\uC77C\uC5B4\uB09C \uC0AC\uAC74\uC740\u2026\u2026. HC2
3:\uBC94\uC778\uC778 \uC2DC\uC801\uC0AC\uB294\u2026\u2026 HC3
4:\uBC94\uC778\uC744 \uBAB0\uC544\uBD99\uC774\uAE30 \uC704\uD574\u2026\u2026 HC4
5:\uC2F8\uC6C0\uC758 \uACB0\uACFC\uB294\u2026\u2026 HC5
6:\uBD88\uB9BF\uC740 \uB9C8\uC9C0\uB9C9\uC73C\uB85C\u2026\u2026HC6
`),C(O,`$initialize`,function N(g){N.$$p;var n=this;return N.$$p=null,I(n,A(n,`initialize`,N,!1,!0),`initialize`,[g],null),n.locale=`ko_kr`}),E(K[0],`TABLES`,O.$translate_tables(`ko_kr`)),O.$register_prefix_from_super_class()})(y[0],a(`KizunaBullet`),y)})(w[0],w)})(i[0],i)});