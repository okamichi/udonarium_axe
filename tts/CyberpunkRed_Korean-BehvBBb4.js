import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.modules[`bcdice/game_system/cyberpunk_red/tables`]=function(l){var N=l.module,A=l.klass,S=l.ensure_kwargs,y=l.get_kwarg,v=l.def,f=l.rb_plus,c=l.hash2,x=l.range,C=[],i=l.nil,o=l.$$$;return(function(I,B){var D=[N(I,`BCDice`)].concat(B);return(function(H,z){var F=[N(H,`GameSystem`)].concat(z),Y=l.$r(F);return(function(G,P,M){var V=A(G,P,`CyberpunkRed`),E=[V].concat(M);return(function(k,g,m){var t=A(k,g,`ScreamSheetRandomizerTable`),R=[t].concat(m),_=l.$r(R),T=t.$$prototype;return T.type_table=T.locale=T.a_table=T.of_table=T.b_table=T.c_table=i,v(t,`$initialize`,function(n){var r,e,$,u,b,s,a=this;return n=S(n),r=y(n,`locale`),e=y(n,`type_table`),$=y(n,`a_table`),u=y(n,`of_table`),b=y(n,`b_table`),s=y(n,`c_table`),a.locale=r,a.type_table=e,a.a_table=$,a.of_table=u,a.b_table=b,a.c_table=s}),v(t,`$roll`,function(n){var r=this,e=i,$=i,u=i,b=i,s=i,a=i,p=i;return e=``,$=n.$roll_once(6),u=r.type_table.$choice($),e=f(e,``+u+_(`I18n`).$translate(`CyberpunkRed.news`,c([`locale`,`raise`],{locale:r.locale,raise:!0}))+`　『`),$=n.$roll_once(10),b=r.a_table.$choice($).$body(),e=f(e,b),$=n.$roll_once(6),s=r.of_table.$choice($).$body(),e=f(e,s),$=n.$roll_once(10),b=r.a_table.$choice($).$body(),e=f(e,b),$=n.$roll_once(6),s=r.of_table.$choice($).$body(),e=f(e,s),$=n.$roll_once(10),a=r.b_table.$choice($).$body(),e=f(e,a),$=n.$roll_once(10),p=r.c_table.$choice($).$body(),e=f(e,p),e=f(e,`』`),e})})(E[0],null,E),(function(k,g,m){var t=A(k,g,`ShopPeopleTable`),R=[t].concat(m),_=l.$r(R),T=t.$$prototype;return T.locale=T.staff_table=T.people_a_table=T.people_b_table=i,v(t,`$initialize`,function(n){var r,e,$,u,b=this;return n=S(n),r=y(n,`locale`),e=y(n,`staff_table`),$=y(n,`people_a_table`),u=y(n,`people_b_table`),b.locale=r,b.staff_table=e,b.people_a_table=$,b.people_b_table=u}),v(t,`$roll`,function(n){var r=this,e=i,$=i,u=i,b=i;return e=_(`I18n`).$translate(`CyberpunkRed.ShopPeopleTableText.intro`,c([`locale`,`raise`],{locale:r.locale,raise:!0})),$=n.$roll_once(6),u=r.staff_table.$choice($).$body(),u=u[`$[]`](x(0,-2,!1)),e=f(e,u),e=f(e,_(`I18n`).$translate(`CyberpunkRed.ShopPeopleTableText.shop_staff`,c([`locale`,`raise`],{locale:r.locale,raise:!0}))),$=n.$roll_once(6),b=r.people_a_table.$choice($).$body(),b=b[`$[]`](x(0,-2,!1)),e=f(e,b),e=f(e,_(`I18n`).$translate(`CyberpunkRed.ShopPeopleTableText.people_a`,c([`locale`,`raise`],{locale:r.locale,raise:!0}))),$=n.$roll_once(6),b=r.people_b_table.$choice($).$body(),b=b[`$[]`](x(0,-2,!1)),e=f(e,b),e=f(e,_(`I18n`).$translate(`CyberpunkRed.ShopPeopleTableText.people_b`,c([`locale`,`raise`],{locale:r.locale,raise:!0}))),e=f(e,_(`I18n`).$translate(`CyberpunkRed.ShopPeopleTableText.outro`,c([`locale`,`raise`],{locale:r.locale,raise:!0}))),e})})(E[0],null,E),(function(k,g){var m=[k].concat(g),t=l.$r(m);return k.$private(),v(k,`$translate_tables`,function(_){var T=i,h=i,n=i,r=i,e=i,$=i,u=i,b=i,s=i,a=i,p=i,J=i,Q=i,K=i,W=i,q=i,U=i,w=i,j=i;return T=o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.NightMarketTypeTable`,_),h=o(t(`DiceTable`),`RangeTable`).$from_i18n(`CyberpunkRed.NightMarketFoodsTable`,_),n=o(t(`DiceTable`),`RangeTable`).$from_i18n(`CyberpunkRed.NightMarketMechanicTable`,_),r=o(t(`DiceTable`),`RangeTable`).$from_i18n(`CyberpunkRed.NightMarketWeaponsTable`,_),e=o(t(`DiceTable`),`RangeTable`).$from_i18n(`CyberpunkRed.NightMarketCyberwareTable`,_),$=o(t(`DiceTable`),`RangeTable`).$from_i18n(`CyberpunkRed.NightMarketFashionTable`,_),u=o(t(`DiceTable`),`RangeTable`).$from_i18n(`CyberpunkRed.NightMarketSuvivalTable`,_),b=o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.ScreamSheetTypeTable`,_),s=o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.ScreamSheetATable`,_),a=o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.ScreamSheetBTable`,_),p=o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.ScreamSheetCTable`,_),J=o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.ScreamSheetOfTable`,_),Q=o(t(`DiceTable`),`RangeTable`).$from_i18n(`CyberpunkRed.VendingMachineTypeTable`,_),K=o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.VendingMachineFoodTable`,_),W=o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.VendingMachineFashionTable`,_),q=o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.VendingMachineStrangeTable`,_),U=o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.ShopStaffTable`,_),w=o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.ShopPeopleATable`,_),j=o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.ShopPeopleBTable`,_),c([`FFD`,`HFD`,`NCDT`,`NCMT`,`NMCT`,`NMCFO`,`NMCME`,`NMCWE`,`NMCCY`,`NMCFA`,`NMCSU`,`SCST`,`SCSA`,`SCSB`,`SCSC`,`SCSR`,`VMCT`,`VMCE`,`VMCF`,`VMCS`,`VMCR`,`STOREA`,`STOREB`,`STOREC`,`STORE`],{FFD:o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.FrameFatalDamageTable`,_),HFD:o(t(`DiceTable`),`Table`).$from_i18n(`CyberpunkRed.HeadFatalDamageTable`,_),NCDT:o(t(`DiceTable`),`RangeTable`).$from_i18n(`CyberpunkRed.NightCityDaytimeEncounterTable`,_),NCMT:o(t(`DiceTable`),`RangeTable`).$from_i18n(`CyberpunkRed.NightCityMidnightEncounterTable`,_),NMCT:T,NMCFO:h,NMCME:n,NMCWE:r,NMCCY:e,NMCFA:$,NMCSU:u,SCST:b,SCSA:s,SCSB:a,SCSC:p,SCSR:t(`ScreamSheetRandomizerTable`).$new(c([`locale`,`type_table`,`a_table`,`b_table`,`c_table`,`of_table`],{locale:_,type_table:b,a_table:s,b_table:a,c_table:p,of_table:J})).$freeze(),VMCT:Q,VMCE:K,VMCF:W,VMCS:q,VMCR:o(t(`DiceTable`),`ChainTable`).$new(t(`I18n`).$translate(`CyberpunkRed.VendingMachineTable.name`,c([`locale`,`raise`],{locale:_,raise:!0})),`1D6`,[K,K,K,W,W,q]),STOREA:U,STOREB:w,STOREC:j,STORE:t(`ShopPeopleTable`).$new(c([`locale`,`staff_table`,`people_a_table`,`people_b_table`],{locale:_,staff_table:U,people_a_table:w,people_b_table:j})).$freeze()}).$freeze()})})(l.get_singleton_class(V),E)})(F[0],Y(`Base`),F)})(D[0],D)})(C[0],C)};Opal.modules[`bcdice/game_system/CyberpunkRed`]=function(l){var N=l.module,A=l.klass,S=l.const_set,y=l.send2,v=l.find_super,f=l.def,c=l.truthy,x=l.hash2,C=l.rb_plus,i=l.rb_minus,o=l.rb_gt,I=l.top,B=[],d=l.nil,D=l.$$$;return I.$require(`bcdice/game_system/cyberpunk_red/tables`),(function(H,z){var F=[N(H,`BCDice`)].concat(z);return(function(Y,G){var M=[N(Y,`GameSystem`)].concat(G),V=l.$r(M);return(function(E,k,g){var m=A(E,k,`CyberpunkRed`),t=[m].concat(g),R=l.$r(t),_=m.$$prototype;return m.locale??=d,_.randomizer=d,S(t[0],`ID`,`CyberpunkRed`),S(t[0],`NAME`,`サイバーパンクRED`),S(t[0],`SORT_KEY`,`さいはあはんくれつと`),S(t[0],`HELP_MESSAGE`,`\u30FB\u5224\u5B9A\u3000CPx+y>z
\u3000(x\uFF1D\u80FD\u529B\u5024\u3068\u6280\u80FD\u5024\u306E\u5408\u8A08\u3001y\uFF1D\u4FEE\u6B63\u5024\u3001z\uFF1D\u96E3\u6613\u5EA6 or \u53D7\u52D5\u5074\u3000x\u3001y\u3001z\u306F\u7701\u7565\u53EF)
\u3000\u4F8B\uFF09CP12 CP10+2>12\u3000CP7-1\u3000CP8+4\u3000CP7>12\u3000CP\u3000CP>9

\u5404\u7A2E\u8868
\u30FB\u81F4\u547D\u7684\u640D\u50B7\u8868
\u3000FFD\u3000\uFF1A\u8EAB\u4F53\u3078\u306E\u81F4\u547D\u7684\u640D\u50B7
\u3000HFD\u3000\uFF1A\u982D\u90E8\u3078\u306E\u81F4\u547D\u7684\u640D\u50B7
\u30FB\u906D\u9047\u8868
\u3000NCDT\u3000\uFF1A\u30CA\u30A4\u30C8\u30B7\u30C6\u30A3(\u65E5\u4E2D)
\u3000NCMT\u3000\uFF1A\u30CA\u30A4\u30C8\u30B7\u30C6\u30A3(\u6DF1\u591C)
\u30FB\u30B9\u30AF\u30EA\u30FC\u30E0\u30B7\u30FC\u30C8
\u3000SCSR\u3000\uFF1A\u30B9\u30AF\u30EA\u30FC\u30E0\u30B7\u30FC\u30C8(\u30E9\u30F3\u30C0\u30E0)
\u3000SCST\u3000\uFF1A\u30B9\u30AF\u30EA\u30FC\u30E0\u30B7\u30FC\u30C8\u5206\u985E
\u3000SCSA\u3000\uFF1A\u30D8\u30C3\u30C9\u30E9\u30A4\u30F3A
\u3000SCSB\u3000\uFF1A\u30D8\u30C3\u30C9\u30E9\u30A4\u30F3B
\u3000SCSC\u3000\uFF1A\u30D8\u30C3\u30C9\u30E9\u30A4\u30F3C
\u30FB\u6700\u5BC4\u308A\u306E\u81EA\u8CA9\u6A5F
\u3000VMCR\u3000\uFF1A\u6700\u5BC4\u308A\u306E\u81EA\u8CA9\u6A5F\u8868
\u3000VMCT\u3000\uFF1A\u81EA\u8CA9\u6A5F\u30BF\u30A4\u30D7\u6C7A\u5B9A\u8868
\u3000VMCE\u3000\uFF1A\u98DF\u54C1
\u3000VMCF\u3000\uFF1A\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3
\u3000VMCS\u3000\uFF1A\u5909\u306A\u3082\u306E
\u30FB\u30DC\u30C7\u30AC\u306E\u5BA2
\u3000STORE\u3000\uFF1A\u30DC\u30C7\u30AC\u306E\u5BA2\u3068\u5E97\u54E1
\u3000STOREA\u3000\uFF1A\u5E97\u4E3B\u307E\u305F\u306F\u30EC\u30B8\u4FC2
\u3000STOREB\u3000\uFF1A\u5909\u308F\u3063\u305F\u5BA2\u305D\u306E1
\u3000STOREC\u3000\uFF1A\u5909\u308F\u3063\u305F\u5BA2\u305D\u306E2
\u30FB\u591C\u306E\u5E02
\u3000NMCT\u3000\uFF1A\u5546\u54C1\u306E\u5206\u91CE
\u3000NMCFO\u3000\uFF1A\u98DF\u54C1\u3068\u30C9\u30E9\u30C3\u30B0
\u3000NMCME\u3000\uFF1A\u500B\u4EBA\u7528\u96FB\u5B50\u6A5F\u5668
\u3000NMCWE\u3000\uFF1A\u6B66\u5668\u3068\u9632\u5177
\u3000NMCCY\u3000\uFF1A\u30B5\u30A4\u30D0\u30FC\u30A6\u30A7\u30A2
\u3000NMCFA\u3000\uFF1A\u8863\u6599\u54C1\u3068\u30D5\u30A1\u30C3\u30B7\u30E7\u30F3\u30A6\u30A7\u30A2
\u3000NMCSU\u3000\uFF1A\u30B5\u30D0\u30A4\u30D0\u30EB\u7528\u54C1
`),S(t[0],`TABLES`,m.$translate_tables(m.locale)),S(t[0],`CP_RE`,/^CP(?<ability>\d+)?(?<modifier>[+-]\d+)?(?<target>>=\d+)?/.$freeze()),f(m,`$initialize`,function T(h){T.$$p;var r=this;return T.$$p=null,y(r,v(r,`initialize`,T,!1,!0),`initialize`,[h],null),r.sort_add_dice=!1,r.d66_sort_type=D(R(`D66SortType`),`NO_SORT`)}),f(m,`$eval_game_system_specific_command`,function(h){var n=this,r=d;return n.$debug(`eval_game_system_specific_command begin string`,h),c(r=n.$cp_roll_result(h))?r:n.$roll_tables(h,D(n.$class(),`TABLES`))}),m.$private_constant(`CP_RE`),f(m,`$cp_roll_result`,function(h){var n=this,r=d,e=d,$=d,u=d,b=d,s=d,a=d,p=d;if(r=D(R(`Command`),`Parser`).$new(`CP`,x([`round_type`],{round_type:D(R(`RoundType`),`FLOOR`)})).$enable_suffix_number().$restrict_cmp_op_to(d,`>`),e=r.$parse(h),c(e[`$nil?`]()))return d;switch($=1,u=10,b=0,s=0,a=R(`Result`).$new(),p=[n.randomizer.$roll_once(u)],s=C(s,p.$first()),c(e.$suffix_number())&&(b=C(b,e.$suffix_number())),c(e.$modify_number())&&(b=C(b,e.$modify_number())),s=C(s,b),p.$first().valueOf()){case 10:p[`$<<`](n.randomizer.$roll_once(u)),s=C(s,p.$last()),a[`$critical=`](!0);break;case 1:p[`$<<`](n.randomizer.$roll_once(u)),s=i(s,p.$last()),a[`$fumble=`](!0);break;default:}return c(e.$target_number())&&a[`$condition=`](o(s,e.$target_number())),a[`$text=`](`(`+$+`D`+u+R(`Format`).$modifier(b)+e.$cmp_op()+e.$target_number()+`)`),a[`$text=`](C(a.$text(),` ＞ `)),a[`$text=`](C(a.$text(),``+p.$first()+`[`+p.$first()+`]`+R(`Format`).$modifier(b))),a[`$text=`](C(a.$text(),` ＞ `)),c(a[`$critical?`]())&&(a[`$text=`](C(a.$text(),``+n.$translate(`CyberpunkRed.critical`)+` ＞ `)),a[`$text=`](C(a.$text(),``+p.$last()+`[`+p.$last()+`] ＞ `))),c(a[`$fumble?`]())&&(a[`$text=`](C(a.$text(),``+n.$translate(`CyberpunkRed.fumble`)+` ＞ `)),a[`$text=`](C(a.$text(),``+p.$last()+`[`+p.$last()+`] ＞ `))),a[`$text=`](C(a.$text(),s.$to_s())),c(a[`$success?`]())&&a[`$text=`](C(a.$text(),` ＞ `+n.$translate(`success`))),c(a[`$failure?`]())&&a[`$text=`](C(a.$text(),` ＞ `+n.$translate(`failure`))),a}),m.$register_prefix(`CP`,R(`TABLES`).$keys())})(M[0],V(`Base`),M)})(F[0],F)})(B[0],B)};Opal.queue(function(l){var N=l.module,A=l.klass,S=l.const_set,y=l.send2,v=l.find_super,f=l.def,c=l.top,x=[];l.nil;return c.$require(`bcdice/game_system/CyberpunkRed`),(function(i,o){var B=[N(i,`BCDice`)].concat(o);return(function(d,D){var z=[N(d,`GameSystem`)].concat(D),L=l.$r(z);return(function(F,Y,G){var P=A(F,Y,`CyberpunkRed_Korean`),M=[P].concat(G);return S(M[0],`ID`,`CyberpunkRed:Korean`),S(M[0],`NAME`,`사이버펑크 RED`),S(M[0],`SORT_KEY`,`国際化:Korean:사이버펑크`),S(M[0],`HELP_MESSAGE`,`\u30FB\uD310\uC815\u3000CPx+y>z
  \u3000(x\uFF1D\uB2A5\uB825\uCE58\uC640 \uAE30\uB2A5\uCE58\uC758 \uD569(base)\u3001y\uFF1D\uC218\uC815\uCE58(mod)\u3001z\uFF1D\uB09C\uC774\uB3C4(DV) or \uBC29\uC5B4\uC790\uC758 \uAC12\u3000x\u3001y\u3001z\uB294 \uC0DD\uB7B5 \uAC00\uB2A5)
  \u3000\uC608\uC2DC\uFF09CP12, CP10+2>12,\u3000CP7-1,\u3000CP8+4,\u3000CP7>12,\u3000CP,\u3000CP>9

  \uAC01\uC885 \uD45C
  \u30FB\uCE58\uBA85\uC801\uC778 \uC190\uC0C1\uD45C
  \u3000FFD\u3000\uFF1A\uC2E0\uCCB4\uC5D0 \uCE58\uBA85\uC801 \uC190\uC0C1
  \u3000HFD\u3000\uFF1A\uBA38\uB9AC\uC5D0 \uCE58\uBA85\uC801 \uC190\uC0C1
  \u30FB\uC870\uC6B0 \uD45C
  \u3000NCDT\u3000\uFF1A\uB098\uC774\uD2B8\uC2DC\uD2F0(\uB0AE)
  \u3000NCMT\u3000\uFF1A\uB098\uC774\uD2B8 \uC2DC\uD2F0(\uC2EC\uC57C)
  \u30FB\uC2A4\uD06C\uB9BC \uC2DC\uD2B8(\uC2E0\uBB38)
  \u3000SCSR\u3000\uFF1A\uC2A4\uD06C\uB9BC \uC2DC\uD2B8(\uB79C\uB364)
  \u3000SCST\u3000\uFF1A\uC2A4\uD06C\uB9BC \uC2DC\uD2B8 \uCE74\uD14C\uACE0\uB9AC
  \u3000SCSA\u3000\uFF1A\uD5E4\uB4DC \uB77C\uC778A
  \u3000SCSB\u3000\uFF1A\uD5E4\uB4DC \uB77C\uC778B
  \u3000SCSC\u3000\uFF1A\uD5E4\uB4DC \uB77C\uC778C
  \u30FB\uAC00\uC7A5 \uAC00\uAE4C\uC6B4 \uC790\uD310\uAE30
  \u3000VMCR\u3000\uFF1A\uAC00\uC7A5 \uAC00\uAE4C\uC6B4 \uC790\uD310\uAE30\uD45C
  \u3000VMCT\u3000\uFF1A\uC790\uD310\uAE30 \uC720\uD615 \uACB0\uC815\uD45C
  \u3000VMCE\u3000\uFF1A\uC2DD\uD488
  \u3000VMCF\u3000\uFF1A\uD328\uC158
  \u3000VMCS\u3000\uFF1A\uC774\uC0C1\uD55C \uBB3C\uAC74
  \u30FB\uBCF4\uB370\uAC00(\uC0C1\uC810) \uC190\uB2D8
  \u3000STORE\u3000\uFF1A\uC0C1\uC810 \uC190\uB2D8\uACFC \uC810\uC6D0
  \u3000STOREA\u3000\uFF1A\uC810\uC8FC \uB610\uB294 \uACC4\uC0B0\uC6D0
  \u3000STOREB\u3000\uFF1A\uBCC4\uB09C \uC190\uB2D8 1
  \u3000STOREC\u3000\uFF1A\uBCC4\uB09C \uC190\uB2D8 2
  \u30FB\uC57C\uC2DC\uC7A5
  \u3000NMCT\u3000\uFF1A\uC0C1\uD488\uC758 \uBD84\uC57C
  \u3000NMCFO\u3000\uFF1A\uC74C\uC2DD\uACFC \uC57D\uBB3C
  \u3000NMCME\u3000\uFF1A\uAC1C\uC778\uC6A9 \uC804\uC790\uAE30\uAE30
  \u3000NMCWE\u3000\uFF1A\uBB34\uAE30\uC640 \uAC11\uC637
  \u3000NMCCY\u3000\uFF1A\uC0AC\uC774\uBC84\uC6E8\uC5B4
  \u3000NMCFA\u3000\uFF1A\uC758\uB958 \uBC0F \uD328\uC158\uC6E8\uC5B4
  \u3000NMCSU\u3000\uFF1A\uC0DD\uC874 \uC7A5\uBE44(servival gear)
`),f(P,`$initialize`,function V(E){V.$$p;var g=this;return V.$$p=null,y(g,v(g,`initialize`,V,!1,!0),`initialize`,[E],null),g.locale=`ko_kr`}),P.$register_prefix_from_super_class(),S(M[0],`TABLES`,P.$translate_tables(`ko_kr`))})(z[0],L(`CyberpunkRed`),z)})(B[0],B)})(x[0],x)});