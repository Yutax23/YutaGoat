module.exports = {
config: {
name: "ai", 
author: "null69",
category: "ai" 
},
onStart: () => {},
onChat: async function ({ message: { reply: r }, args: a, event: { body } })  {
if(!body?.toLowerCase().startsWith("xyrene"))
return;
require("axios").get(`https://haze-claude-api-c56bb0cd1fe4.herokuapp.com/claude?q=${a.slice(1).join(" ") || "hello"}`)
.then(({data}) => {
  const responseText = data.response?.[0]?.text || "Sorry, I couldn't process your request.";
  r(responseText);
})
.catch(({message:_}) => r(_));
}
};