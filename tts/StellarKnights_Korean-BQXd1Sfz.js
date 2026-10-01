import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.modules[`bcdice/dice_table/table`]=function(n){var L=n.module,q=n.klass,d=n.hash2,w=n.defs,H=n.truthy,f=n.def,u=n.rb_minus,v=[],E=n.nil;return(function(_,b){var y=[L(_,`BCDice`)].concat(b);return(function(p,F){var z=[L(p,`DiceTable`)].concat(F);return(function(C,P,t){var i=q(C,P,`Table`),g=[i].concat(t),D=n.$r(g),Y=i.$$prototype;return Y.times=Y.sides=Y.name=Y.items=E,w(i,`$from_i18n`,function(B,$){var c=this,T=E;return T=D(`I18n`).$t(B,d([`locale`],{locale:$})),c.$new(T[`$[]`](`name`),T[`$[]`](`type`),T[`$[]`](`items`))}),f(i,`$initialize`,function(B,$,c){var T=this,K=E;return T.name=B,T.items=c.$freeze(),K=/(\d+)D(\d+)/i.$match($),H(K)||T.$raise(D(`ArgumentError`),`Unexpected table type: `+$),T.times=K[`$[]`](1).$to_i(),T.sides=K[`$[]`](2).$to_i()}),f(i,`$roll`,function(B){var $=this,c=E;return c=B.$roll_sum($.times,$.sides),$.$choice(c)}),f(i,`$choice`,function(B){var $=this,c=E;return c=u(B,$.times),D(`RollResult`).$new($.name,B,$.items[`$[]`](c))})})(z[0],null,z)})(y[0],y)})(v[0],v)};Opal.modules[`bcdice/dice_table/d66_grid_table`]=function(n){var L=n.module,q=n.klass,d=n.hash2,w=n.defs,H=n.def,f=n.rb_plus,u=n.rb_times,v=n.rb_minus,E=[],_=n.nil;return(function(b,x){var p=[L(b,`BCDice`)].concat(x);return(function(F,M){var C=[L(F,`DiceTable`)].concat(M);return(function(P,t,i){var g=q(P,t,`D66GridTable`),D=[g].concat(i),Y=n.$r(D),G=g.$$prototype;return G.name=G.items=_,w(g,`$from_i18n`,function($,c){var T=this,K=_;return K=Y(`I18n`).$t($,d([`locale`,`raise`],{locale:c,raise:!0})),T.$new(K[`$[]`](`name`),K[`$[]`](`items`))}),H(g,`$initialize`,function($,c){var T=this;return T.name=$,T.items=c.$freeze()}),H(g,`$roll`,function($){var c=this,T=_,K=_,N=_,U=_,J=_;return T=$.$roll_once(6),K=$.$roll_once(6),N=f(u(T,10),K),U=v(T,1),J=v(K,1),Y(`RollResult`).$new(c.name,N,c.items[`$[]`](U)[`$[]`](J))})})(C[0],null,C)})(p[0],p)})(E[0],E)};Opal.modules[`bcdice/game_system/StellarKnights`]=function(n){var L=n.module,q=n.klass,d=n.const_set,w=n.send2,H=n.find_super,f=n.def,u=n.truthy,v=n.eqeq,E=n.thrower,_=n.rb_plus,b=n.send,x=n.rb_ge,y=n.hash2,p=n.rb_gt,F=n.range,M=n.to_ary,z=n.rb_le,C=n.top,P=[],t=n.nil,i=n.$$$;return C.$require(`bcdice/dice_table/table`),C.$require(`bcdice/dice_table/d66_grid_table`),(function(g,D){var G=[L(g,`BCDice`)].concat(D);return(function(B,$){var T=[L(B,`GameSystem`)].concat($),K=n.$r(T);return(function(N,U,J){var m=q(N,U,`StellarKnights`),I=[m].concat(J),W=n.$r(I),O=m.$$prototype;return O.randomizer=t,d(I[0],`ID`,`StellarKnights`),d(I[0],`NAME`,`銀剣のステラナイツ`),d(I[0],`SORT_KEY`,`きんけんのすてらないつ`),d(I[0],`HELP_MESSAGE`,`\u30FB\u30A2\u30BF\u30C3\u30AF\u5224\u5B9A\u3000nSK[d][,k>l,...]
[]\u5185\u306F\u7701\u7565\u53EF\u80FD\u3002
n: \u30C0\u30A4\u30B9\u6570\u3001d: \u30A2\u30BF\u30C3\u30AF\u5224\u5B9A\u306B\u304A\u3051\u308B\u5BFE\u8C61\u306E\u9632\u5FA1\u529B\u3001k, l: \u30C0\u30A4\u30B9\u306E\u51FA\u76EE\u304Ck\u306A\u3089\u3070l\u306B\u5909\u66F4\uFF08\u30A2\u30DE\u30E9\u30F3\u30B5\u30B9\u306E\u30B9\u30AD\u30EB\u300C\u59CB\u307E\u308A\u306E\u90E8\u5C4B\u300D\u7528\uFF09
d\u7701\u7565\u6642\u306F\u30C0\u30A4\u30B9\u3092\u632F\u3063\u305F\u7D50\u679C\u306E\u307F\u8868\u793A\u3002\uFF08nSK\u306FnB6\u3068\u540C\u3058\uFF09

4SK: \u30C0\u30A4\u30B9\u30924\u500B\u632F\u3063\u3066\u3001\u305D\u306E\u7D50\u679C\u3092\u8868\u793A
4+2SK: \u30C0\u30A4\u30B9\u30924+2 (=6) \u500B\u632F\u3063\u3066\u3001\u305D\u306E\u7D50\u679C\u3092\u8868\u793A
5/2SK: \u30C0\u30A4\u30B9\u30925\u500B\u306E\u534A\u5206 (=2) \u500B\u632F\u3063\u3066\u3001\u305D\u306E\u7D50\u679C\u3092\u8868\u793A
(5+3)/2SK: \u30C0\u30A4\u30B9\u3092(5+3)\u500B\u306E\u534A\u5206 (=4) \u500B\u632F\u3063\u3066\u3001\u305D\u306E\u7D50\u679C\u3092\u8868\u793A
5SK3: \u3010\u30A2\u30BF\u30C3\u30AF\u5224\u5B9A\uFF1A5\u30C0\u30A4\u30B9\u3011\u3001\u5BFE\u8C61\u306E\u9632\u5FA1\u529B\u30923\u3068\u3057\u3066\u6210\u529F\u6570\u3092\u8868\u793A
3SK,1>6: \u30C0\u30A4\u30B9\u30923\u500B\u632F\u308A\u3001\u51FA\u76EE\u304C1\u306E\u30C0\u30A4\u30B9\u3092\u5168\u30666\u306B\u5909\u66F4\u3057\u3001\u305D\u306E\u7D50\u679C\u3092\u8868\u793A
6SK4,1>6,2>6: \u3010\u30A2\u30BF\u30C3\u30AF\u5224\u5B9A\uFF1A6\u30C0\u30A4\u30B9\u3011\u3001\u51FA\u76EE\u304C1\u30682\u306E\u30C0\u30A4\u30B9\u3092\u5168\u30666\u306B\u5909\u66F4\u3001\u5BFE\u8C61\u306E\u9632\u5FA1\u529B\u30924\u3068\u3057\u3066\u6210\u529F\u6570\u3092\u8868\u793A

\u30FB\u57FA\u672C
TT\uFF1A\u304A\u984C\u8868
STA    \uFF1A\u30B7\u30C1\u30E5\u30A8\u30FC\u30B7\u30E7\u30F3\u8868A\uFF1A\u6642\u9593 (Situation Table A)
STB    \uFF1A\u30B7\u30C1\u30E5\u30A8\u30FC\u30B7\u30E7\u30F3\u8868B\uFF1A\u5834\u6240 (ST B)
STB2[n]\uFF1A\u30B7\u30C1\u30E5\u30A8\u30FC\u30B7\u30E7\u30F3\u8868B \u305D\u306E2\uFF1A\u5B66\u5712\u7DE8 (ST B 2)
\u3000n: 1(\u30A2\u30FC\u30BB\u30EB\u30C8\u30EC\u30A4), 2(\u30A4\u30C7\u30A2\u30B0\u30ED\u30EA\u30A2), 3(\u30B7\u30C8\u30E9), 4(\u30D5\u30A3\u30ED\u30BD\u30D5\u30A3\u30A2), 5(\u8056\u30A2\u30FC\u30B8\u30A7\u30C6\u30A3\u30A2), 6(SoA)
STC    \uFF1A\u30B7\u30C1\u30E5\u30A8\u30FC\u30B7\u30E7\u30F3\u8868C\uFF1A\u8A71\u984C (ST C)
ALLS   \uFF1A\u30B7\u30C1\u30E5\u30A8\u30FC\u30B7\u30E7\u30F3\u8868\u5168\u3066\u3092\u4E00\u62EC\u3067\uFF08\u5B66\u5712\u7DE8\u9664\u304F\uFF09
GAT\uFF1A\u6240\u5C5E\u7D44\u7E54\u6C7A\u5B9A (Gakuen Table)
HOT\uFF1A\u5E0C\u671B\u8868 (Hope Table)
DET\uFF1A\u7D76\u671B\u8868 (Despair Table)
WIT\uFF1A\u9858\u3044\u4E8B\u8868 (Wish Table)
YST\uFF1A\u3042\u306A\u305F\u306E\u7269\u8A9E\u8868 (Your Story Table)
YSTA\uFF1A\u3042\u306A\u305F\u306E\u7269\u8A9E\u8868\uFF1A\u7570\u4E16\u754C (YST Another World)
PET\uFF1A\u6027\u683C\u8868 (Personality Table)
    \u6027\u683C\u8868\u30922\u56DE\u632F\u308A\u3001\u6027\u683C\u3092\u6C7A\u5B9A\u3059\u308B

\u30FB\u9727\u3068\u685C\u306E\u30DE\u30EB\u30B8\u30CA\u30EA\u30A2
YSTM\uFF1A\u3042\u306A\u305F\u306E\u7269\u8A9E\u8868\uFF1A\u30DE\u30EB\u30B8\u30CA\u30EA\u30A2\u4E16\u754C (YST Marginalia)
STM\uFF1A\u30B7\u30C1\u30E5\u30A8\u30FC\u30B7\u30E7\u30F3\u8868\uFF1A\u30DE\u30EB\u30B8\u30CA\u30EA\u30A2\u4E16\u754C (ST Marginalia)
YSTL\uFF1A\u3042\u306A\u305F\u306E\u7269\u8A9E\u8868\uFF1A\u624B\u7D19\u4E16\u754C (YST Letter)
YSTR\uFF1A\u3042\u306A\u305F\u306E\u7269\u8A9E\u8868\uFF1A\u30EA\u30B3\u30EC\u30AF\u30C8\u30FB\u30C9\u30FC\u30EB (YST Recollect-doll)
STBR\uFF1A\u30B7\u30C1\u30E5\u30A8\u30FC\u30B7\u30E7\u30F3\u8868B\uFF1A\u5834\u6240\uFF08\u30EA\u30B3\u30EC\u30AF\u30C8\u30FB\u30C9\u30FC\u30EB\uFF09 (ST B Recollect-doll)
STCR\uFF1A\u30B7\u30C1\u30E5\u30A8\u30FC\u30B7\u30E7\u30F3\u8868C\uFF1A\u30EA\u30B3\u30EC\u30AF\u30C8 (ST C Recollect)
STBS\uFF1A\u30B7\u30C1\u30E5\u30A8\u30FC\u30B7\u30E7\u30F3\u8868B\uFF1A\u30B7\u30C8\u30E9\u30BB\u30C3\u30C6\u30A3\u30F3\u30B0 (ST B Sut Tu Real)
STE\uFF1A\u30B7\u30C1\u30E5\u30A8\u30FC\u30B7\u30E7\u30F3\u8868\uFF1A\u30A8\u30AF\u30EA\u30D7\u30B9\u5C02\u7528 (ST Eclipse)

\u30FB\u7D2B\u5F3E\u306E\u30AA\u30EB\u30C8\u30EA\u30F4\u30FC\u30C8
FT\uFF1A\u30D5\u30E9\u30B0\u30E1\u30F3\u30C8\u8868 (Fragment Table)
    \u30D5\u30E9\u30B0\u30E1\u30F3\u30C8\u8868\u3092\uFF15\u56DE\u632F\u308B
FTx\uFF1A\u30D5\u30E9\u30B0\u30E1\u30F3\u30C8\u8868\u3092x\u56DE\u632F\u308B
YSTB\uFF1A\u3042\u306A\u305F\u306E\u7269\u8A9E\u8868\uFF1A\u30D6\u30EA\u30F3\u30AC\u30FC (YST Bringer)
YSTF\uFF1A\u3042\u306A\u305F\u306E\u7269\u8A9E\u8868\uFF1A\u30D5\u30A9\u30FC\u30B8 (YST Forge)
STAL\uFF1A\u30B7\u30C1\u30E5\u30A8\u30FC\u30B7\u30E7\u30F3\u8868\uFF1A\u30AA\u30EB\u30C8\u30EA\u30F4\u30FC\u30C8 (ST Alt-Levoot)
`),f(m,`$initialize`,function h(l){h.$$p;var e=this;return h.$$p=null,w(e,H(e,`initialize`,h,!1,!0),`initialize`,[l],null),e.sort_barabara_dice=!0,e.d66_sort_type=i(W(`D66SortType`),`NO_SORT`)}),f(m,`$eval_game_system_specific_command`,function(l){try{E(`eval_return`);var e=this,a=t,r=t,R=t,S=t,o=t;return l=l.$upcase(),u(a=i(e.$class(),`TABLES`)[`$[]`](l))?a.$roll(e.randomizer):u(r=/([()+\/\d]+)SK(\d)?((,\d>\d)+)?/.$match(l))?(R=W(`Arithmetic`).$eval(r[`$[]`](1),i(W(`RoundType`),`FLOOR`)),u(R[`$nil?`]())?t:e.$resolute_action(R,u(S=r[`$[]`](2))?r[`$[]`](2).$to_i():S,r[`$[]`](3))):v(l,`STB2`)?e.$roll_all_situation_b2_tables():v(l,`ALLS`)?e.$roll_all_situation_tables():v(l,`PET`)?e.$roll_personality_table():u(r=/FT(\d+)?/.$match(l))?(o=(u(S=r[`$[]`](1))?S:5).$to_i(),e.$roll_fragment_table(o)):t}catch(k){if(k===n.t_eval_return)return k.$v;throw k}}),m.$private(),f(m,`$resolute_action`,function(l,s,e){var a=this,r=t,R=t,S=t,o=t,k=t,V=t,X=t;return r=a.randomizer.$roll_barabara(l,6).$sort(),R=r.$join(`,`),S=`(`+a.$remake_command(l,s,e)+`) ＞ `+R,u(r[`$empty?`]())?_(S,a.$translate(`StellarKnights.SK.no_dice_error`)):(o=a.$parse_dice_change_rules(e),b(o,`each`,[],function(A){return A??=t,b(r,`map!`,[],function(Q){return Q??=t,v(Q,A[`$[]`](`from`))?A[`$[]`](`to`):Q})}),u(o[`$empty?`]())||(r[`$sort!`](),S=_(S,` ＞ [`+r.$join(`,`)+`]`)),u(s[`$nil?`]())?(k=!1,V=!1):(X=b(r,`count`,[],function(A){return A??=t,x(A,s)}),S=_(S,_(` ＞ `,a.$translate(`StellarKnights.SK.success_num`,y([`success_num`],{success_num:X})))),k=p(X,0),V=k[`$!`]()),b(W(`Result`).$new(S),`tap`,[],function(A){var j;return A??=t,A[`$success=`](k),j=[V],b(A,`failure=`,j),j[j.length-1]}))}),f(m,`$remake_command`,function(l,s,e){var a=t;return a=``+l+`SK`,u(s[`$nil?`]())||(a=_(a,s.$to_s())),u(e[`$nil?`]())||(a=_(a,e)),a}),f(m,`$parse_dice_change_rules`,function(l){return u(l[`$nil?`]())?[]:(l=l[`$[]`](F(1,-1,!1)),b(l.$split(`,`),`map`,[],function(e){var a=t;return e??=t,a=b(e.$split(`>`),`map`,[],`to_i`.$to_proc()),y([`from`,`to`],{from:a[`$[]`](0),to:a[`$[]`](1)})}))}),f(m,`$roll_all_situation_b2_tables`,function(){var l=this;return b(F(1,6,!1),`map`,[],function s(e){var a=s.$$s==null?this:s.$$s;return a.randomizer??=t,e??=t,i(a.$class(),`TABLES`)[`$[]`](`STB2`+e).$roll(a.randomizer)},{$$s:l}).$join(`
`)}),f(m,`$roll_all_situation_tables`,function(){return b([`STA`,`STB`,`STC`],`map`,[],function s(e){var a=s.$$s==null?this:s.$$s;return a.randomizer??=t,e??=t,i(a.$class(),`TABLES`)[`$[]`](e).$roll(a.randomizer)},{$$s:this}).$join(`
`)}),f(m,`$roll_personality_table`,function(){var l,s,e=this,a=t,r=t,R=t,S=t,o=t,k=t;return s=e.$get_table_by_d66(e.$translate(`StellarKnights.PET.items`)),l=M(s),a=l[0]==null?t:l[0],r=l[1]==null?t:l[1],s=e.$get_table_by_d66(e.$translate(`StellarKnights.PET.items`)),l=M(s),R=l[0]==null?t:l[0],S=l[1]==null?t:l[1],o=e.$translate(`StellarKnights.PET.name`),k=e.$translate(`StellarKnights.PET.result`,y([`value1`,`value2`],{value1:a,value2:R})),``+o+`(`+r+`,`+S+`) ＞ `+k}),f(m,`$roll_fragment_table`,function(l){var s=this,e=t,a=t,r=t,R=t;return u(z(l,0))?t:(e=b(W(`Array`),`new`,[l],function S(){var o=S.$$s==null?this:S.$$s;return o.$get_table_by_d66(o.$translate(`StellarKnights.FT.items`))},{$$s:s}),a=b(e,`map`,[],function(o){return o??=t,o[`$[]`](0)}),r=b(e,`map`,[],function(o){return o??=t,o[`$[]`](1)}),R=s.$translate(`StellarKnights.FT.name`),``+R+`(`+r.$join(`,`)+`) ＞ `+a.$join(s.$translate(`StellarKnights.FT.sep`)))}),(function(h,l){var s=[h].concat(l),e=n.$r(s);return h.$private(),f(h,`$translate_tables`,function(r){return y([`TT`,`STA`,`STB`,`STB21`,`STB22`,`STB23`,`STB24`,`STB25`,`STB26`,`STC`,`GAT`,`HOT`,`DET`,`WIT`,`YST`,`YSTA`,`YSTM`,`STM`,`YSTL`,`YSTR`,`STBR`,`STCR`,`STBS`,`STE`,`YSTB`,`YSTF`,`STAL`],{TT:i(e(`DiceTable`),`D66GridTable`).$from_i18n(`StellarKnights.tables.TT`,r),STA:i(e(`DiceTable`),`Table`).$from_i18n(`StellarKnights.tables.STA`,r),STB:i(e(`DiceTable`),`D66OneThirdTable`).$from_i18n(`StellarKnights.tables.STB`,r),STB21:i(e(`DiceTable`),`Table`).$from_i18n(`StellarKnights.tables.STB21`,r),STB22:i(e(`DiceTable`),`Table`).$from_i18n(`StellarKnights.tables.STB22`,r),STB23:i(e(`DiceTable`),`Table`).$from_i18n(`StellarKnights.tables.STB23`,r),STB24:i(e(`DiceTable`),`Table`).$from_i18n(`StellarKnights.tables.STB24`,r),STB25:i(e(`DiceTable`),`Table`).$from_i18n(`StellarKnights.tables.STB25`,r),STB26:i(e(`DiceTable`),`Table`).$from_i18n(`StellarKnights.tables.STB26`,r),STC:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.STC`,r),GAT:i(e(`DiceTable`),`Table`).$from_i18n(`StellarKnights.tables.GAT`,r),HOT:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.HOT`,r),DET:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.DET`,r),WIT:i(e(`DiceTable`),`D66OneThirdTable`).$from_i18n(`StellarKnights.tables.WIT`,r),YST:i(e(`DiceTable`),`D66OneThirdTable`).$from_i18n(`StellarKnights.tables.YST`,r),YSTA:i(e(`DiceTable`),`D66OneThirdTable`).$from_i18n(`StellarKnights.tables.YSTA`,r),YSTM:i(e(`DiceTable`),`D66OneThirdTable`).$from_i18n(`StellarKnights.tables.YSTM`,r),STM:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.STM`,r),YSTL:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.YSTL`,r),YSTR:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.YSTR`,r),STBR:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.STBR`,r),STCR:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.STCR`,r),STBS:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.STBS`,r),STE:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.STE`,r),YSTB:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.YSTB`,r),YSTF:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.YSTF`,r),STAL:i(e(`DiceTable`),`D66HalfGridTable`).$from_i18n(`StellarKnights.tables.STAL`,r)})})})(n.get_singleton_class(m),I),d(I[0],`TABLES`,m.$translate_tables(`ja_jp`)),m.$register_prefix(`[()+\\/\\d]+SK`,`STB2`,`ALLS`,`PET`,`FT`,W(`TABLES`).$keys())})(T[0],K(`Base`),T)})(G[0],G)})(P[0],P)};Opal.queue(function(n){var L=n.module,q=n.klass,d=n.const_set,w=n.send2,H=n.find_super,f=n.def,u=n.top,v=[];n.nil;return u.$require(`bcdice/game_system/StellarKnights`),(function(_,b){var y=[L(_,`BCDice`)].concat(b);return(function(p,F){var z=[L(p,`GameSystem`)].concat(F),C=n.$r(z);return(function(P,t,i){var g=q(P,t,`StellarKnights_Korean`),D=[g].concat(i);return d(D[0],`ID`,`StellarKnights:Korean`),d(D[0],`NAME`,`은검의 스텔라나이츠`),d(D[0],`SORT_KEY`,`国際化:Korean:은검의 스텔라나이츠`),d(D[0],`HELP_MESSAGE`,`\u30FB\uD310\uC815\u3000nSK[d][,k>l,...]
[]\uC548\uC740 \uC0DD\uB7B5 \uAC00\uB2A5.
n: \uB2E4\uC774\uC2A4 \uAC1C\uC218, d: \uACF5\uACA9 \uD310\uC815 \uB300\uC0C1\uC758 \uBC29\uC5B4\uB825, k>l: \uB2E4\uC774\uC2A4\uB97C \uAD74\uB824 k\uAC00 \uB098\uC624\uBA74 l\uB85C \uBCC0\uACBD(\uC544\uB9C8\uB780\uC11C\uC2A4 \uC2A4\uD0AC \uC911\u300C\uC2DC\uC791\uC758 \uBC29\u300D\uC6A9\uFF09
d \uC0DD\uB7B5 \uC2DC \uB2E4\uC774\uC2A4\uB97C \uAD74\uB9B0 \uACB0\uACFC\uB9CC \uD45C\uC2DC. (nSK\uB294 nB6\uACFC \uB3D9\uC77C)

4SK: \uB2E4\uC774\uC2A4 4\uAC1C\uB97C \uAD74\uB9B0 \uACB0\uACFC \uD45C\uC2DC.
4+2SK: \u30C0\u30A4\u30B9\u30924+2 (=6) \u500B\u632F\u3063\u3066\u3001\u305D\u306E\u7D50\u679C\u3092\u8868\u793A
5/2SK: \u30C0\u30A4\u30B9\u30925\u500B\u306E\u534A\u5206 (=2) \u500B\u632F\u3063\u3066\u3001\u305D\u306E\u7D50\u679C\u3092\u8868\u793A
(5+3)/2SK: \u30C0\u30A4\u30B9\u3092(5+3)\u500B\u306E\u534A\u5206 (=4) \u500B\u632F\u3063\u3066\u3001\u305D\u306E\u7D50\u679C\u3092\u8868\u793A
5SK3: \u3010\uACF5\uACA9 \uD310\uC815: 5\uB2E4\uC774\uC2A4\u3011, \uB300\uC0C1\uC758 \uBC29\uC5B4\uB825\uC744 3\uC73C\uB85C \uACC4\uC0B0\uD574 \uC131\uACF5 \uC218 \uD45C\uC2DC.
3SK,1>6: \uB2E4\uC774\uC2A4 3\uAC1C \uAD74\uB9BC, 1\uC774 \uB098\uC624\uBA74 \uC804\uBD80 6\uC73C\uB85C \uBCC0\uACBD, \uB300\uC0C1\uC758 \uBC29\uC5B4\uB825\uC744 4\uB85C \uACC4\uC0B0\uD574 \uC131\uACF5 \uC218 \uD45C\uC2DC.
6SK4,1>6,2>6: \u3010\uACF5\uACA9 \uD310\uC815: 6\uB2E4\uC774\uC2A4\u3011, 1\uACFC 2\uAC00 \uB098\uC624\uBA74 \uC804\uBD80 6\uC73C\uB85C \uBCC0\uACBD, \uB300\uC0C1\uC758 \uBC29\uC5B4\uB825\uC744 4\uB85C \uACC4\uC0B0\uD574 \uC131\uACF5 \uC218 \uD45C\uC2DC.

\u30FB\uAE30\uBCF8
TT: \uC18C\uC7AC \uD45C
STA: \uC0C1\uD669 \uD45C A: \uC2DC\uAC04 (Situation Table A)
STB: \uC0C1\uD669 \uD45C B-1: \uC7A5\uC18C (ST B)
STB2[n]: \uC0C1\uD669 \uD45C B-2: \uD559\uC6D0\uD3B8 (ST B 2)
\u3000n: 1(\uC544\uC140\uD2B8\uB808\uC774 \uACF5\uB9BD\uB300\uD559), 2(\uC774\uB370\uC544\uAE00\uB85C\uB9AC\uC544 \uC608\uC220\uC885\uD569\uB300\uD559), 3(\uC2DC\uD2B8\uB77C \uC5EC\uD559\uC6D0), 4(\uD544\uB85C\uC18C\uD53C\uC544 \uB300\uD559), 5(\uC131 \uC544\uC81C\uD2F0\uC544 \uD559\uC6D0), 6(\uC2A4\uD3F0 \uC624\uBE0C \uC544\uC140\uD2B8\uB808\uC774)
STC: \uC0C1\uD669 \uD45C C: \uD654\uC81C (ST C)
ALLS: \uC0C1\uD669 \uD45C \uC804\uCCB4 \uC77C\uAD04 \uAD74\uB9BC (\uD559\uC6D0\uD3B8 \uC81C\uC678)
GAT: \uC18C\uC18D \uC870\uC9C1 \uACB0\uC815 (Gakuen Table)
HOT: \uD76C\uB9DD \uD45C (Hope Table)
DET: \uC808\uB9DD \uD45C (Despair Table)
WIT: \uC18C\uC6D0 \uD45C (Wish Table)
YST: \uB2F9\uC2E0\uC758 \uC774\uC57C\uAE30 \uD45C (Your Story Table)
YSTA: \uB2F9\uC2E0\uC758 \uC774\uC57C\uAE30 \uD45C (\uC774\uC138\uACC4) (YST Another World)
PET: \uC131\uACA9 \uD45C (Personality Table)
    \uC131\uACA9 \uD45C\uB97C 2\uBC88 \uAD74\uB824 \uC131\uACA9\uC744 \uACB0\uC815\uD55C\uB2E4.

\u30FB\uC548\uAC1C\uC640 \uBC9A\uAF43\uC758 \uB9C8\uB974\uC9C0\uB0A0\uB9AC\uC544
YSTM: \uB2F9\uC2E0\uC758 \uC774\uC57C\uAE30 \uD45C (\uB9C8\uB974\uC9C0\uB0A0\uB9AC\uC544) (YST Marginalia)
STM: \uC0C1\uD669 \uD45C: \uB9C8\uB974\uC9C0\uB0A0\uB9AC\uC544 (ST Marginalia)
YSTL: \uB2F9\uC2E0\uC758 \uC774\uC57C\uAE30 \uD45C (\uD3B8\uC9C0) (YST Letter)
YSTR: \uB2F9\uC2E0\uC758 \uC774\uC57C\uAE30 \uD45C (\uB9AC\uCF5C\uB809\uD2B8 \uB3CC) (YST Recollect-doll)
STBR: \uC0C1\uD669 \uD45C B: \uC7A5\uC18C (\uB9AC\uCF5C\uB809\uD2B8 \uB3CC) (ST B Recollect-doll)
STCR: \uC0C1\uD669 \uD45C C: \uB9AC\uCF5C\uB809\uD2B8 (ST C Recollect)
STBS: \uC0C1\uD669 \uD45C B: \uC2DC\uD2B8\uB77C \uC138\uD305 (ST B Sut Tu Real)
STE: \uC0C1\uD669 \uD45C: \uC774\uD074\uB9BD\uC2A4 \uC804\uC6A9 (ST Eclipse)

\u30FB\uC790\uD0C4\uC758 \uC54C\uD2B8\uB9AC\uBD80\uD2B8
FT: \uD504\uB798\uADF8\uBA3C\uD2B8 \uD45C (Fragment Table)
    \uD504\uB798\uADF8\uBA3C\uD2B8 \uD45C\uB97C 5\uBC88 \uAD74\uB9B0\uB2E4.
FTx: \uD504\uB798\uADF8\uBA3C\uD2B8 \uD45C\uB97C x\uD68C \uAD74\uB9B0\uB2E4.
YSTB: \uB2F9\uC2E0\uC758 \uC774\uC57C\uAE30 (\uBE0C\uB9C1\uAC70) (YST Bringer)
YSTF: \uB2F9\uC2E0\uC758 \uC774\uC57C\uAE30 (\uD3EC\uC9C0) (YST Forge)
STAL: \uC0C1\uD669 \uD45C (\uC54C\uD2B8\uB9AC\uBD80\uD2B8) (ST Alt-Levoot)
`),g.$register_prefix_from_super_class(),f(g,`$initialize`,function Y(G){Y.$$p;var $=this;return Y.$$p=null,w($,H($,`initialize`,Y,!1,!0),`initialize`,[G],null),$.locale=`ko_kr`}),d(D[0],`TABLES`,g.$translate_tables(`ko_kr`).$freeze())})(z[0],C(`StellarKnights`),z)})(y[0],y)})(v[0],v)});