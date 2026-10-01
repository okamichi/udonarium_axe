import{t as Ee}from"./chunk-B_Ac0l0D.js";Ee();Opal.modules[`bcdice/arithmetic_evaluator`]=function(e){var E=e.module,A=e.ensure_kwargs,m=e.truthy,F=e.thrower,I=e.def,h=[],g=e.nil,l=e.$$$;return(function(y,z){var C=[E(y,`BCDice`)].concat(z);return(function(M,L){var w=E(M,`ArithmeticEvaluator`),G=[w].concat(L);return(function(R,H){var K=[R].concat(H),k=e.$r(K);return I(R,`$eval`,function(S,v){try{F(`eval_return`);var p,Y=g;return v=A(v),p=v.$$smap.round_type,p??=l(k(`RoundType`),`FLOOR`),m(S)&&m(Y=k(`Arithmetic`).$eval(S,p))?Y:0}catch(B){if(B===e.t_eval_return)return B.$v;throw B}},-2)})(e.get_singleton_class(w),G)})(C[0],C)})(h[0],h)};Opal.modules[`bcdice/game_system/Cthulhu`]=function(e){var E=e.module,A=e.klass,m=e.const_set,F=e.send2,I=e.find_super,h=e.def,g=e.eqeqeq,l=e.truthy,y=e.rb_le,z=e.rb_gt,D=e.rb_plus,C=e.send,M=e.thrower,L=e.rb_divide,w=e.rb_times,G=e.rb_lt,R=e.rb_ge,H=e.rb_minus,K=e.top,k=[],r=e.nil;return K.$require(`bcdice/arithmetic_evaluator`),(function(S,v){var p=[E(S,`BCDice`)].concat(v);return(function(Y,B){var J=[E(Y,`GameSystem`)].concat(B),U=e.$r(J);return(function(V,W,X){var b=A(V,W,`Cthulhu`),q=[b].concat(X),N=e.$r(q),j=b.$$prototype;return j.randomizer=j.locale=j.special_percentage=j.critical_percentage=j.fumble_percentage=r,m(q[0],`ID`,`Cthulhu`),m(q[0],`NAME`,`クトゥルフ神話TRPG`),m(q[0],`SORT_KEY`,`くとうるふしんわTRPG`),m(q[0],`HELP_MESSAGE`,`c=\u30AF\u30EA\u30C6\u30A3\u30AB\u30EB\u5024 \uFF0F f=\u30D5\u30A1\u30F3\u30D6\u30EB\u5024 \uFF0F s=\u30B9\u30DA\u30B7\u30E3\u30EB

1d100<=n    c\u30FBf\u30FBs\u3059\u3079\u3066\u30AA\u30D5\uFF08\u5358\u7D14\u306A\u6570\u5024\u6BD4\u8F03\u5224\u5B9A\u306E\u307F\u884C\u3044\u307E\u3059\uFF09

\u30FBcfs\u5224\u5B9A\u4ED8\u304D\u5224\u5B9A\u30B3\u30DE\u30F3\u30C9

CC	 1d100\u30ED\u30FC\u30EB\u3092\u884C\u3046 c=1\u3001f=100
CCB  \u540C\u4E0A\u3001c=5\u3001f=96

\u4F8B\uFF1ACC<=80  \uFF08\u6280\u80FD\u502480\u3067\u884C\u70BA\u5224\u5B9A\u30021%\u30EB\u30FC\u30EB\u3067cf\u9069\u7528\uFF09
\u4F8B\uFF1ACCB<=55 \uFF08\u6280\u80FD\u502455\u3067\u884C\u70BA\u5224\u5B9A\u30025%\u30EB\u30FC\u30EB\u3067cf\u9069\u7528\uFF09

\u30FB\u7D44\u307F\u5408\u308F\u305B\u30ED\u30FC\u30EB\u306B\u3064\u3044\u3066

CBR(x,y)	c=1\u3001f=100
CBRB(x,y)	c=5\u3001f=96

\u30FB\u62B5\u6297\u8868\u30ED\u30FC\u30EB\u306B\u3064\u3044\u3066
RES(x-y)	c=1\u3001f=100
RESB(x-y)	c=5\u3001f=96

\u203B\u6545\u969C\u30CA\u30F3\u30D0\u30FC\u5224\u5B9A

\u30FBCC(x) c=1\u3001f=100
x=\u6545\u969C\u30CA\u30F3\u30D0\u30FC\u3002\u51FA\u76EEx\u4EE5\u4E0A\u304C\u51FA\u305F\u4E0A\u3067\u3001\u30D5\u30A1\u30F3\u30D6\u30EB\u304C\u540C\u6642\u306B\u767A\u751F\u3057\u305F\u5834\u5408\u3001\u5171\u306B\u51FA\u529B\u3059\u308B\uFF08\u30C6\u30AD\u30B9\u30C8\u300C\u30D5\u30A1\u30F3\u30D6\u30EB\uFF06\u6545\u969C\u300D\uFF09
\u30D5\u30A1\u30F3\u30D6\u30EB\u3067\u306A\u3044\u5834\u5408\u3001\u6210\u529F\u30FB\u5931\u6557\u306B\u95A2\u308F\u3089\u305A\u30C6\u30AD\u30B9\u30C8\u300C\u6545\u969C\u300D\u306E\u307F\u3092\u51FA\u529B\u3059\u308B\uFF08\u6210\u529F\u30FB\u5931\u6557\u3092\u51FA\u529B\u305B\u305A\u3001\u4E0A\u66F8\u304D\u3057\u305F\u3082\u306E\u3092\u51FA\u529B\u3059\u308B\u5F62\uFF09

\u30FBCCB(x) c=5\u3001f=96
\u540C\u4E0A

`),b.$register_prefix(`CCB?`,`RESB?`,`CBRB?`),h(b,`$initialize`,function d(s){d.$$p;var n=this;return d.$$p=null,F(n,I(n,`initialize`,d,!1,!0),`initialize`,[s],null),n.special_percentage=20,n.critical_percentage=1,n.fumble_percentage=1}),h(b,`$eval_game_system_specific_command`,function(s){var i=this,n=r;return g(/CCB/i,n=s)?(i.critical_percentage=5,i.fumble_percentage=5,i.$getCheckResult(s)):g(/CC/i,n)?(i.critical_percentage=1,i.fumble_percentage=1,i.$getCheckResult(s)):g(/RESB/i,n)?(i.critical_percentage=5,i.fumble_percentage=5,i.$getRegistResult(s)):g(/CBRB/i,n)?(i.critical_percentage=5,i.fumble_percentage=5,i.$getCombineRoll(s)):g(/RES/i,n)?(i.critical_percentage=1,i.fumble_percentage=1,i.$getRegistResult(s)):g(/CBR/i,n)?(i.critical_percentage=1,i.fumble_percentage=1,i.$getCombineRoll(s)):r}),b.$private(),h(b,`$getCheckResult`,function(s){try{M(`eval_return`);var n=this,a=r,u=r,$=r,t=r,c=r,f=r;return a=/^CCB?(\d+)?(?:<=([+-\/*\d]+))?$/i.$match(s),l(a)?(u=a[`$[]`](1).$to_i(),$=N(`ArithmeticEvaluator`).$eval(a[`$[]`](2)),l(y($,0))?(t=n.randomizer.$roll_once(100),N(`Result`).$new(`(1D100) ＞ `+t)):(c=`(1D100<=`+$+`)`,l(z(u,0))&&(c=D(c,` `+n.$translate(`Cthulhu.broken_number`)+`[`+u+`]`)),t=n.randomizer.$roll_once(100),f=n.$compare(t,$,u),C(f.$to_result(),`tap`,[],function(_){var x;return _??=r,x=[``+c+` ＞ `+t+` ＞ `+f.$text()],C(_,`text=`,x),x[x.length-1]}))):r}catch(o){if(o===e.t_eval_return)return o.$v;throw o}}),(function(d,s,i){var n=A(d,s,`CompareResult`),a=[n].concat(i),u=e.$r(a);return n.$include(u(`Translate`)),n.$attr_accessor(`success`,`failure`,`critical`,`fumble`,`special`,`broken`),h(n,`$initialize`,function(t){var c=this;return c.locale=t,c.success=!1,c.failure=!1,c.critical=!1,c.fumble=!1,c.special=!1,c.broke=!1}),h(n,`$text`,function(){var t=this;return l(t.$critical())&&l(t.$special())?t.$translate(`Cthulhu.critical_special`):l(t.$critical())?t.$translate(`Cthulhu.critical`):l(t.$special())?t.$translate(`Cthulhu.special`):l(t.$success())?t.$translate(`success`):l(t.$broken())&&l(t.$fumble())?``+t.$translate(`Cthulhu.fumble`)+`/`+t.$translate(`Cthulhu.broken`):l(t.$broken())?t.$translate(`Cthulhu.broken`):l(t.$fumble())?t.$translate(`Cthulhu.fumble`):l(t.$failure())?t.$translate(`failure`):r}),h(n,`$to_result`,function(){var t=this;return C(u(`Result`).$new(),`tap`,[],function c(f){var o,_=c.$$s==null?this:c.$$s;return f??=r,f[`$success=`](_.$success()),f[`$failure=`](_.$failure()),f[`$critical=`](_.$critical()),o=[_.$fumble()],C(f,`fumble=`,o),o[o.length-1]},{$$s:t})})})(q[0],null,q),h(b,`$compare`,function(s,i,n){var a=this,u=r,$=r;return n??=0,u=N(`CompareResult`).$new(a.locale),$=L(w(i,a.special_percentage),100).$to_i().$clamp(1,100),l(y(s,i))&&l(G(s,100))?(u[`$success=`](!0),u[`$special=`](y(s,$)),u[`$critical=`](y(s,a.critical_percentage))):(u[`$failure=`](!0),u[`$fumble=`](R(s,H(101,a.fumble_percentage)))),l(z(n,0))&&l(R(s,n))&&(u[`$broken=`](!0),u[`$failure=`](!0),u[`$success=`](!1),u[`$special=`](!1),u[`$critical=`](!1)),u},-3),h(b,`$getRegistResult`,function(s){var i=this,n=r,a=r,u=r,$=r,t=r;return n=/^RESB?(-?\d+)$/i.$match(s),l(n)?(a=n[`$[]`](1).$to_i(),u=D(w(a,5),50),l(G(u,5))?N(`Result`).$failure(`(1d100<=`+u+`) ＞ `+i.$translate(`Cthulhu.automatic_failure`)):l(z(u,95))?N(`Result`).$success(`(1d100<=`+u+`) ＞ `+i.$translate(`Cthulhu.automatic_success`)):($=i.randomizer.$roll_once(100),t=i.$compare($,u),C(t.$to_result(),`tap`,[],function(f){var o;return f??=r,o=[`(1d100<=`+u+`) ＞ `+$+` ＞ `+t.$text()],C(f,`text=`,o),o[o.length-1]}))):r}),h(b,`$getCombineRoll`,function(s){var i=this,n=r,a=r,u=r,$=r,t=r,c=r,f=r;return n=/^CBR(B)?\((\d+),(\d+)\)$/i.$match(s),l(n)?(a=n[`$[]`](2).$to_i(),u=n[`$[]`](3).$to_i(),$=i.randomizer.$roll_once(100),t=i.$compare($,a),c=i.$compare($,u),f=l(t.$success())&&l(c.$success())?i.$translate(`success`):l(t.$success())||l(c.$success())?i.$translate(`Cthulhu.partial_success`):i.$translate(`failure`),C(N(`Result`).$new(),`tap`,[],function(_){var x,P=r;return _??=r,_[`$text=`](`(1d100<=`+a+`,`+u+`) ＞ `+$+`[`+t.$text()+`,`+c.$text()+`] ＞ `+f),_[`$critical=`](l(P=t.$critical())?P:c.$critical()),_[`$fumble=`](l(P=t.$fumble())?P:c.$fumble()),x=[l(P=t.$success())?P:c.$success()],C(_,`condition=`,x),x[x.length-1]})):r})})(J[0],U(`Base`),J)})(p[0],p)})(k[0],k)};Opal.queue(function(e){var E=e.module,A=e.klass,m=e.const_set,F=e.send2,I=e.find_super,h=e.def,g=e.top,l=[];e.nil;return g.$require(`bcdice/game_system/Cthulhu`),(function(z,D){var M=[E(z,`BCDice`)].concat(D);return(function(L,w){var R=[E(L,`GameSystem`)].concat(w),H=e.$r(R);return(function(K,k,r){var S=A(K,k,`Cthulhu_English`),v=[S].concat(r);return m(v[0],`ID`,`Cthulhu:English`),m(v[0],`NAME`,`Call of Cthulhu`),m(v[0],`SORT_KEY`,`国際化:English:Call of Cthulhu`),m(v[0],`HELP_MESSAGE`,`c=Critical Rate \uFF0F f=Fumble Rate \uFF0F s=Special

1d100<=n    c\u30FBf\u30FBs AllOff\uFF08Does Simple Numeric Comparison Only\uFF09

\u30FBRoll Command that determines cfs

CC	 Does a 1d100 roll c=1\u3001f=100
CCB  Same as above\u3001c=5\u3001f=96

Ex\uFF1ACC<=80  \uFF08Rolls using 80 as skill value with 1% cf rule applied\uFF09
Ex\uFF1ACCB<=55 \uFF08Rolls using 55 as skill value with 5% cf rule applied\uFF09

\u30FBAbout Roll Combination

CBR(x,y)	c=1\u3001f=100
CBRB(x,y)	c=5\u3001f=96

\u30FBAbout Opposed Rolls
RES(x-y)	c=1\u3001f=100
RESB(x-y)	c=5\u3001f=96

\u203BMalfunction Number Determination

\u30FBCC(x) c=1\u3001f=100
x=Malfunction Number. Outputs\uFF08text "Fumble&Malfunction"\uFF09together, when roll result is equal or above x, and fumble happens simultaneously.
If not a fumble, outputs text "Malfunction" regardless of success/failure\uFF08Outputs the overwritten result, not outputting success/failure\uFF09

\u30FBCCB(x) c=5\u3001f=96
Same as above
`),S.$register_prefix_from_super_class(),h(S,`$initialize`,function T(p){T.$$p;var B=this;return T.$$p=null,F(B,I(B,`initialize`,T,!1,!0),`initialize`,[p],null),B.locale=`en_us`})})(R[0],H(`Cthulhu`),R)})(M[0],M)})(l[0],l)});