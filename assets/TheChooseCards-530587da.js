import{d as p,u,f as v,o as d,c as n,b as s,t,n as i,_ as m,F as C,r as f,g as o,e as h,a as g,w as k,p as y,h as I,i as S,M as $}from"./index-36c9ab79.js";import{c as x}from"./cards.map-caeb7785.js";import{_ as B}from"./BaseLink.vue_vue_type_style_index_0_lang-df93dadc.js";const D={class:"card__portrait"},M=["src","alt"],w={class:"card__text"},N={class:"card__name"},T={class:"card__type"},V={class:"card__description"},b=p({__name:"BaseCard",props:{card:{}},setup(e){const a=e,{haveCard:r}=u(),l=v(()=>r(a.card));return(c,_)=>(d(),n("div",{class:i(["card",{"card--active":l.value}])},[s("div",D,[s("img",{src:c.card.image,alt:c.card.name,class:"card__image"},null,8,M)]),s("div",w,[s("div",N,t(c.card.name),1),s("div",T,t(c.card.type),1),s("div",V,t(c.card.description),1)])],2))}});const A=m(b,[["__scopeId","data-v-0c5f2024"]]),E=e=>(y("data-v-2ed84f21"),e=e(),I(),e),F={class:"choose-cards"},R=E(()=>s("h1",{class:"choose-cards__heading"}," Choose cards for your deck ",-1)),z={class:"choose-cards__cards"},K={class:"choose-cards__counter"},L={class:"choose-cards__link"},U=p({__name:"TheChooseCards",setup(e){const a=u(),{toggleCard:r}=a;return(l,c)=>(d(),n("div",F,[R,s("div",z,[(d(!0),n(C,null,f(o(x),_=>(d(),S(A,{key:_.id,card:_,class:"choose-cards__item",onClick:X=>o(r)(_)},null,8,["card","onClick"]))),128))]),s("div",K,[s("span",{class:i(o(a).isMaxCardsInDeck?"choose-cards__counter--success":"choose-cards__counter--error")},t(o(a).cardsRaw.length),3),h(" / "+t(o($)),1)]),s("div",L,[g(B,{class:i({"choose-cards__link--disabled":!o(a).isMaxCardsInDeck}),to:{name:"fight"}},{default:k(()=>[h(" Start the game ")]),_:1},8,["class"])])]))}});const H=m(U,[["__scopeId","data-v-2ed84f21"]]);export{H as default};
